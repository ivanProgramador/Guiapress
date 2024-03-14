const express = require("express");
const router = express.Router();

router.get("/admin/categories/new",(req,res)=>{
    res.send("Rota pra criar nova categoria")
});

router.get("/admin/categories",(req,res)=>{
    res.send("Rota de categorias")
});

module.exports = router;