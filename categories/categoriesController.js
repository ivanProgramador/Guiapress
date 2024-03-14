const express = require("express");
const router = express.Router();

<<<<<<< HEAD
router.get("/categories",(req,res)=>{
     res.send("Rota de categorias")
});


router.get("/categories/new",(req,res)=>{
    res.send("Rota para criar uma nova categoria")
=======
router.get("/admin/categories/new",(req,res)=>{
    res.send("Rota pra criar nova categoria")
});

router.get("/admin/categories",(req,res)=>{
    res.send("Rota de categorias")
>>>>>>> 2cb689b8cad64b0819accd970ada706693e66c52
});

module.exports = router;