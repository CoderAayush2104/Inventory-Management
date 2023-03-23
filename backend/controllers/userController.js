var db = require('../models');
const Users = db.user;

var addUser = async (req,res) =>{
    try{
        let data = await Users.create({user_id: 2,shop_name: 'MeetkiDukaan',password: '1234'});
        console.log(data.dataValues)
        await data.save();
    }catch(e){
        console.log("error"+e)
    }
    //update: data.shop_name = "..";
    //or
    //let data = await Users.update({name: 'final'}.{where:{id:2}})
    //delete: data.destroy();
    //     await data.save();
    //or
    //let data = await Users.destroy({where:{id:4})
    // await data.save();


    //if we do data.reload(), it won't update the value and takes old value only
    // let data = await Users.findAll();
    
    let response = {
        data: 'ok'
    }
    res.status(200).json(response)
}

module.exports = {
    addUser
}