<template>
  <div>
    <button @click="$router.push('/act')">Назад</button>
    <div>Покупка Акций/Депозита</div>
    <div>Наименование<input v-model="name" type="text" @input="checkForDigit"></div>
    <div>Количество<input v-model="amount" name="amount" type="number" @input="checkForDigit"></div>
    <div>Цена акции<input v-model="price" name="price" type="number" @input="checkForDigit"></div>

    <div><input v-model="cashFlowAbility" type="checkbox">Пассивный доход</div>
    <div>Доход <input v-model="cashFlow" name="cashFlow" type="number" @input="checkForDigit"
                      :disabled="!cashFlowAbility"></div>

    <div>Цена покупки: {{total}}</div>
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
        amount: 0,
        price: 0,
        cashFlow: 0,
        cashFlowAbility: false,
      }
    },
    computed: {
      total() {
        return Number(this.amount) * Number(this.price)
      }
    },
    methods: {
      addAsset() {
        const {name, price, amount, cashFlow, cashFlowAbility} = this
        const user = this.$store.state.user
        const id = user.stocks.length > 0 ? user.stocks[user.stocks.length - 1].id + 1 : 1
        if (Number(price) * Number(amount) > user.cash) {
          let sum = (Number(price) * Number(amount) - user.cash)
          sum = sum - sum % 1000 + 1000
          alert(`Вам нехватает средств. нужен кредит минимум на ${sum}`)
        } else {
          const person = {
            ...user,
            cash: user.cash - this.total,
            stocks: [...user.stocks, {
              id,
              name,
              price: Number(price),
              amount: Number(amount),
              cashFlow: Number(cashFlow),
              cashFlowAbility
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
    }
  }
</script>

<style>
</style>
