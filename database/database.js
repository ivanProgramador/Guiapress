const Sequelize = require("sequelize");

//a timezone é importante porque dependendo do pais onde o servidor esta 
//a hora de salvamento do registyro pode ficar incorreta 

const connection = new Sequelize('guiapress','root','1234',{
    host:'localhost',
    dialect:'mysql',
    timezone:'-03:00'
});

module.exports = connection;