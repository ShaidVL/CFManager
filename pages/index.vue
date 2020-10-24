<template>
  <div>
    <div>
      <div class="row bg-secondary text-white p-1 font-weight-bold">
        <div class="col">Доходы:</div>
      </div>
      <div class="row justify-content-around bg-success text-white p-1 font-weight-bold">
        <div class="col-auto">Пассивный доход: {{user.passiveIncome}}$</div>
        <div class="col-auto">Общий доход: {{totalIncome}}$</div>
      </div>

      <div class="row justify-content-between p-1">
        <div class="col">Заработок:</div>
        <div class="col-auto mr-3">{{user.salary}}$</div>
      </div>
      <div v-if="dividends.length > 0">
        <div class="row p-1">
          <div class="col">Дивиденты:</div>
        </div>
        <div class="row p-1" v-for="dividend in dividends" :key="dividend.id">
          <div class="col border-bottom ml-3">{{dividend.name}}({{dividend.cashFlow}}*{{dividend.amount}})</div>
          <div class="col-auto border-bottom mr-3">{{dividend.cashFlow*dividend.amount}}$</div>
        </div>
      </div>
      <div v-if="user.realEstate.length > 0">
        <div class="row p-1">
          <div class="col">Недвижимость:</div>
        </div>
        <div class="row p-1" v-for="estate in user.realEstate" :key="estate.id">
          <div class="col border-bottom ml-3">{{estate.name}}</div>
          <div class="col-auto border-bottom mr-3">{{estate.cashFlow}}$</div>
        </div>
      </div>
      <div v-if="user.business.length > 0">
        <div class="row p-1">
          <div class="col">Бизнес:</div>
        </div>
        <div class="row p-1" v-for="item in user.business" :key="item.id">
          <div class="col border-bottom ml-3">{{item.name}}</div>
          <div class="col-auto border-bottom mr-3">{{item.cashFlow}}$</div>
        </div>
      </div>
    </div>
    <div>
      <div class="row bg-secondary text-white p-1 font-weight-bold">
        <div class="col">Расходы:</div>
      </div>
      <div class="row bg-danger text-white p-1 font-weight-bold">
        <div class="col-sm-6 text-center">Общий расход: {{user.totalExpenses}}$</div>
      </div>

      <div class="row p-1">
        <div class="col border-bottom ml-3">Налоги:</div>
        <div class="col-auto border-bottom mr-3">{{user.taxes}}$</div>
      </div>
      <div class="row p-1" v-if="user.homeMortgagePayment">
        <div class="col border-bottom ml-3">Оплата закладной на дом:</div>
        <div class="col-auto border-bottom mr-3">{{user.homeMortgagePayment}}$</div>
      </div>
      <div class="row p-1" v-if="user.schoolLoanPayment">
        <div class="col border-bottom ml-3">Оплата кредита на образование:</div>
        <div class="col-auto border-bottom mr-3">{{user.schoolLoanPayment}}$</div>
      </div>
      <div class="row p-1" v-if="user.carLoanPayment">
        <div class="col border-bottom ml-3">Оплата кредита на автомобиль:</div>
        <div class="col-auto border-bottom mr-3">{{user.carLoanPayment}}$</div>
      </div>
      <div class="row p-1" v-if="user.creditCardPayment">
        <div class="col border-bottom ml-3">Выплаты по кредитной карточке:</div>
        <div class="col-auto border-bottom mr-3">{{user.creditCardPayment}}$</div>
      </div>
      <div class="row p-1" v-if="user.retailPayment">
        <div class="col border-bottom ml-3">Розничные расходы:</div>
        <div class="col-auto border-bottom mr-3">{{user.retailPayment}}$</div>
      </div>
      <div class="row p-1" v-for="liability in this.user.liabilities">
        <div class="col border-bottom ml-3">{{liability.name}}:</div>
        <div class="col-auto border-bottom mr-3">{{liability.monthlyPay}}$</div>
      </div>
      <div class="row p-1">
        <div class="col border-bottom ml-3">Другие расходы:</div>
        <div class="col-auto border-bottom mr-3">{{user.otherExpenses}}$</div>
      </div>
      <div class="row p-1" v-if="user.childrenAmount">
        <div class="col border-bottom ml-3">Расходы на детей({{user.perChildExpenses}}$*{{user.childrenAmount}}):</div>
        <div class="col-auto border-bottom mr-3">$</div>
      </div>
      <div class="row p-1" v-if="user.bankLoanPayment">
        <div class="col border-bottom ml-3">Оплата кредита банка:</div>
        <div class="col-auto border-bottom mr-3">{{user.bankLoanPayment}}$</div>
      </div>
    </div>
    <div class=" row bg-warning text-dark p-1 font-weight-bold">
      <div class="col-sm-6 text-center">Ежемесячный доход: {{cashFlow}}$</div>
    </div>

    <div>
      <div class="row bg-secondary text-white p-1 font-weight-bold">
        <div class="col">Активы:</div>
      </div>
      <div v-if="user.stocks.length>0">
        <div class="row p-1">
          <div class="col" style="font-size: 0.8rem">Акции/Взаимные фонды/Депозиты:</div>
        </div>
        <div class="row p-1" v-for="stock in user.stocks">
          <div class="col border-bottom mx-3" style="font-size: 0.9rem">{{stock.name}}: {{stock.amount}} акций по ${{stock.price}}</div>
        </div>
      </div>
