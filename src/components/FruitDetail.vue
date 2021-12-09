<template>
            <option>{{ name }} - {{ price }} eth</option>

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