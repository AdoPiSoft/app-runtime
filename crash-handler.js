const err_name = 'unhandledRejection'

module.exports = (p) => {
  p.on(err_name, e => {
    console.log(e)
  })
}
