const express = require("express");
const router = express.Router();

router.get("/admin/articles/new",(req,res)=>{
    res.send("Rota pra criar novo artigo")
});

router.get("/admin/articles",(req,res)=>{
    res.send("Rota de artigos")
});

module.exports = router;