const express = require("express");
const { default: slugify } = require("slugify");
const router = express.Router();
const Category = require("./Category");


//rota para o formulario
router.get("/admin/categories/new",(req,res)=>{

    res.render("admin/categories/new");
    
});

//rota para a tabela de categorias

router.get("/admin/categories",(req,res)=>{
    
    res.render("admin/categories/index");

})


//rota de salvar
router.post("/categories/save",(req,res)=>{

    var title = req.body.title;

    if(title != undefined){
      
        Category.create({

            title: title,
            slug: slugify(title)

        }).then(()=>{

            res.redirect("/");
        });


    }else{

        res.redirect("/admin/categories/new")
    }

})

module.exports = router;