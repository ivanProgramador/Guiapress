function adminAuth(req,res,next){

   //O objeto sessão só sera criado se o usurio digitar a senha correta 
   // essa função testa se existe uma sessão criada se ela for indefinida 
   //não existe sessão então ela redireciona o usuario para o começo do blog

    if(req.session.user != undefined){
        next();
    }else{
        res.redirect("/login");
    }

}

module.exports = adminAuth;