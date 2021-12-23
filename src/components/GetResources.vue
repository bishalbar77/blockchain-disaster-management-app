<template>
    <div>
        
        <div>
            <div class='p-5'>
                <FruitDetail v-for="(fruit, index) in fruits" :key="index" :name="fruit.name" :description="fruit.description" :price="fruit.price" v-bind:image="fruit.image" />
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

<script>
import FruitDetail from './FruitDetail.vue'
import { mapState } from 'vuex' // Creates getter for properties in vuex state
import PaymentsService from '../domain/PaymentsService.js'

export default {
    name: 'GetResources',
    props: {},
    computed: mapState({
        fruits: state => state.fruits,
        total: state => {
            return state.fruits.reduce((accumulator, currentValue) => (accumulator + Number(currentValue.units) * parseFloat(currentValue.price)), 0)
        },
        address: state => state.contract
    }),
    data: function() {
        return {
            loading: false
        }
    },
    components: {
        FruitDetail
    },
    methods: {
        pay: async function() {
            const reference = 'SC-' + new Date().getTime()
            const amount = this.$store.getters.totalAmount
            const units = this.$store.getters.getFruitUnit
            const item_name = this.$store.getters.getFruit
            this.loading = true
            const requestBody = { 
                        item_name: item_name, 
                        unit: units, 
                        reference: reference, 
                        amount: amount, 
                    }
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/store_transaction', requestBody)
                .then(response => this.responseData = response.data)
                .catch(error => {});
                swal("Transaction Success", "Successfully request for resources", "success");
            } catch (e) {
                console.log(e)
            }
            this.loading = false
        }
    }
}
</script>

<style lang="scss" scoped>

    #address {
        width: 400px;
        height: 32px;
    }
    #loadContract {
        margin-top: 6em
    }
</style>