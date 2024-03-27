const mongoose = require('mongoose')
const {userSchema,listingSchema,reviewSchema} = require('./Schema')

const Users = mongoose.model("users", userSchema);
const Listings = mongoose.model("listings",listingSchema)
const reviews = mongoose.model("reviews",reviewSchema);

module.exports = {
    Users,
    Listings,
    reviews
}