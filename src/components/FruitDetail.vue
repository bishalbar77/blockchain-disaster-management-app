<template>
    <div class="card mt-4">
        <div class="card-horizontal">
            <div class="card-body">
                <h4 class="card-title text-left">{{ name }}</h4>
                <h5 class="card-subtitle mb-3 text-muted text-left">{{ price }} eth</h5>
                <p class="card-text text-left">Service Provider {{ description }}</p>
                <div class="text-left">
                    <label class="mr-2 font-weight-bold">Number of Units </label>
                    <select v-model='units' id='units'>
                        <option value=0>0</option>
                        <option v-for="index in 10" v-bind:key="index">{{ index }}</option>
                    </select>
                    <span v-if="units>0" class='ml-4'>{{ subtotal }} eth</span>
                    <div class='text-right'>
                        <button class="btn btn-primary btn-lg" @click="pay">Get Resource</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FruitDetail',
    props:{
        fruit: Object,
        name: String,
        image: String,
        price: String,
        description: String
    },
    data: function() {
        return {
            unitsX: 0
        }
    },
    computed: {
        subtotal: function() {
            return this.units*parseFloat(this.price)
        },
        imagePath: function() {
            return '/assets/' + this.image
        },
        units: {
            get: function() {
                return this.$store.getters.getFruitUnits(this.name)
            },
            set: function(newValue) {
                this.$store.commit('setFruitUnits', {name: this.name, units: newValue})
            }
        }
    },
    
    methods: {
        pay: async function() {
            const reference = 'SC-' + new Date().getTime()
            const amount = this.units*parseFloat(this.price)
            const units = this.units
            const item_name = this.name
            const seller_id = this.description
            this.loading = true
            const requestBody = { 
                        item_name: item_name, 
                        unit: units, 
                        reference: reference, 
                        amount: amount, 
                        seller_id: seller_id, 
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

<style>
    .card-horizontal {
        display: flex;
        flex: 1 1 auto;
        padding: 8px;
    }
</style>