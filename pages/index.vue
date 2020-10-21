<template>
  <div>
    <div class="incomes">
      <p>Доходы:</p>
      <hr>
      <p>Заработок:{{profession.salary}}</p>
      <p>Дивиденты:</p>
      <p>Недвижимость:</p>
      <p>Бизнес:</p>
    </div>
    <div  class="expenses">
      <p>Расходы:</p>
      <hr>
      <p>Налоги:{{profession.taxes}}</p>
      <p>Оплата закладной на дом:{{profession.homeMortgagePayment}}</p>
      <p>Оплата кредита на образование:{{profession.schoolLoanPayment}}</p>
      <p>Оплата кредита на автомобиль:{{profession.carLoanPayment}}</p>
      <p>Выплаты по кредитной карточке:{{profession.creditCardPayment}}</p>
      <p>Розничные расходы:{{profession.retailPayment}}</p>
      <p>Другие расходы:{{profession.otherExpenses}}</p>
      <p>Расходы на детей:</p>
      <p>Оплата кредита банка:</p>
    </div>
    <p>Ежемесячный доход:</p>

    <div class="incomes">
      <p>Активы:</p>
      <hr>
      <p>Акции/Взаимные фонды/Депозиты:</p>
      <p>Недвижимость:</p>
      <p>Бизнес:</p>
    </div>
    <div  class="expenses">
      <p>Пассивы:</p>
      <hr>
      <p>Закладная на дом:</p>
      <p>Кредит на образование:</p>
      <p>Кредит на автомобиль:</p>
      <p>Долг по кредитной карточке:</p>
      <p>Розничный долг:</p>
      <p>По закладным:</p>
      <p>Пассивы(бизнес):</p>
      <p>Кредит банка:</p>
    </div>
  </div>
</template>

<script>
  import {profession} from '~/static/profession'

  export default {
    data(){
      return{
        profession: profession[0],
      }
    },
    mounted() {
      console.log(profession)
    }
  }
</script>

<style>
  .expenses, .incomes{
    border: 1px solid black;
  }
</style>
