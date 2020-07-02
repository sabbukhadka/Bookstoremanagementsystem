const express=require('express'); // web framework for building web aplication using node
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const validation = require('../validation');

router.post('/register',(req, res, next)=>{
//res.send('testing');});

const {errors, isValid} = validation.registerInput(req.body);
if(!isValid){
    res.status(400).json({
        status:'error',
        message:errors});
}
let{ username, password, firstName, lastName, roles } =req.body;
User.findOne({username}) 
.then((user) =>{
 if(user){
    throw new Error(' User already exists!'); 
 }
 bcrypt.hash(password, 10,(err, hash)=>{
     if(err)return  next(err);
     User.create({username, password:hash, firstName, lastName, roles})
         .then((user) => {
             res.json({status:"Register Sucesss"});
         }).catch(next); 
     })
     }).catch(next); 


    });

//res.send('testing');
router.post('/login', (req, res, next)=>{
let {username, password}  = req.body;
User.findOne({username})
.then((user)=>{// null or validateobject 
if(!user){
     let err = new Error(' User doesnot exists!');
    err.status = 401;
     return  next(err);
 }
 bcrypt.compare(password, user.password)
    .then((isMatched) => {
     if(!isMatched) {//boolen value
         let err = new Error(' password doesnot match!');
        err.status = 400;
         return  next(err);
     }
     const payload={
         id: user._id,
         username:user.username,
         firstName: user.firstName,
         lastName:user.lastName,
         roles:user.roles
     }
     jwt.sign(payload, process.env.SECRET,(err,token)=>{ //{expiresIn: '4hr'}
         if(err) return  next(err);
         // throw new Error ('Token couldnot be created');
         res.json({message:'login sucessful' , 
         token:`Bearer${token}`
        });
     });
    
    }).catch(next);
}).catch(next);
});

    module.exports = router;
   
    
