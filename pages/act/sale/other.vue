<template>
  <div>
    <button @click="$router.push('/act/sale')">Назад</button>
    <div>Продать актив</div>
    <div>Наименование: {{name}}</div>
    <div>Количество: {{amount}}</div>
    <div>Стоимость: {{price}}</div>
    <hr>
    <div>Цена продажи<input v-model="salePrice" name="salePrice" type="text" @input="checkForDigit"></div>
    <hr>
    <div>Итого: {{salePrice}} Выгода: {{benefit}}</div>
    <button @click="removeAsset">Продать</button>
  </div>
</template>

<script>

  export default {
    middleware: ['checkUser'],
    layout: 'action',

    data(){
      return{
        name: '',
        amount: 0,
        price: 0,
        salePrice: 0,
      }
    },
    mounted(){
      this.id = Number(this.$route.query.id)
      const item = this.$store.state.user.other.find(item=>item.id===this.id)
      this.name=item.name
      this.amount=item.amount
      this.price=item.price
    },
    computed: {
      benefit(){
        return Number(this.salePrice) - Number(this.price)
      }
    },
    methods:{
      removeAsset() {
        const user = this.$store.state.user
        const person = {
          ...user,
          cash: user.cash + Number(this.salePrice),
          other: user.other.filter(item=>item.id!==this.id)
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
