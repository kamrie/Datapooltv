import express from 'express';   // "type":"module" was set in package.json so as to be able to use import else we'd use require. 
// import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); //initializing it so it can be used



mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to Monogodb!!!")
}).catch((err) => {
     console.log(err)
})

const app = express();

app.get('/', (req, res) => {
    res.render("login")
})

app.get("/signup", (res, req) => {
    res.render("signup")
})

app.listen(3500, () => {
    console.log("listening  3500!!!")
})