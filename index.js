const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");

//view engine 
app.set('view engine','ejs');

//static 
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//database test 
connection.authenticate().then(()=>{
    console.log('conectado');
}).catch((error)=>{
     console.log(error);
});



app.use("/",categoriesController);
app.use("/",articlesController);


app.get("/",(req,res)=>{

    res.render("index");

});

app.listen(8080,()=>{
    console.log("servidor rodando")
});