const express =require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

//rotas de formulario

router.get("/admin/users/new",(req,res)=>{
    res.render("admin/users/new");
});

router.get("/admin/users",(req,res)=>{
    User.findAll().then(users=>{
        res.render("admin/users/index",{users: users});

    })
   

})

router.get("/admin/user/edit/:id",(req,res)=>{

    var id = req.params.id;
    User.findByPk(id).then(user=>{
        res.render("admin/users/edit",{user:user});



    })
   
});

//rotas de execução 




//adicionar usuario

router.post("/user/save",(req,res)=>{
    
    var email = req.body.email;
    var password = req.body.password;

    //um usuario não pode ter o mesmo email do outro
    //abaixo eu faço uma pesquisa se a avrivek gerada troxer uma email
    //o cliente voltapra pagina de cadastro se não ele grava
    
    User.findOne({where:{email:email}}).then(user=>{
        if(user == undefined){

            //usando o salt pra gerar uma hash auxiliar
            var salt = bcrypt.genSaltSync(10);
            // passado apra variavel hash a senha conevrtida mais o salt
            var hash = bcrypt.hashSync(password,salt);

            User.create({
                email:email,
                password:hash
            }).then(()=>{
                res.redirect("/admin/users");
            }).catch(err =>{
                res.redirect("/admin/users");

            })
        }else{
            res.redirect("/admin/users/new");
        }
    })
   
});






router.post("/user/delete",(req,res)=>{
    var id = req.body.id;

    User.destroy({where:{id:id}}).then(()=>{
        res.redirect("/admin/users")
    })
});


router.post("/user/update",(req,res)=>{
    var id = req.body.id;
    var email = req.body.email;
    var password = req.body.password;

    User.update(
        {email:email,password:password}
        ,{where:{id:id}
    }).then(()=>{
        res.redirect("/admin/users")
    })
})


//formulario de login 

router.get("/login",(req,res)=>{
    res.render("admin/users/login");
});

//rota de autenticação 

router.post("/authenticate",(req,res)=>{

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email:email}}).then(user=>{

        if(user != undefined){

            var correct = bcrypt.compareSync(password,user.password);

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.json(req.session.user);

            }else{
                res.redirect("/login");
            }


        }else{

            res.redirect("/login");
             
        }
        }
    )





})


module.exports = router;