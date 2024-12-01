import express from 'express';   // "type":"module" was set in package.json so as to be able to use import else we'd use require. 
// import bcryptjs from 'bcryptjs';



const app = express();

app.listen(3500, () => {
    console.log("listening  3500!!!")
})