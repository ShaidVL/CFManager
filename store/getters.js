export default {
  user: state => ({
    ...state.user,
    passiveIncome:
    state.user.stocks &&
      state.user.stocks.reduce((acc, stock) => acc + Number((stock.cashFlow || 0) * stock.amount), 0) +
      state.user.realEstate.reduce((acc, estate) => acc + Number(estate.cashFlow), 0) +
      state.user.business.reduce((acc, item) => acc + Number(item.cashFlow), 0),
    totalExpenses:
      state.user.taxes &&
      state.user.taxes +
      state.user.homeMortgagePayment +
      state.user.schoolLoanPayment +
      state.user.carLoanPayment +
      state.user.creditCardPayment +
      state.user.retailPayment +
      state.user.otherExpenses +
      state.user.childExpenses +
      state.user.bankLoanPayment +
      state.user.liabilities.reduce((acc, liability) => acc + Number(liability.monthlyPay), 0),
    totalDebt:
      state.user.homeMortgage +
      state.user.schoolLoans +
      state.user.carLoans +
      state.user.creditCards +
      state.user.retailDebt,
  })
}
