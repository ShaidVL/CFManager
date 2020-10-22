<template>
  <div>
    <button @click="$router.push('/act/sale')">Назад</button>
    <div>Бизнес</div>
    <div>Наименование: {{name}}</div>
    <div>Стоимость: {{price}}</div>
    <div>Долг: {{debt}}</div>
    <div>Цена покупки: {{downPay}}</div>
    <div>Пассивный доход: {{cashFlow}}</div>
    <hr>
    <div>Цена продажи<input v-model="salePrice" name="salePrice" type="text" @input="checkForDigit"></div>
    <hr>
    <div>Итого: {{total}} Выгода: {{benefit}}</div>
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
        price: 0,
        debt: 0,
        cashFlow: 0,
        downPay: 0,
        salePrice: 0,
      }
    },
    mounted(){
      this.id = Number(this.$route.query.id)
      const item = this.$store.state.user.business.find(item=>item.id===this.id)
      this.name=item.name
      this.price=item.price
      this.debt=item.debt
      this.cashFlow=item.cashFlow
      this.downPay=item.downPay
    },
    computed: {
      total(){
        return Number(this.salePrice) - Number(this.debt)
      },
      benefit(){
        return this.total - Number(this.downPay)
      }
    },
    methods:{
      removeAsset() {
        const user = this.$store.state.user
        const person = {
          ...user,
          cash: user.cash - this.downPay,
          business: user.business.filter(item=>item.id!==this.id)
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
