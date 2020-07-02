const validator = require('validator');

const registerInput =(data)=>{
    let errors ={};
    if (data.username){
if(!validator.isLength(data.username.trim(), {min:6, max:30 })) {
    errors.username =' Username must be between 6 and 30 characters';
}
    }else{
        errors.username ='Username is required';
    }

    if (data.password){
        if(!validator.isLength(data.password.trim(), {min:6, max:30 })) {
            errors.password =' Password must be between 6 and 30 characters';
        }
            }else{
                errors.password ='Password is required';
            }
// for all input for registering user , we can validate other fields
    return{
        errors, 
        isValid: Object.keys(errors).length == 0
    }
}
module.exports={
    registerInput
}