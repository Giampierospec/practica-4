require('./config/config');
require('./db/mongoose');
//variable declarations
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const main = require('./routes/main');
const app = express();
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
//middleware
app.use(logger("dev"));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('port',5000);
//routes
app.use('/',main);

app.listen(app.get('port'),()=>{
    console.log(`App started on port ${app.get('port')}`);
})
