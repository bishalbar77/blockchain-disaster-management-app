import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contract: '',
    fruits:[
        {
            name: 'Medicines',
            description: '1',
            price:'0.010',
            image:'cereal.jpeg',
            units: 0
        },
        {
            name: 'Medicines',
            description: '2',
            price:'0.015',
            image:'cereal.jpeg',
            units: 0
        },
        {
            name: 'Medicines',
            description: '3',
            price:'0.050',
            image:'cereal.jpeg',
            units: 0
        },
        {
            name: 'Dry cereal or granola',
            description: '2',
            price:'0.018',
            image:'cereal.jpeg',
            units: 0
        },
        {
            name: 'Dry cereal or granola',
            description: '2',
            price:'0.008',
            image:'cereal.jpeg',
            units: 0
        },
        {
            name: 'Dry cereal or granola',
            description: '3',
            price:'0.015',
            image:'cereal.jpeg',
            units: 0
        },
        {
            name:'Water ',
            description:'1',
            price:'0.019',
            image:'water.jpg',
            units: 0
        },
        {
            name:'Water',
            description:'2',
            price:'0.020',
            image:'water.jpg',
            units: 0
        },
        {
            name:'Water  ',
            description:'3',
            price:'0.05',
            image:'water.jpg',
            units: 0
        },
    ]    
  },
  mutations: {
    setFruitUnits (state, fruitUnits) {
      const fruit = state.fruits.filter((item)=>(item.name==fruitUnits.name))
      if (fruit && fruit.length > 0) {
        fruit[0].units = fruitUnits.units
      }
    },
    setContract (state, address) {
      state.contract = address
    },
    clearFruitUnits (state) {
      const newFruits = state.fruits.map(fruit => {
        fruit.units = 0
        return fruit
      })
      state.fruits = newFruits
    }
  },
  getters: {
    totalAmount: state => {
      return state.fruits.reduce((accumulator, currentValue) => (accumulator + Number(currentValue.units) * parseFloat(currentValue.price)), 0)
    },
    getFruitUnits: (state) => (name) => {
      const fruit = state.fruits.filter((item)=>(item.name==name))
      if (fruit && fruit.length > 0) {
        return fruit[0].units
      }
      return 0     
    },
    getFruitUnit: state => {
      return state.fruits.reduce((accumulator, currentValue) => currentValue.units)
    },
  },
  actions: {

  }
})
