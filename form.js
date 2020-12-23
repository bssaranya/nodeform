const express = require('express')
const bodyParser = require('body-parser')
const ejs= require('ejs')
const app = express()
const port = 3000
const mysql=require('mysql')
// var expressLayouts = require('express-ejs-layouts')
// app.use(express.static(__dirname+'/css'))
// app.use(express.static('/js'))
// app.use(express.static('/images'))
app.use(bodyParser.urlencoded({extended:false}))
app.set('viewengine','ejs')
// <link rel="stylesheet" href="/formstyle.css">
app.get('/request',function(req,res){
  res.render('request.ejs',{root: __dirname})
});

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'project'
});
connection.connect(function(err){
  if(err)throw err;
  console.log("connected...");

app.post('/submit',function(req,res){
  console.log(req.body);
sql=  connection.query("INSERT INTO form(name,email,phno,location,pin,requirement,nationality) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.phno+"','"+req.body.location+"','"+req.body.pin+"','"+req.body.requirement+"','"+req.body.country+"')")
res.send("DATA SAVED SUCCESSFULLY INTO DATABASE")
  connection.query(sql,function(err){
    if(err)throw err;
    else{
      res.render('request.ejs')

    console.error(res.render('request.ejs',{title:"Data Saved",
    message:"data saved successfully"}))
    connection.end()
}
});
});
});
// connection.end();
app.listen(port,()=> console.log('install successfully${port}!'))
