const User = require('../models/User');

exports.getLogin = (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('login', {
    title: 'Login',
    path: '/auth/login',
    page: 'login',
    error: req.query.error,
  });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/auth/login?error=Invalid credentials');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.redirect('/auth/login?error=Invalid credentials');
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role,
    };
    
    // session save happens automatically, redirect home
    res.redirect('/');
  } catch (error) {
    console.error('Login Error:', error);
    res.redirect('/auth/login?error=Server error');
  }
};

exports.getRegister = (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('register', {
    title: 'Register',
    path: '/auth/register',
    page: 'register',
    error: req.query.error,
  });
};

exports.postRegister = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.redirect('/auth/register?error=Passwords do not match');
  }

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.redirect('/auth/register?error=User already exists');
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    res.redirect('/');
  } catch (error) {
    console.error('Registration Error:', error);
    res.redirect('/auth/register?error=Server error');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error('Logout Error:', err);
    res.redirect('/');
  });
};
