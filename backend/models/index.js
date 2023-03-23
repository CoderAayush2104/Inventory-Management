const {Sequelize, DataTypes} = require ("sequelize")

const sequelize = new Sequelize('inventory_manage','inventory','12345678',{
    host : 'db4free.net',
    dialect: 'mysql',
    logging: false,
    pool:{mmax:5,min:0,idle:10000}
});

sequelize.authenticate()
.then(()=>{
    console.log("connected")
})
.catch(err=>{
    console.log("error")
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.sequelize.sync({force: true})
.then(()=>{
    console.log("yes re-synced");
})

db.user = require('./user')(sequelize,DataTypes)
module.exports = db;