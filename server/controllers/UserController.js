const User = require('../model/user');
const Seller = require('../model/seller');
const bcrypt = require('bcryptjs');

// Constants
const USER_TYPES = {
  SELLER: 'seller',
  USER: 'user',
  ERROR: 'error'
};

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
      
      // Try to find seller first
      const seller = await Seller.findOne({ email:email })
      if (seller) {
        const isMatch = await bcrypt.compare(password, seller.password);
        if (isMatch) {
          console.log(`Seller logged in: ${email}`);
          return res.json({ 
            success: true,
            userType: USER_TYPES.SELLER,
            user: { 
              id: seller._id,
              email: seller.email,
              name: seller.name 
            }
          });
        }
      }
      
      // If not seller, try to find regular user
      let isMatch;
      const user = await User.findOne({ email:email })
      if (user) {
        // const isMatch = await bcrypt.compare(password,user.password);
       if(password == user.password){
        isMatch = true;
       }
       else{
        isMatch = false;
       }
        console.log(isMatch,password,user);
        if (isMatch) {
          console.log(`User logged in: ${email}`);
          return res.json({ 
            success: true,
            userType: USER_TYPES.USER,
            user: { 
              id: user._id,
              email: user.email,
              name: user.name 
            }
            
          });
        }
      }

      // If we get here, credentials were invalid
      console.log(`Failed login attempt for email: ${email} ,${user}`);
      return res.status(401).json({ 
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS 
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
  signup: async (req, res) => {
    try {
      const { email, name, password } = req.body;

      // Input validation
      if (!email || !name || !password) {
        return res.status(400).json({ 
          success: false,
          message: 'Email, name and password are required' 
        });
      }

      // Check if email exists in either collection
      const [seller, user] = await Promise.all([
        Seller.findOne({ email }).lean(),
        User.findOne({ email }).lean()
      ]);

      if (seller || user) {
        console.log(`Signup attempt with existing email: ${email}`);
        return res.status(409).json({ 
          success: false,
          message: ERROR_MESSAGES.EMAIL_EXISTS 
        });
      }

      // Hash password before saving
      // const hashedPassword = await bcrypt.hash(password, 10);
      // console.log("hashedpass : ",hashedPassword)
      
      // Create new user
      const newUser = await User.create({ 
        email, 
        name, 
        password:password
      });

      console.log(`New user created: ${email}`);
      return res.status(201).json({ 
        success: true,
        user: {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name
        }
      });

    } catch (err) {
      console.error('Signup error:', err);
      return res.status(500).json({ 
        success: false,
        message: ERROR_MESSAGES.SERVER_ERROR 
      });
    }
  }
};