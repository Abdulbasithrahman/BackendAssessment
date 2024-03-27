const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'owner', 'user'] }
  });

  const listingSchema = mongoose.Schema({
    name:String,
    phone:String,
    city:String,
    address:String,
    images:[String]
  })

  const reviewSchema = mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    businessId:{type:mongoose.Schema.Types.ObjectId, ref:'Listing'},
    rating:Number,
    text:String,
    createAt:{type:Date, default:Date.now()},
    response:{type:String,default:''}
  })

  module.exports = {
    userSchema,
    listingSchema,
    reviewSchema
  }