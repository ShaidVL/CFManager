<template>
  <div>
    <button @click="$router.push('/act')">Назад</button>
    <hr>
    <div>Покупка недвижимости</div>
    <br>
    <div>Наименование: <input v-model="name" type="text"></div>
    <br>
    <div>Стоимость: <input v-model="price" name="price" type="text" @input="checkForDigit" @change="onChange"></div>
    <br>
    <div>Ипотека: <input v-model="homeMortgage" name="homeMortgage" type="text" @input="checkForDigit" @change="onChange">
    </div>
    <hr>
    <div><input v-model="minus" type="checkbox"> Отрицательный пассивный доход</div>
    <br>
    <div>Пассивный доход:  <span v-if="minus">- </span><input v-model="cashFlow" name="cashFlow" type="text" @input="checkForDigit"></div>
    <hr>

    <div>Первый взнос: {{downPay}}$</div>
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
        homeMortgage: 0,
        cashFlow: 0,
        minus: false,
      }
    },
    computed: {
      downPay() {
        return Number(this.price) - Number(this.homeMortgage)
      }
    },
    methods: {
      addAsset() {
        const {name, price, homeMortgage, downPay, cashFlow} = this
        const user = this.$store.state.user
        const id = user.realEstate.length > 0 ? user.realEstate[user.realEstate.length - 1].id + 1 : 1
        if (Number(downPay) > user.cash) {
          let sum = (Number(downPay) - user.cash)
          sum = sum - sum % 1000 + 1000
          alert(`Вам нехватает средств. нужен кредит минимум на ${sum}`)
        } else {
          const person = {
            ...user,
            cash: user.cash - Number(this.downPay),
            realEstate: [...user.realEstate, {
              id,
              name,
              price: Number(price),
              homeMortgage: Number(homeMortgage),
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
        if (Number(this.homeMortgage) > Number(this.price)) {
          this.homeMortgage = this.price
        }
      }
    }
  }
</script>

<style>
</style>
