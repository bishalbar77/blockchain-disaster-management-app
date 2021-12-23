<template>
    <div>
        <div id="loadContract" class="d-flex justify-content-center align-items-center">
            <div class="text-center" style="width:60%">
                <button type="button" class="btn btn-lg btn-primary mb-4" @click="createContract">
                    Update Sender Address
                </button>
            </div>
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
    name: 'PaymentsLoad',
    data: function() {
        return {
            address: '',
            loading: false
        }
    },
    methods: {
        createContract: async function() {
            const paymentsService = new PaymentsService()
            this.loading = true
            try {
                const contract = await paymentsService.createContract()
                this.$store.commit('setContract', contract.options.address)
            } catch (e) {
                console.log(e)
            }
            this.loading = false
        },
        loadContract: function() {
            this.$store.commit('setContract', this.address)
        }
    }
}
</script>

<style scoped>
    #address {
        width: 400px;
        height: 32px;
    }
    #loadContract {
        margin-top: 6em
    }
</style>