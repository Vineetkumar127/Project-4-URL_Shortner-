const express = require('express');
var bodyParser = require('body-parser');


const route = require('./routes/route.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var multer = require('multer');  
var upload = multer();

app.use(upload.array()); 
app.use(express.static('public'));



const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ranjan:e91pDMx03Sx9wB2V@cluster0.u4idw.mongodb.net/group16Database",{useNewUrlParser:true})
.then(()=>console.log("MongoDb connected"))
.catch(err=>console.log(err))
app.use('/',route);


app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});


