<template>
  <div>
    <button @click="$router.push('/act')">Назад</button>
    <div v-for="stock in user.stocks">
      <div>Акции/Взаимные фонды/Депозиты:</div>
      <div>{{stock.name}}: {{stock.amount}} акций по ${{stock.price}}</div>
      <button @click="$router.push(`sale/stock?id=${stock.id}`)">Продать</button>
      <hr>
    </div>

    <div v-for="realEstate in user.realEstate">
      <div>Недвижимость:</div>
      <div>{{realEstate.name}}</div>
      <div>Стоимость: {{realEstate.price}}</div>
      <div>Ипотека: {{realEstate.homeMortgage}}</div>
      <div>Начальный взнос: {{realEstate.downPay}}</div>
      <div>Пассивный доход: {{realEstate.cashFlow}}</div>
      <button @click="$router.push(`sale/estate?id=${realEstate.id}`)">Продать</button>
      <hr>
    </div>

    <div v-for="item in user.business">
      <div>Бизнес:</div>
      <div>{{item.name}}</div>
      <div>Стоимость: {{item.price}}</div>
      <div>Долг: {{item.debt}}</div>
      <div>Начальный взнос: {{item.downPay}}</div>
      <div>Пассивный доход: {{item.cashFlow}}</div>
      <button @click="$router.push(`sale/business?id=${item.id}`)">Продать</button>
      <hr>
    </div>

    <div v-for="item in user.other">
      <div>Другое:</div>
      <div>{{item.name}}</div>
      <div>Количество: {{item.amount}}</div>
      <div>Стоимость: {{item.price}}</div>
      <button @click="$router.push(`sale/other?id=${item.id}`)">Продать</button>
      <hr>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    middleware: ['checkUser'],
    layout: 'action',
    computed: {
      ...mapState({
        user: state => state.user
      }),
    },
    methods: {
      addAsset() {

      },

    }
  }
</script>

<style>
</style>
