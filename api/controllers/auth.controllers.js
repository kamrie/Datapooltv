import User  from '../models/user.models.js';
import bcrytpjs from 'bcryptjs';

export const signup = async (req, res) => {
    console.log(req.body) ;

    try {
       const {username, fname,email, phone, referralUsername, password, address,  termsCheckbox} = req.body;
       console.log('Signup details:', req.body); // Debugging


        // Convert 'on' to true, otherwise set false
        const termsAccepted = termsCheckbox === 'on';
        // Make referralUsername optional
        const referralUser = referralUsername || null; // If empty, set to null
        const hashedPassword = bcrytpjs.hashSync(password, 10);

       const newUser = new User({username, fname,email, phone, referralUsername: referralUser, password: hashedPassword, address,  termsCheckbox: termsAccepted })
       await  newUser.save();

      // Send success response
        res.status(201).json({
            message: "Resgitration successful",
            user: { username, fname, email, phone}
        })
    } catch (error) {
        console.error('Signup error:', error);

         
        // Handle duplicate key error
        //  if (error.code === 11000) {
        //     return res.status(400).json({
        //         message: 'Username or email already exists.',
        //     });
        // }

        // Send error response
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
        });
    }
}