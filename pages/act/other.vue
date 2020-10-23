<template>
  <div>
    <button @click="$router.push('/act')">Назад</button>
    <div>Добавить актив</div>
    <div>Наименование<input v-model="name" type="text" @input="checkForDigit"></div>
    <div>Количество<input v-model="amount" name="amount" type="text" @input="checkForDigit"></div>
    <div>Общая стоимость<input v-model="price" name="price" type="text" @input="checkForDigit"></div>

    <div>Цена покупки: {{price}}</div>
    <button @click="addAsset">Купить</button>
  </div>
</template>

<script>

  export default {
    middleware: ['checkUser'],
    layout: 'action',

    data(){
      return{
        name:'',
        amount:0,
        price:0,
      }
    },
    methods:{
      addAsset() {
        const {name, amount, price} = this
        const user = this.$store.state.user
        const id = user.other.length > 0 ? user.other[user.other.length - 1].id + 1 : 1
        const person = {
          ...user,
          cash: user.cash - Number(this.price),
          other: [...user.other, {id, name, amount, price}]
        }
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)
        this.$router.push('/')
      },
      checkForDigit(event) {
        const name = event.target.name
        const value = event.target.value
        this[name] = value.replace(/\D/g, '')
        if (this[name].length > 1) {
          this[name] = this[name].replace(/^0+/, '')
        }
        if (this[name].length === 0) {
          this[name] = '0'
        }
      },
    }
  }
</script>

<style>
</style>
