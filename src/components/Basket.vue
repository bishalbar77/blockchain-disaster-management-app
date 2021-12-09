<template>
    <div>
        <div>
            <div class='p-5'>
                <div class="text-center d-flex justify-content-between p-2">
                    <label class="mr-2 font-weight-bold">Type of resources </label>
                    <select>
                        <FruitDetail v-for="(fruit, index) in fruits" :key="index" :name="fruit.name" :description="fruit.description" :price="fruit.price" v-bind:image="fruit.image" />
                    </select>
                </div>
                <div class="text-center d-flex justify-content-between p-2">
                    <label class="mr-2 font-weight-bold">Number of Units </label>
                    <select v-model='units' id='units'>
                        <option value=0>0</option>
                        <option v-for="index in 10" v-bind:key="index">{{ index }}</option>
                    </select>
                </div>
            </div>
             <form v-on:submit.prevent="">
                <div v-if="address" class='text-center'>
                    <button class="btn btn-primary btn-lg" @click="pay">Get Resources</button>
                </div>
            </form>
           
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
    name: 'Basket',
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
            const address = this.$store.state.contract
            const reference = 'SC-' + new Date().getTime()
            const amount = this.$store.getters.totalAmount
            
            const paymentsService = new PaymentsService()

            this.loading = true
            try {
                await paymentsService.pay(address, reference, amount)
                swal("Transaction Success", "Successfully request for resources", "success");
            } catch (e) {
                console.log(e)
            }
            this.loading = false
            this.$store.commit('clearFruitUnits')
            this.$router.push('/')
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