
const jwt=require("jsonwebtoken")
const auth = (req,res,next) => {
   
    try {
        const token = req.header("authtoken");
        if (!token) res.status(401).json({msg:"Access denied"})
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=> {
            if (err) return res.status(401).json({msg:"Invalid Authorisation"})
            req.user = user
            next()
        })
    } catch (error) {
        res.status(500).json({msg:"Invalid token"})
    }
}
module.exports = auth
