(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{200:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var o=r(80);var n=r(105);function c(e){return function(e){if(Array.isArray(e))return Object(o.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(n.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},215:function(e,t,r){"use strict";r.r(t);r(20),r(103),r(31),r(27),r(34),r(151),r(41),r(42),r(32),r(43),r(79),r(28);var o=r(200),n=r(15);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var m={middleware:["checkUser"],layout:"action",data:function(){return{name:"",amount:0,price:0,cashFlow:0,cashFlowAbility:!1}},computed:{total:function(){return Number(this.amount)*Number(this.price)}},methods:{addAsset:function(){var e=this.name,t=this.price,r=this.amount,n=this.cashFlow,c=this.cashFlowAbility,m=this.$store.state.user,v=m.stocks.length>0?m.stocks[m.stocks.length-1].id+1:1;if(Number(t)*Number(r)>m.cash){var h=Number(t)*Number(r)-m.cash;h=h-h%1e3+1e3,alert("Вам нехватает средств. нужен кредит минимум на ".concat(h))}else{var d=l(l({},m),{},{cash:m.cash-this.total,stocks:[].concat(Object(o.a)(m.stocks),[{id:v,name:e,price:Number(t),amount:Number(r),cashFlow:Number(n),cashFlowAbility:c}])});localStorage.setItem("user",JSON.stringify(d)),this.$store.commit("setProfession",d),this.$router.push("/")}},checkForDigit:function(e){var t=e.target.name,r=e.target.value;this[t]=r.replace(/\D/g,""),this[t].length>1&&(this[t]=this[t].replace(/^0+/,"")),0===this[t].length&&(this[t]="0")}}},v=r(16),component=Object(v.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("button",{on:{click:function(t){return e.$router.push("/act")}}},[e._v("Назад")]),e._v(" "),r("hr"),e._v(" "),r("div",[e._v("Покупка Акций/Депозита")]),e._v(" "),r("br"),e._v(" "),r("div",[e._v("Наименование"),r("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text"},domProps:{value:e.name},on:{input:[function(t){t.target.composing||(e.name=t.target.value)},e.checkForDigit]}})]),e._v(" "),r("br"),e._v(" "),r("div",[e._v("Количество"),r("input",{directives:[{name:"model",rawName:"v-model",value:e.amount,expression:"amount"}],attrs:{name:"amount",type:"number"},domProps:{value:e.amount},on:{input:[function(t){t.target.composing||(e.amount=t.target.value)},e.checkForDigit]}})]),e._v(" "),r("br"),e._v(" "),r("div",[e._v("Цена акции"),r("input",{directives:[{name:"model",rawName:"v-model",value:e.price,expression:"price"}],attrs:{name:"price",type:"number"},domProps:{value:e.price},on:{input:[function(t){t.target.composing||(e.price=t.target.value)},e.checkForDigit]}})]),e._v(" "),r("hr"),e._v(" "),r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.cashFlowAbility,expression:"cashFlowAbility"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.cashFlowAbility)?e._i(e.cashFlowAbility,null)>-1:e.cashFlowAbility},on:{change:function(t){var r=e.cashFlowAbility,o=t.target,n=!!o.checked;if(Array.isArray(r)){var c=e._i(r,null);o.checked?c<0&&(e.cashFlowAbility=r.concat([null])):c>-1&&(e.cashFlowAbility=r.slice(0,c).concat(r.slice(c+1)))}else e.cashFlowAbility=n}}}),e._v("Пассивный доход")]),e._v(" "),r("br"),e._v(" "),r("div",[e._v("Доход "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.cashFlow,expression:"cashFlow"}],attrs:{name:"cashFlow",type:"number",disabled:!e.cashFlowAbility},domProps:{value:e.cashFlow},on:{input:[function(t){t.target.composing||(e.cashFlow=t.target.value)},e.checkForDigit]}})]),e._v(" "),r("hr"),e._v(" "),r("div",[e._v("Цена покупки: "+e._s(e.total))]),e._v(" "),r("br"),e._v(" "),r("button",{on:{click:e.addAsset}},[e._v("Купить")])])}),[],!1,null,null,null);t.default=component.exports}}]);