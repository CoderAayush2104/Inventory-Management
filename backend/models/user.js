const {sequelize,DataTypes } = require("sequelize");

module.exports =(sequelize,DataTypes)=>{
    const User = sequelize.define("users",{
        user_id :{
            primaryKey: true,
            type:DataTypes.STRING(15),
            required:true
            
        },
        email:{
            type:DataTypes.STRING,
            required:true
        },
        password:{
            type:DataTypes.STRING(20),
            required:true
        },
        password_confirm:{
            type:DataTypes.STRING(20),
            required:true
        },
        shop_name:{
            type:DataTypes.STRING(150),
            required:true
        },
        shop_photo:{
            type:DataTypes.BLOB,
        },
    },
    {
        tableName: 'USER',
        timestamps: false
    }
    );
    return User;
}