const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = 8080;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const login = require('./routes/authRoutes/login')

const listingPost = require('./routes/listings/listingpost')
const listingGet = require('./routes/listings/listingget')
const listingUpdate = require('./routes/listings/listingput')
const listingDelete = require('./routes/listings/listingdelete')

const reviewPost = require('./routes/reviews/reviewpost')
const reviewGet = require('./routes/reviews/reviewget')
const reviewResponse = require('./routes/reviews/reviewResponse')
const reviewUpdate = require('./routes/reviews/reviewupdate')
const reviewDelete = require('./routes/reviews/reviewDelete')

app.use('/login',login);
app.use('/listings',listingPost)
app.use('/listings',listingGet)
app.use('/listings',listingUpdate)
app.use('/listings',listingDelete)

app.use('/reviews',reviewPost)
app.use('/reviews',reviewGet);
app.use('/reviews/response',reviewResponse)
app.use('/reviews',reviewUpdate)
app.use('/reviews',reviewDelete)

app.listen(PORT, () => {
    console.log("Server running on " + PORT);
});
