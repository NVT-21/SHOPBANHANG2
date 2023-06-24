const express = require('express');
const app = express();
const path=require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./controllers/connect');
const port = 3000;
const session = require('express-session');
const controllerError = require('./controllers/controllerErrors')
const routes=require('./router/index');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')//
//  cho vao de ma dung duoc het du lieu cua poperty
const helpers = require('./help');
const exphbs = require('express-handlebars');
// Đăng ký custom helper để thực hiện phép tính cộng trong Handlebars

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.engine('.hbs', exphbs.engine({ extname: '.hbs',
 defaultLayout: "main",
  helpers:helpers ,
runtimeOptions:{allowProtoPropertiesByDefault:true,
  allowedProtoMethodsByDefault:true}, 
  
  }))
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', '.hbs');
connectDB()
routes(app)
app.use(controllerError)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
