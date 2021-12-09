<template>
    <div class="row">
        <div class="col-lg-12 p-5" v-if="logged">
            <h5>Payments</h5>
            <table class="table mt-4">
                <thead>
                    <tr class="table-danger">
                        <th scope="col">Account</th>
                        <th scope="col">Reference</th>
                        <th scope="col" class="text-right">Amount</th>
                        <th scope="col" class="text-center">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(payment, index) in payments" :key="index">
                        <th scope="row">{{ logged }}</th>
                        <th scope="row">{{ payment.reference }}</th>
                        <td class="text-right">{{ payment.amount }} eth</td>
                        <td class="text-center">{{ payment.date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="loading" class="loading d-flex justify-content-center align-items-center">
            <div class="spinner-border"  role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
import PaymentsService from '../domain/PaymentsService.js'

export default {
    data: function () {
        return {
            balance: 0,
            network: '',
            logged: '',
            payments: [],
            loading: false
        }
    },
    computed: {
        address: function() {
            return this.$store.state.contract
        }
    },
    created: async function () {
        const address = this.$store.state.contract
        const paymentsService = new PaymentsService()
        this.network = await paymentsService.getNetwork() 
        this.logged = await paymentsService.getLoggedAccount()
        if (address) {
            this.balance = await paymentsService.getBalance(address, 'ether')
            this.payments = await paymentsService.getPaymentsOfAccount(address, this.logged, 'ether')
        }
    },
    methods: {
        withdraw: async function() {
            const address = this.$store.state.contract
            const paymentsService = new PaymentsService()
            if (address) {
                this.loading = true
                try {
                    await paymentsService.withdraw(address)
                    this.balance = await paymentsService.getBalance(address, 'ether')
                } catch (e) {
                    console.log(e)
                }
                this.loading = false
            }
        }
    }
}
</script>