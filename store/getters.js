export default {
user: state=>({
  ...state.user,
  passiveIncome:
    state.user.stocks.reduce((acc,item)=>acc+Number(item.cashFlow || 0), 0) +
    state.user.realEstate.reduce((acc,estate)=>acc+Number(estate.cashFlow), 0) +
    state.user.business.reduce((acc,item)=>acc+Number(item.cashFlow), 0) +
    state.user.other.reduce((acc,item)=>acc+Number(item.cashFlow), 0),
  totalExpenses:
    state.user.taxes +
    state.user.homeMortgagePayment +
    state.user.schoolLoanPayment +
    state.user.carLoanPayment +
    state.user.creditCardPayment +
    state.user.retailPayment +
    state.user.otherExpenses +
    state.user.childExpenses +
    state.user.bankLoanPayment,
})
}
