import User  from '../models/user.models.js';
import bcrytpjs from 'bcryptjs';
// import { errorHandler } from '../utils/error.js';
// import jwt from  "jsonwebtoken";


export const signup = async (req, res, next) => {
    console.log(req.body) ;

    try {
       const {username, fname,email, phone, referralUsername, password, address,  termsCheckbox} = req.body;
       console.log('Signup details:', req.body); // Debugging


        // Convert 'on' to true, otherwise set false
        const termsAccepted = termsCheckbox === 'on';
        // Make referralUsername optional
        const referralUser = referralUsername || null; // If empty, set to null
        const hashedPassword = bcrytpjs.hashSync(password, 10);
// Yes, Mongoose only collects and stores the value assigned to the schema's property (e.g., termsCheckbox).  Mongoose uses  keys to store data in the database.
       const newUser = new User({username, fname,email, phone, referralUsername: referralUser, password: hashedPassword, address,  termsCheckbox: termsAccepted })
       await  newUser.save();

      // Send success response
        res.status(201).json({
            message: "Resgitration successful",
            user: { username, fname, email, phone}
        })
    } catch (error) {
        console.error('Signup error:', error);

              next(error)

        // Send error response
        // res.status(500).json({
        //     message: 'Internal server error. Please try again.',
        // });


    // Handle duplicate key error
        //  if (error.code === 11000) {
        //     return res.status(400).json({
        //         message: 'Username or email already exists.',
        //     });
        // }

    }
}



