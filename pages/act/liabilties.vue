<template>
  <div>
    <button @click="$router.push('/act')">Назад</button>
    <hr>
    <div>
      {{user.totalDebt}}$
      <button @click="payTotalDebt">Выплатить общий долг(дом, машина, обучение...)</button>
    </div>
    <hr>
    <div>
      <input v-model="getCredit" name="getCredit" type="text" @input="checkForDigit">
      <button @click="getLoan" :disabled="!getCreditIsValid">Получить кредит банка</button>
      <div v-if="!getCreditIsValid">число должно быть кратно 1000</div>
    </div>
    <hr>
    <div>
      <input v-model="repayCredit" name="repayCredit" type="text" @input="checkForDigit" @change="checkSum">
      <button @click="repayLoan" :disabled="!repayCreditIsValid">Погасить кредит банка</button>
      <div v-if="!repayCreditIsValid">число должно быть кратно 1000</div>
    </div>
    <hr>
    <div>
      У Вас {{user.childrenAmount}} детей, при расходе {{user.perChildExpenses}}$ на ребенка
      <button @click="addChild">Добавить ребенка</button>
    </div>
    <hr>
    <div>
      <div>Название <input v-model="liabilityName" type="text"></div>
      <div>
        Первоначальный взнос
        <input v-model="liabilityDownPay" name="liabilityDownPay" type="text" @input="checkForDigit">
      </div>
      <div>
        Ежемесячная выплата
        <input v-model="liabilityMonthlyPay" name="liabilityMonthlyPay" type="text" @input="checkForDigit">
      </div>
      <div><input v-model="liabilityRepayAbility" type="checkbox">Есть возможность погасить</div>
      <div>Долг<input v-model="liabilityDebt" name="liabilityDebt" type="text" @input="checkForDigit"
                      :disabled="!liabilityRepayAbility"></div>

      <br>
      <button @click="addLiability">Добавить пассив</button>
    </div>
    <hr>
    <button @click="showLiability = !showLiability">Убрать пассивы</button>
    <div v-if="showLiability">
      <div v-for="liability in this.repayLiabilities">
        <div>{{liability.name}}: {{liability.debt}}</div>
        <div>
          <button @click="removeLiability(liability)">Убрать</button>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    middleware: ['checkUser'],
    layout: 'action',

    data() {
      return {
        getCredit: 0,
        getCreditIsValid: true,
        repayCredit: 0,
        repayCreditIsValid: true,
        liabilityName: '',
        liabilityMonthlyPay: 0,
        liabilityDownPay: 0,
        liabilityRepayAbility: false,
        liabilityDebt: 0,
        showLiability: false,
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      totalIncome() {
        return this.user.passiveIncome + this.user.salary
      },
      cashFlow() {
        return this.totalIncome - this.user.totalExpenses
      },
      repayLiabilities() {
        return this.user.liabilities.filter(liability => liability.repayAbility)
      }
    },
    methods: {
      payTotalDebt() {
        if (this.user.totalDebt > 0) {
          const person = {
            ...this.user,
            cash: this.user.cash - this.user.totalDebt,
            homeMortgagePayment: 0,
            schoolLoanPayment: 0,
            carLoanPayment: 0,
            creditCardPayment: 0,
            retailPayment: 0,
            homeMortgage: 0,
            schoolLoans: 0,
            carLoans: 0,
            creditCards: 0,
            retailDebt: 0,
          }
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
          this.$router.push('/')
        }
      },
      getLoan() {
        if(Number(this.getCredit)!==0){
          const person = {
            ...this.user,
            cash: this.user.cash + Number(this.getCredit),
            bankLoan: this.user.bankLoan + Number(this.getCredit),
            bankLoanPayment: this.user.bankLoanPayment + Number(this.getCredit) / 10,
          }
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
          this.$router.push('/')
        }
      },
      checkSum(){
        if(this.user.bankLoan < Number(this.repayCredit)){
          this.repayCredit=this.user.bankLoan
        }
      },
      repayLoan() {
        if(Number(this.repayCredit)!==0){
          const person = {
            ...this.user,
            cash: this.user.cash - Number(this.repayCredit),
            bankLoan: this.user.bankLoan - Number(this.repayCredit),
            bankLoanPayment: this.user.bankLoanPayment - Number(this.repayCredit) / 10,
          }
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
          this.$router.push('/')
        }
      },
      addChild() {
        if (this.user.childrenAmount < 3) {
          const person = {
            ...this.user,
            childrenAmount: this.user.childrenAmount + 1,
            childExpenses: (this.user.childrenAmount + 1) * this.user.perChildExpenses
          }
          localStorage.setItem('user', JSON.stringify(person))
          this.$store.commit('setProfession', person)
          this.$router.push('/')
        }
      },
      addLiability() {
        const {liabilityName, liabilityMonthlyPay, liabilityDownPay, liabilityRepayAbility, liabilityDebt} = this
        const id = this.user.liabilities.length > 0 ? this.user.liabilities[this.user.liabilities.length - 1].id + 1 : 1
        const person = {
          ...this.user,
          cash: this.user.cash - Number(liabilityDownPay),
          liabilities: [...this.user.liabilities, {
            id,
            name: liabilityName,
            monthlyPay: liabilityMonthlyPay,
            repayAbility: liabilityRepayAbility,
            debt: liabilityDebt
          }]
        }
        localStorage.setItem('user', JSON.stringify(person))
        this.$store.commit('setProfession', person)
        this.$router.push('/')
      },
      removeLiability(liability) {
        const person = {
          ...this.user,
          cash: this.user.cash - Number(liability.debt),
          liabilities: this.user.liabilities.filter(item => item.id !== liability.id),
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
        if (name === 'getCredit' || name === 'repayCredit') {
          if (this[name] % 1000){
            this[`${name}IsValid`] = false
          }else{
            this[`${name}IsValid`] = true
          }
        }
      },
    }
  }
</script>

<style>
</style>
