export default function (context) {
  console.log('[[[[[[[ CHECK-AUTH Middleware] INITAUTH CHECK is INITAUTHINITAUTH ]]]]]]]]') // eslint-disable-line no-console
  if (context.req) {
    console.log(context.req.headers) // eslint-disable-line no-console
  }
  console.log('<<<<<<<<<<<<< CHECK-AUTH EQ END >>>>>>>>>>>>>>>>>>>>>>>> ') // eslint-disable-line no-console
  // if (process.client){
  context.store.dispatch('auth/initAuth', context.req)
  // }
}
