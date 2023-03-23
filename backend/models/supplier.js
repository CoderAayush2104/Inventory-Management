const {sequelize,DataTypes } = require("sequelize");

module.exports =(sequelize,DataTypes)=>{
    const Supplier = sequelize.define("Supplier",{
        supplier_id :{
            primaryKey: true,
            type:DataTypes.STRING(15),
            required:true
        },
        contact:{
            type:DataTypes.BIGINT,
            required:true
        },
        name:{
            type:DataTypes.STRING(50),
            required:true
        },
    },
    {
        tableName: 'SUPPLIER',
        timestamps: false
    }
    );
    return User;
}