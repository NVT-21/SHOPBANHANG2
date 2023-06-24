const routerUser = require('./User')
const viewReder=require('./view')
const routerProduct = require('./product')
const routes=(app)=>{
    app.use('/product',routerProduct)
    app.use('/user',routerUser)
    app.use('/',viewReder)

}
module.exports = routes