export default function ({store, redirect, route, from}){
  const userIsEmpty = !Object.keys(store.state.user).length
  if(userIsEmpty){
    if(route.path !== '/profession') {
      redirect('/profession')
    }
  }else{
    if(route.path === '/profession' || (route.path === '/investpac' && from.path !== '/profession')) {
      redirect('/')
    }
  }
}
