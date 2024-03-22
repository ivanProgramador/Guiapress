const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const { default: slugify } = require("slugify");
const Article = require("../articles/Article");
const adminAuth = require("../midwares/adminAuth");

//para acessar o cadastro de artigos essa roita passa pelo  
// adminAuth pra testar se o usuário esta logado 
//isso vai ser usado somente nas rotas de formularios onde 
//somente os admins podem mexer 


router.get("/admin/articles/new",adminAuth,(req,res)=>{
   Category.findAll().then(categories=>{
     
    res.render("admin/articles/new",{categories:categories});

   })
    

});

router.get("/admin/articles",adminAuth,(req,res)=>{
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

router.get("/admin/articles/edit/:id",adminAuth,(req,res)=>{
  
    var id = req.params.id;

    Article.findByPk(id).then(article =>{
        if(article != undefined){
             Category.findAll().then(categories=>{

                res.render("admin/articles/edit",{article:article,categories:categories});

             });
        }
    })
});

//rota para gravar a edição depois de pronta 

router.post("/articles/update",(req,res)=>{
  
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category  = req.body.category;

    Article.update({
        title:title,
        body:body,
        categoryId: category,
        slug:slugify(title)
    },{
        where:{
            id:id
        } 
    }).then(()=>{
        res.redirect("/admin/articles");
    }).catch(err=>{
        res.redirect("/");
    });


});


/*paginação

  o limit diz quantos artigos eu quero ver em cada pagina 
  o ofsset navega entre os artigos 
  por exemplo se eu coloco um limite de 4 artigos por pagina
  quando o valor do offset for 1 os artigos que vão aparecer 
  serão 1234 quando o valor do offset for 2 os artigos que vão aparecer 
  são 5678 e quando o valor do offset for 3 9 10 11 12
  no caso ele navega entre os artigos mostrados na pagina 


 */ 

router.get("/articles/page/:num",(req,res)=>{

    var page = req.params.num;
    var offset = 0; // ofsset 0 mostra os 4 primeiros artigos 
    
    // se a varivel page não for um numero ou for igual a 1 o offset prmanece 0 mostrando os 4 primieros artigos  
    if(isNaN(page) || page == 1){
        var offset = 0;

    }else{

    //se não o offset vai receber o valor da pagina multiplicado por 4 que e a 
    //quantidade de artigos que ela vai mostrar
    //na proxima pagina

        offset = (parseInt(page) - 1) * 4;
    }

    Article.findAndCountAll({

        limit:4,
        offset: offset,
        order:[['id','DESC']]

    }).then(articles=>{
    
        var next; //enquando tiver pagina para exibir essa varivel fica true 

        // aqui eu somo 4 a valor da varivel offset o articles.count me traz
        //a quantidade de artigos que existem na base de dados 
        // ai eu comparo se offset mais 4 for maior ou igual ao numero total de artigos 
        //regitrados então não tem mais artigos pra mostrar então o next fica falso  

        if(offset + 4 >= articles.count){

            next = false;

        }else{
            //se sim fica true e ainda tem dados pra mais uma pagina

            next = true;

        }
        //aqui o objeto result recebe os dois valores finais da logica 
        //a variavel next e os artigose o numero da pagina 
        //que aciona a logica da paginação

        var result = {
            page: parseInt(page),
            next: next,
            articles:articles
        }

        Category.findAll().then(categories=>{

            res.render("admin/articles/page",{result:result,categories:categories});


        })




       
      
    })

})






module.exports = router;