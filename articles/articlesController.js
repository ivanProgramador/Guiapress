const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const { default: slugify } = require("slugify");
const Article = require("../articles/Article");


router.get("/admin/articles/new",(req,res)=>{
   Category.findAll().then(categories=>{
     
    res.render("admin/articles/new",{categories:categories});

   })
    

});

router.get("/admin/articles",(req,res)=>{
    /*
     Existe um problema na view onde ao inves de mostrar 
     o titulo da categoria ao qual o artigo pertence
     ele mostra somente a numeração do id 
     para reoslver isso eu vou usar a relação que exite entre
     artigo e categoria

     Dentro da função finAll eu consigo pediro pra ele 
     incluir o model category na busca então atraves do id 
     que liga o artigo a cetegoria ele consegue consultar todos os dados 
     da categoria a qual o artigo esta ligado 
     
     Assim eu posso trazer qualquer rpopridade dela inclusive
     o titulo pra mostrar na view dessa foma 

     <td><%= article.category.title %></td>

    */
    Article.findAll({
        include:[{model:Category}]
    }).then(articles=>{
        res.render("admin/articles/index",{articles:articles});

    })
});

//rota de gravar um artigo 
router.post("/articles/save",(req,res)=>{

    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title:title,
        slug:slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        res.redirect("/admin/articles");
    })

    

});


//rota de apagar um artigo

router.post("/articles/delete",(req,res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({where:{id:id}}).then(()=>{

                res.redirect("/admin/articles");
            })
        }else{
            res.redirect("/admin/articles");
        }
    }else{
        res.redirect("/admin/articles");
    }
});


//rota para o formulario de edição de artigo 

router.get("/admin/articles/edit/:id",(req,res)=>{
  
    var id = req.params.id;

    Article.findByPk(id).then(article =>{
        if(article != undefined){
             Category.findAll().then(categories=>{

                res.render("admin/articles/edit",{article:article,categories:categories});

             });
        }
    })
})





module.exports = router;