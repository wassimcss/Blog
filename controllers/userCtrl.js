const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { CLIENT_URL } = process.env;
const {
  registerValidation,
  loginValidation,
} = require("../validation/registerValidation");
const sendEmail = require("./sendEmail");
const Post = require("../models/Post");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const { error } = registerValidation(req.body);
      // let's validate a user
      if (error) return res.status(400).json({ msg: error.details[0].message });
      // check email existance
      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "You are already registred" });

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      // add new User
      const newUser = {
        ...req.body,
        password: hashPassword,
      };
      // activation token
      const activation_token = create_activation_token(newUser);
      //console.log(activation_token)
      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendEmail(email, url, "check your email to confirm your registration ");

      res.json({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN);
      const { name, email, password } = user;
      const check = await User.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "you are already registred" });
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.json({ msg: "Account has been activated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res, role) => {
    try {
      const { email, password } = req.body;
      // let validate a User
      const { error } = loginValidation(req.body);
      if (error) return res.status(400).send({ msg: error.details[0].message });
      //check email
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email dosn't exist" });

      // //check role
      if (user.role !== role)
        return res.status(403).json({
          msg: "Please make sure you are logging in from the right portal.",
        });

      // check  password
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) return res.status(400).send({ msg: "wrong password" });
      const refresh_token = create_refresh_token({ _id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      });
      res.json({ msg: "Login success" });
      //console.log(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) res.status(400).send({ msg: "Please login now" });
        const accessToken = create_access_token({ _id: user._id });
        res.json({ accessToken });
        //console.log(accessToken);
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "this email dosn't exist" });
      const access_token = create_access_token({ _id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;
      sendEmail(email, url, "Reset your password");
      res.json({ msg: "Re-send the password, please check your email" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { password: hashPassword } },
        { new: true, useFindAndModify: false }
      );
      res.json({ msg: "Password restarted successflly" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.user._id }).select(
        "-password"
      );
      res.json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getAllUserInfo: async (req, res) => {
    try {
      users = await User.find().select("-password");
      res.json(users);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  logout: (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "you are Looged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { name, age, avatar, profession } = req.body;
      const updatedProfile = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { name, age, avatar, profession } },
        { new: true, useFindAndModify: false }
      );
      res.send(updatedProfile);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  follow: async (req, res) => {
    try {
      const followed = await User.findByIdAndUpdate(
        req.body.followId,
        { $push: { followers: req.user._id } },
        { useFindAndModify: false, new: true }
      );
      if (!followed) return res.status(400).json({ msg: "error" });
      const following = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { following: req.body.followId } },
        { useFindAndModify: false, new: true }
      );
      res.send(following);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  unfollow: async (req, res) => {
    try {
      const followed = await User.findByIdAndUpdate(
        req.body.followId,
        { $pull: { followers: req.user._id } },
        { useFindAndModify: false, new: true }
      );
      if (!followed) return res.status(400).json({ msg: "error" });
      const following = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.body.followId } },
        { useFindAndModify: false, new: true }
      );
      res.send(following);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).select(
        "-password"
      );
      if (!user) res.status(404).json({msg:"Not Found"})
      const userPosts = await Post.findOne({postedBy:user._id}).populate("postedBy","_id name")
      res.json({user,userPosts});
    } catch (error) {
      res.status(500).json({msg:error.message})
    }
  },
};
const create_activation_token = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN, { expiresIn: "5m" });
};
const create_refresh_token = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "7d" });
};
const create_access_token = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
};

module.exports = userCtrl;
