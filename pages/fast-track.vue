<template>
  <div>
    <div>
      <button @click="newGame">Новая игра</button>
    </div>
    <hr>
    <div>Ваш начальный пассивный доход: {{user.initialCashFlow}}$</div>
    <div>Пассивный доход для выигрыша: {{user.initialCashFlow + 50000}}$</div>
    <hr>
    <div>Ваши деньги: {{user.cash}}$</div>
    <br>
    <div>
      <button @click="getMoney">Получить деньги</button>
      <input v-model="getCash" name="getCash" type="text" @input="checkForDigit">
    </div>
    <br>
    <div>
      <button @click="spendMoney">Потратить деньги</button>
      <input v-model="spendCash" name="spendCash" type="text" @input="checkForDigit">
    </div>
    <br>
    <div>
      <button @click="getSalary">Cash Flow</button>
      {{cashFlow}}$
    </div>
    <hr>
    <div>
      <div>Название: <input v-model="name" type="text"></div>
      <br>
      <div>Доходность: <input v-model="businessYield" name="businessYield" type="text" @input="checkForDigit"></div>
      <br>
      <div>Стоимость: <input v-model="businessPrice" name="businessPrice" type="text" @input="checkForDigit"></div>
      <br>
      <div>
        <button @click="addBusiness">Добавить</button>
      </div>
    </div>
    <hr>
    <div v-for="item in user.business">
      {{item.name}} {{item.yield}}
      <button @click="removeBusiness(item.id)">Убрать</button>
    </div>
    <br>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    middleware: ['checkUser'],

    data() {
      return {
        getCash: 0,
        spendCash: 0,
        name: '',
        businessYield: 0,
        businessPrice: 0,
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      cashFlow() {
        return this.user.initialCashFlow + (this.user.business && this.user.business.reduce((acc, item) => acc + item.yield, 0))
      }
    },
    methods: {
      getMoney() {
        const person = {
          ...this.user,
          cash: this.user.cash + Number(this.getCash)
        }
        this.getCash = 0
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)
      },
      spendMoney() {
        if (Number(this.spendCash) > this.user.cash) {
          alert(`Вам нехватает средств. `)
        } else {
          const person = {
            ...this.user,
            cash: this.user.cash - Number(this.spendCash)
          }
          this.spendCash = 0
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
        }
      },
      getSalary() {
        const person = {
          ...this.user,
          cash: this.user.cash + this.cashFlow,
        }
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)

      },
      addBusiness() {
        if (Number(this.businessPrice) > this.user.cash) {
          alert(`Вам нехватает средств.`)
        } else {
          const id = this.user.business.length > 0 ? this.user.business[this.user.business.length - 1].id + 1 : 1
          const person = {
            ...this.user,
            cash: this.user.cash - Number(this.businessPrice),
            business: [...this.user.business, {id, name: this.name, yield: Number(this.businessYield)}],
          }
          this.name = ''
          this.businessYield = 0
          this.businessPrice = 0
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
        }
      },
      removeBusiness(id) {
        const person = {
          ...this.user,
          business: this.user.business.filter(item => item.id !== id),
        }
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)

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
      newGame() {
        localStorage.removeItem('user')
        this.$store.commit('newGame')
        this.$router.push('/profession')
      },
    }
  }
</script>
<style>
</style>
