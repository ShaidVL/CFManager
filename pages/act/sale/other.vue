<template>
  <div>
    <button @click="$router.push('/act/sale')">Назад</button>
    <div>Добавить актив</div>
    <div>Наименование<input type="text"></div>
    <div>Количество<input type="text"></div>
    <div>Общая стоимость<input type="text"></div>

    <div>Цена покупки:</div>
    <button @click="addAsset">Купить</button>
  </div>
</template>

<script>

  export default {
    middleware: ['checkUser'],
    layout: 'action',

    methods:{
      addAsset(){

      },
    }
  }
</script>

<style>
</style>