<!--      <div v-if="user.realEstate.length>0">-->
<!--        <div class="row p-1">-->
<!--          <div class="col-6 text-break" style="font-size: 0.65rem">Недвижимость</div>-->
<!--          <div class="col-2 text-break" style="font-size: 0.65rem">Стоимость</div>-->
<!--          <div class="col-2 text-break" style="font-size: 0.65rem">Ипотека</div>-->
<!--          <div class="col-2 text-break" style="font-size: 0.65rem">Первый взнос</div>-->
<!--        </div>-->
<!--        <div class="row p-1" v-for="realEstate in user.realEstate">-->
<!--          <div class="col-6 text-break border-bottom" style="font-size: 0.9rem">{{realEstate.name}}</div>-->
<!--          <div class="col-2 text-break border-bottom" style="font-size: 0.9rem">{{realEstate.price}}</div>-->
<!--          <div class="col-2 text-break border-bottom" style="font-size: 0.9rem">{{realEstate.homeMortgage}}</div>-->
<!--          <div class="col-2 text-break border-bottom" style="font-size: 0.9rem">{{realEstate.downPay}}</div>-->
<!--        </div>-->
<!--      </div>-->
      <div v-if="user.realEstate.length>0">
        <div class="row p-1">
          <div class="col" style="font-size: 0.8rem">Недвижимость:Первый взнос/Стоимость/Ипотека</div>
        </div>
        <div class="row p-1" v-for="realEstate in user.realEstate">
          <div class="col border-bottom mx-3" style="font-size: 0.9rem">{{realEstate.name}}:{{realEstate.downPay}}$/{{realEstate.price}}$/{{realEstate.homeMortgage}}$</div>
        </div>
      </div>
      <div v-if="user.business.length>0">
        <div class="row p-1">
        <div class="col" style="font-size: 0.8rem">Бизнес:Первый взнос/Стоимость/Долг</div>
        </div>
        <div v-for="item in user.business">
          <div class="col border-bottom mx-3" style="font-size: 0.9rem">{{item.name}}:{{item.downPay}}$/{{item.price}}$/{{item.debt}}$</div>
        </div>
      </div>
      <div v-if="user.other.length>0">
        <div class="row p-1">
        <div class="col" style="font-size: 0.8rem">Другое:Количество/Стоимость</div>
        </div>
        <div v-for="item in user.other">
          <div class="col border-bottom mx-3" style="font-size: 0.9rem">{{item.name}}:{{item.amount}}/{{item.price}}$</div>
        </div>
      </div>

    </div>

    <div>

      <div class="row bg-secondary text-white p-1 font-weight-bold">
        <div class="col">Пассивы:</div>
      </div>
      <div class="row p-1" v-if="user.homeMortgage">
        <div class="col border-bottom ml-3">Закладная на дом:</div>
        <div class="col-auto border-bottom mr-3">{{user.homeMortgage}}$</div>
      </div>
      <div class="row p-1" v-if="user.schoolLoans">
        <div class="col border-bottom ml-3">Кредит на образование:</div>
        <div class="col-auto border-bottom mr-3">{{user.schoolLoans}}$</div>
      </div>
      <div class="row p-1" v-if="user.carLoans">
        <div class="col border-bottom ml-3">Кредит на автомобиль:</div>
        <div class="col-auto border-bottom mr-3">{{user.carLoans}}$</div>
      </div>
      <div class="row p-1" v-if="user.creditCards">
        <div class="col border-bottom ml-3">Долг по кредитной карточке:</div>
        <div class="col-auto border-bottom mr-3">{{user.creditCards}}$</div>
      </div>
      <div class="row p-1" v-if="user.retailDebt">
        <div class="col border-bottom ml-3">Розничный долг:</div>
        <div class="col-auto border-bottom mr-3">{{user.retailDebt}}$</div>
      </div>
      <div class="row p-1" v-if="user.bankLoan">
        <div class="col border-bottom ml-3">Кредит банка:</div>
        <div class="col-auto border-bottom mr-3">{{user.bankLoan}}$</div>
      </div>
      <div class="row p-1" v-for="liability in repayLiabilities">
        <div class="col border-bottom ml-3">{{liability.name}}:</div>
        <div class="col-auto border-bottom mr-3">{{liability.debt}}$</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    middleware: ['checkUser'],
    layout: 'statement',
    data() {
      return {}
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
      },
      dividends() {
        return this.user.stocks.filter(stock => stock.cashFlowAbility)
      }
    }
  }
</script>

<style>
</style>
