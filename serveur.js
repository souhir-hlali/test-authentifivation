const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3200;


app.use(bodyParser.json());


db =mysql.createPool ({
 host: "localhost",
 user: "root",
 password: "",
 database: "back"
});

db.getConnection(function(err, connection) {
 if(err){
   console.log(err)
 }
 else{
   console.log('connected');
 }
});


app.post('/api/back', (req, res) => {
 
 const {login,password}=req.body;
 
db.query('SELECT * FROM User where login=? and password=?',[login,password] ,(err, result)=>{
   if(err){
    return res.json({
      success:false,
    });
   }

if (result.length === 0) {
  return res.json({
    success:false,
});
}
return res.json({
  success:true,
});
});
});




app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
