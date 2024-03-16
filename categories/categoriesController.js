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
    Category.findAll().then(categories=>{
        res.render("admin/categories/index",{categories:categories});
    })
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

});


//rota para deletar 

router.post("/categories/delete",(req,res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({where:{id:id}}).then(()=>{

                res.redirect("/admin/categories");
            })
        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    }
});



module.exports = router;