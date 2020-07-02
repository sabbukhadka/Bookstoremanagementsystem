const jwt = require('jsonwebtoken');

const verifyUser =(req, res, next)=>{
    //console.log(req.body);}
console.log(req.headers.authorization);
let authHeader = req.headers.authorization;
if(!authHeader){
    let err = new Error(' No authentication informations');
    err.status =401;
    return  next(err);
}

let token = authHeader.split(" ")[1];
jwt.verify (token, process.env.SECRET,(err, payload)=>{
    if(err){
        let err = new Error(' Token couldnot be verified');
        return  next(err);
    }
    //  console.log(payload);
     req.user =payload;
     console.log(req.user);
      next();
})
}

 const verifyManager =(req, res, next)=>{
     if(!req.user){
        let err = new Error(' No authentication informations not provided');
        err.status =401;
        return  next(err);
     }else if(req.user.roles =='basic'){
        let err = new Error(' Forbidden ');
        err.status =403;
        return  next(err);
    } 
    //manager and admin allowed
    return next();
}
//only admin allowed
        const verifyAdmin =(req, res, next)=>{
            if(!req.user){
               let err = new Error(' No authentication informations not provided');
               err.status =401;
               return  next(err);
            }
           else if(req.user.roles !=='admin'){
                 return next();
            }
               let err = new Error(' Forbidden ');
               err.status =403;
               return  next(err);
        }
    
module.exports ={
    verifyUser,
     verifyManager,
     verifyAdmin
}
 // console.log(payload);
 //console.log(authHeader);
//   }
//   module.exports = token bearrer looking
//     verifyUser;