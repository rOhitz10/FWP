const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

// Constants


const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already registered',
  SERVER_ERROR: 'Server error occurred'
};

module.exports = {
  /**
   * Handle user login
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Input validation
      if (!email || !password) {
        return res.status(400).json({ 
          success: false,
          message: 'Email and password are required' 
        });
      }

      const user = await User.findOne({ email })
      console.log(user,"user");
      
      if (!user) {
        return res.status(401).json({msg:"invalid email or password"})
      }
      
      const isMatch = await bcrypt.compare(password,user.password);
      if (!isMatch) {
        console.log(`User logged in: ${email}`);
        return res.status(401).json({msg:"invalid email or password"})
    }
      const token = jwt.sign({email,role:"user"},process.env. JWT_SECERT,{expiresIn:"1"});
    
    return res.json({ 
      success: true,
      userType: "user",
      user: { 
        id: user._id,
        email: user.email,
        name: user.name 
      },
      token:token
    });

    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ 
        success: false,
        message: ERROR_MESSAGES.SERVER_ERROR 
      });
    }
  },

  /**
   * Handle user signup
   */
   signup:async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Input validation
        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields (email, firstName, lastName, password) are required' 
            });
        }


        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`Signup attempt with existing email: ${email}`);
            return res.status(409).json({ 
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = new User({ 
            firstName,
            lastName, 
            email, 
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: newUser._id,
                email: newUser.email,
                role: "user" 
            },
            process.env.JWT_SECERT,
            { expiresIn: '1d' } // Fixed expiration to 7 days
        );

        console.log(`New user created: ${newUser.email}`);
        // Save user to database
        await newUser.save();


        // Return success response (excluding password hash)
        return res.status(201).json({ 
            success: true,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            },
            token: token
        });

    } catch (err) {
        console.error('Signup error:', err);
        
        // Handle duplicate key errors
        if (err.code === 11000) {
            // Check which field caused the duplicate error
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ 
                success: false,
                message: `${field} already exists`,
                field: field
            });
        }

  

        // Handle all other errors
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error during registration'
        });
    }
}
};