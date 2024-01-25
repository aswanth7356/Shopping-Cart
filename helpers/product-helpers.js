const { resolve } = require('express-hbs/lib/resolver')
var db=require('../config/connection')
var collection=require('../config/collections')
var objectId = require('bson-objectid')
const { ReplSet } = require('mongodb/lib/core')
const { response } = require('../app')

module.exports={

    addProduct:(product,callback)=>{
       // console.log(product)
        db.get().collection('product').insertOne(product).then((data)=>{
            //console.log(data)
             callback(data.ops[0]._id)
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },

    deleteProduct:(productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(productId)}).then((response)=>{
                //console.log(response)
                resolve(response)
            })
        })
    },

    getProductDetails:(productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(productId)}).then((product)=>{
                resolve(product)
            })    
        })
    },

    updateProduct:(productId,ProductDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(productId)},{
                $set:{
                    name:ProductDetails.name,
                    Discription:ProductDetails.Discription,
                    Price:ProductDetails.Price,
                    Category:ProductDetails.Category,
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}