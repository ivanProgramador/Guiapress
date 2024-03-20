const express =require("express");
const router = express.Router();
const User = require("./User");

//rotas de formulario

router.get("/admin/user/new",(req,res)=>{
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

    User.create({email:email,password:password}).then(()=>{
        res.redirect("/admin/users");
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


module.exports = router;