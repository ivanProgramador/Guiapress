const express =require("express");
const router = express.Router();
const User = require("./User");

//rotas de formulario

router.get("/admin/user/cadastro",()=>{
    res.render("admin/user/new");
});

router.get("/admin/users",(req,res)=>{
    res.render("admin/user/index");

})

router.get("/user/editar",(req,res)=>{
    res.render("admin/user/edit");
});

//rotas de execução 

//adicionar usuario

router.post("/user/save",(req,res)=>{
    
    var email = req.body.email;
    var password = req.body.password;

    User.create({email:email,password:password}).then(()=>{
        res.redirect("/admin/users");
    })
});


router.post("/user/delete",(req,res)=>{
    var id = req.body.id;

    User.destroy({where:{id:id}}).the(()=>{
        res.redirect("/admin/users")
    })
});

router.update("/user/update",(req,res)=>{
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


module.exports = router;