import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   username: {
        type: String,
        required: true,
        unique: true, //no one should have a username similar to others, everyone will have a different username.
        trim: true,

    },
   fname: {
        type: String,
        required: true,
        trim: true,
    },
 email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
 },
 phone: {
     type: String,
     required: true,
     match: /^(\+\d{1,3})?\d{10,15}$/,
     trim: true,
     },
 referralUser: {
    type: String,
    trim: true,
    default: null, // Optional field
  },
  password: {
    type: String,
    required: true,
    minlength: 8, 
 },
 address: {
    type: String,
    required: true,
    trim: true,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  walletBalance: {
   type: Number,
   default: 0, // New field for tracking user balance
 },
},  { timestamps: true } )  // Adds createdAt and updatedAt fields automatically



const User  = mongoose.model('User', userSchema);

export default User;