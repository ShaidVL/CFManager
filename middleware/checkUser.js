export default function ({store, redirect, route, from}) {
  const userIsEmpty = !Object.keys(store.state.user).length
  if (userIsEmpty) {
    if (route.path !== '/profession') {
      redirect('/profession')
    }
  } else {
    if (store.state.user.fastTrack && route.path !== '/fast-track') {
      redirect('/fast-track')
    } else {
      if (route.path === '/profession' || (route.path === '/investpac' && from.path !== '/profession') || (route.path === '/fast-track' && !store.state.user.fastTrack)) {
        redirect('/')
      }
    }
  }
}
