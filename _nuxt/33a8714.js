(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{199:function(e,t,r){"use strict";var n=r(2),o=r(35).find,c=r(104),l=r(21),v=!0,h=l("find");"find"in[]&&Array(1).find((function(){v=!1})),n({target:"Array",proto:!0,forced:v||!h},{find:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),c("find")},210:function(e,t,r){"use strict";r.r(t);r(20),r(31),r(199),r(27),r(34),r(151),r(41),r(42),r(32),r(43),r(79),r(28);var n=r(15);function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var l={middleware:["checkUser"],layout:"action",data:function(){return{name:"",amount:0,price:0,salePrice:0}},mounted:function(){var e=this;this.id=Number(this.$route.query.id);var t=this.$store.state.user.other.find((function(t){return t.id===e.id}));this.name=t.name,this.amount=t.amount,this.price=t.price},computed:{benefit:function(){return Number(this.salePrice)-Number(this.price)}},methods:{removeAsset:function(){var e=this,t=this.$store.state.user,r=c(c({},t),{},{cash:t.cash+Number(this.salePrice),other:t.other.filter((function(t){return t.id!==e.id}))});localStorage.setItem("user",JSON.stringify(r)),this.$store.commit("setProfession",r),this.$router.push("/")},checkForDigit:function(e){var t=e.target.name,r=e.target.value;this[t]=r.replace(/\D/g,""),this[t].length>1&&(this[t]=this[t].replace(/^0+/,"")),0===this[t].length&&(this[t]="0")}}},v=r(16),component=Object(v.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("button",{on:{click:function(t){return e.$router.push("/act/sale")}}},[e._v("Назад")]),e._v(" "),r("div",[e._v("Продать актив")]),e._v(" "),r("div",[e._v("Наименование: "+e._s(e.name))]),e._v(" "),r("div",[e._v("Количество: "+e._s(e.amount))]),e._v(" "),r("div",[e._v("Стоимость: "+e._s(e.price))]),e._v(" "),r("hr"),e._v(" "),r("div",[e._v("Цена продажи"),r("input",{directives:[{name:"model",rawName:"v-model",value:e.salePrice,expression:"salePrice"}],attrs:{name:"salePrice",type:"text"},domProps:{value:e.salePrice},on:{input:[function(t){t.target.composing||(e.salePrice=t.target.value)},e.checkForDigit]}})]),e._v(" "),r("hr"),e._v(" "),r("div",[e._v("Итого: "+e._s(e.salePrice)+" Выгода: "+e._s(e.benefit))]),e._v(" "),r("button",{on:{click:e.removeAsset}},[e._v("Продать")])])}),[],!1,null,null,null);t.default=component.exports}}]);