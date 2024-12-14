import User  from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from  "jsonwebtoken";


export const signup = async (req, res, next) => {
    console.log(req.body) ;

    try {
       const {username, fname,email, phone, referralUsername, password, address,  termsCheckbox} = req.body;
       console.log('Signup details:', req.body); // Debugging

          // Check if username or email already exists
          const existingUser = await User.findOne({
            $or: [{ username }, { email }],  //$or operator in MongoDB allows you to check multiple conditions in a query.
        });

        if (existingUser) {
            // Send error message
            const errorMessages = [];
            if (existingUser.username === username) {
                errorMessages.push("There is a user with the username");
            }
            if (existingUser.email === email) {
                errorMessages.push("Email already exists.");
            }


            return res.status(400).json({
                success: false,
                message: errorMessages.join(" "), // Combine all error messages into one string
            });
            
        }


        // Convert 'on' to true, otherwise set false
        const termsAccepted = termsCheckbox === 'on';
        // Make referralUsername optional
        const referralUser = referralUsername || null; // If empty, set to null
        const hashedPassword = bcryptjs.hashSync(password, 10);
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



export const signin = async (req, res, next) => {
      const{ username, password } = req.body;
      console.log('Login details:', req.body); // Debugging

      try {
        const validUser = await User.findOne({username });         // The key (username) corresponds to the field in the database. The value (username) is the value provided in the request body, 
        if(!validUser) return next(errorHandler(404, "User not found"))
       
         const validPassword =  bcryptjs.compareSync(password, validUser.password) //compares the password with the particular password of the valid user.
         if(!validPassword) return next(errorHandler(405, "Wrong credential!"));
          const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
          const {password: pass, ...rest} = validUser._doc; //the users info is destructured so that we can include every other info EXCEPT password.     
        res
        .cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest)
//          
      } catch (error) {
           next(error)
      }



}