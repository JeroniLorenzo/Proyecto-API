module.exports =  (req, res, next) => {
console.log('aqui vemos el admin', req.userFound)
    if(req.user && req.user.rol == "admin"){
        next();
    }else {
        res.status(401).send(`Forbidden access`)
    }
  
};

// const User = require('../entities/Users/user')

//   module.exports = (req, res, next) => {

//       let _id = req.body._id;


//       User.find({

//            _id : _id 

//       }).then(foundUser => {

//           if(foundUser[0].rol == "admin"){

//               next();

//           }else {
//               res.send(`Forbidden access`)
//           }
//       }).catch(error => {
//           res.send(`Introduce a valid user id`, error)
//       })

//   };