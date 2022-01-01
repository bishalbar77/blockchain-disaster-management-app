<template>
    <div class="row">
        <div class="col-lg-12 p-5" v-if="logged">
            <h3 class="p-3">All Resource Requests</h3>
            <table class="table mt-4">
                <thead>
                    <tr class="table-danger">
                        <th scope="col">Provider</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(payment, index) in payments" :key="index">
                        <th scope="row">Provider {{ payment.user_id }}</th>
                        <th scope="row">{{ payment.item_name }}</th>
                        <th scope="row">{{ payment.unit }}</th>
                        <th scope="row">{{ payment.amount }} eth</th>
                        <th scope="row">{{ payment.status }}</th>
                        <th scope="row" v-if="payment.status == 'Initialized'"><button class="btn btn-lg btn-primary" @click="pay(payment.id)">Pay</button></th>
                        <th scope="row" v-if="payment.status == 'Completed'"><button class="btn btn-lg btn-default" disabled>Paid</button></th>
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
        this.loading = true
        fetch("http://127.0.0.1:8000/api/get_transactions")
            .then(response => response.json())
            .then(data => (this.payments = data.data));
        this.loading = false
    },
    methods: {
        withdraw: async function() {
            const address = this.$store.state.contract
            const paymentsService = new PaymentsService()
            if (address) {
                try {
                    this.loading = true
                    await paymentsService.withdraw(address)
                    this.balance = await paymentsService.getBalance(address, 'ether')
                    this.loading = false
                } catch (e) {
                    console.log(e)
                }
            }
        },
        
        pay: async function(id) {
            const address = this.$store.state.contract
            const reference = 'SC-' + new Date().getTime()
            const amount = this.$store.getters.totalAmount
            
            const paymentsService = new PaymentsService()
            console.log("address")
            console.log(address)
            this.loading = true
            try {
                const response = await paymentsService.pay(address, reference, amount)
                console.log(response)
                if(response == 'MetaMask Tx Signature: User denied transaction signature.') {
                    swal("Transaction Failed", "User denied transaction signature", "warning");
                } else {
                    const requestBody = { 
                        trasaction_id: id
                    }
                    const response = await axios.post('http://127.0.0.1:8000/api/update_transaction', requestBody)
                    .then(response => this.responseData = response.data)
                    .catch(error => {});
                    swal("Transaction Success", "Successfully request for resources", "success");
                }
            } catch (e) {
                console.log(e)
            }
            this.loading = false
            // this.$store.commit('clearFruitUnits')
            // this.$router.push('/')
        }
    }
}
</script>

