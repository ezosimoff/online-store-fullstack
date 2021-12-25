const sequelize = require('../DB')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    'id':{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    'sid':{type: DataTypes.STRING, unique: true},
    'email':{type: DataTypes.STRING, unique: true},
    'password':{type: DataTypes.STRING},
    'role':{type: DataTypes.STRING, defaultValue: 'USER'},
})

const Basket = sequelize.define('basket', {
    'id':{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Item = sequelize.define('item', {
    'id':{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    'name':{type: DataTypes.STRING, unique: true, allowNull: false},
    'price':{type: DataTypes.INTEGER, allowNull: false},
    'rating':{type: DataTypes.INTEGER, defaultValue: 0},
    'img':{type: DataTypes.STRING, allowNull: false}
})

const BasketItem = sequelize.define('basket_items', {
    'id':{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Type = sequelize.define('type', {
    'id':{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    'name':{type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    'id':{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    'name':{type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    'id':{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    'rate':{type: DataTypes.STRING, allowNull: false},
})

const Attrs = sequelize.define('Attrs', {
    'id':{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    'title':{type: DataTypes.STRING, allowNull: false},
    'description':{type: DataTypes.STRING, allowNull: false},
})

const BrandTypes = sequelize.define('brand_types', {
    'id':{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    'rate':{type: DataTypes.STRING, allowNull: false},
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketItem)
BasketItem.belongsTo(Basket)

Item.hasMany(BasketItem)
BasketItem.belongsTo(Item)

Item.hasMany(Attrs)
Attrs.belongsTo(Item)

Type.hasMany(Item)
Item.belongsTo(Type)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Type.belongsToMany(Brand, {through: BrandTypes})
Brand.belongsToMany(Type, {through: BrandTypes})

module.exports = {
    User,
    Basket,
    Item,
    BasketItem,
    Type,
    Brand,
    Rating,
    Attrs,
    BrandTypes,
}





