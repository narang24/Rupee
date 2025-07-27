const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET,{ expiresIn: '1d' });
}

exports.signupUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    //Validate all fields
    if( !fullname || !email || !password ) {
        return res.status(400).json({message: 'All fields are required'});
    }

    try { 
        const userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            // profileImageUrl,
        })

        res.status(201).json({
        id:user._id,
        user, 
        token: generateToken(user._id),
        message: 'SignUp Successfull!'
        });

    } catch(error) {
        res.status(500).json({message: 'error while trying to signup', error: error.message})
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password) {
        return res.status(400).json({message: 'All fields are required'})
    }

    try {
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({message: 'User not found'})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid) {
            return res.status(400).json({message: 'Invalid Credentials'})
        }

        res.status(200).json({
            user,
            message:'Login Successfull!',
            token: generateToken(user._id),
        })
    } catch(error) {
        res.status(500).json({message:'error while trying to login', error: error.message})
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({user,message:'User details fetched Successfully'})
    } catch(error) {
        res.status(500).json({message: 'error fetching user details', error: error.message})
    }
}