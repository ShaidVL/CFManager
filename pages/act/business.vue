<template>
  <div>
    <button @click="$router.push('/act')">Назад</button>
    <hr>
    <div>Бизнес</div>
    <br>
    <div>Наименование: <input v-model="name" type="text"></div>
    <br>
    <div>Стоимость: <input v-model="price" name="price" type="text" @input="checkForDigit" @change="onChange"></div>
    <br>
    <div>Долг: <input v-model="debt" name="debt" type="text" @input="checkForDigit" @change="onChange"></div>
    <hr>
    <div><input v-model="minus" type="checkbox"> Отрицательный пассивный доход</div>
    <br>
    <div>Пассивный доход: <span v-if="minus">- </span><input v-model="cashFlow" name="cashFlow" type="text" @input="checkForDigit"></div>
    <hr>

    <div>Цена покупки: {{downPay}}</div>
    <br>
    <button @click="addAsset">Купить</button>
  </div>
</template>

<script>

  export default {
    middleware: ['checkUser'],
    layout: 'action',

    data() {
      return {
        name: '',
        price: 0,
        debt: 0,
        cashFlow: 0,
        minus: false,
      }
    },
    computed: {
      downPay() {
        return Number(this.price) - Number(this.debt)
      }
    },
    methods: {
      addAsset() {
        const {name, price, debt, downPay, cashFlow} = this
        const user = this.$store.state.user
        const id = user.business.length > 0 ? user.business[user.business.length - 1].id + 1 : 1
        if (Number(downPay) > user.cash) {
          let sum = (Number(downPay) - user.cash)
          sum = sum - sum % 1000 + 1000
          alert(`Вам нехватает средств. нужен кредит минимум на ${sum}`)
        } else {
          const person = {
            ...user,
            cash: user.cash - this.downPay,
            business: [...user.business, {
              id,
              name,
              price: Number(price),
              debt: Number(debt),
              downPay,
              cashFlow: this.minus ? -Number(cashFlow) : Number(cashFlow)
            }]
          }
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
          this.$router.push('/')
        }
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
      onChange() {
        if (Number(this.debt) > Number(this.price)) {
          this.debt = this.price
        }
      }
    }
  }
</script>

<style>
</style>
