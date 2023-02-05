const User = require('./user');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { SECRET, EXPIRES } = require('../../config/auth')

const authConfig = require('../../middlewares/auth');

const UsersController = {};

UsersController.getAllUsers = async (req, res) => {
    // try {
    //     const filter = {};
    //     // if (Object.keys(req.query).length !== 0){}
    //     if (req.query.name) filter.name = new RegExp (req.query.name, 'i');
    //     if (req.query.surname) filter.surname = new RegExp (req.query.surname, 'i');
    //     if (req.query.email) filter.email = new RegExp (req.query.email, 'i');
    //     if (req.query.phone) filter.phone = new RegExp (req.query.phone, 'i');
    //     // if (req.query.cinemaOrTheater) filter.cinemaOrTheater = new RegExp (req.query.tittle, 'i');
    //     // if (req.query.next7DaysEpisode) filter.next7DaysEpisode = new RegExp (req.query.tittle, 'i');
    //     // if (req.query._id) filter._id = new RegExp (req.query.tittle, 'i');
    //     const result = await User.find(filter);
    //     res.json(result);

    // } catch (error) {
    //     res.json({error: error.message});
    // }
    try {

        let result = await User.find({});

        if (result.length > 0) {
            res.send(result)
        } else {
            res.send({ "Message": "Lo sentimos, no hemos encontrado ningún usuario." })
        }

    } catch (error) {
        res.json({error: error.message});
    }
};

UsersController.newUser = async (req, res) => {

    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.ROUNDS));

    try {

        let user = await User.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: password,
            phone: req.body.phone,
            rol: req.body.rol,
            creditCard: req.body.creditCard
        })

        if (user) {
            res.send({ "Message": `User ${user.name} has been successfuly added` })
        }

    } catch (error) {
        res.json({error: error.message});
    }

};

UsersController.updateUser = async (req, res) => {

    let _id = req.body._id;
    let newName = req.body.name;
    let newSurname = req.body.surname;
    let newEmail = req.body.email;
    let newPassword = req.body.password;
    let newPhone = req.body.phone;
    let newRol = req.body.rol;
    let newCreditCard = req.body.creditCard;

    try {
        let updated = await User.findOneAndUpdate(
            //Query de búsqueda....
            { _id: _id },
            //Campos a cambiar
            {
                name: newName,
                surname: newSurname,
                email: newEmail,
                password: newPassword,
                phone: newPhone,
                rol: newRol,
                creditCard: newCreditCard
            }).setOptions({ returnDocument: 'after' })
        //con setOptions en este caso voy a exigir que me devuelva el documento modificado

        if (updated) {
            res.send(`Updated user successfuly`)
        }
    } catch (error) {
        res.json({error: error.message});
    }
};

UsersController.deleteUser = async (req, res) => {
    let _id = req.body._id;

    try {
        let deleted = await User.findOneAndDelete({
            _id: _id
        })

        if (deleted) {
            res.send({ "Message": `User ${deleted.name} ${deleted.surname} has been removed successfuly` })
        }
    } catch (error) {
        res.json({error: error.message});

    }
};

UsersController.loginUser = async (req, res) => {

    try {

        let userFound = await User.find({
            email: req.body.email
        })

        
        if (userFound) {
            
            if (userFound[0].email === undefined) {
                //No hemos encontrado al usuario...mandamos un mensaje
                res.send("Incorrect pass");
            } else {
               
                //Hemos encontrado al usuario, vamos a ver si el pass es correcto
               
                if (bcrypt.compareSync(req.body.password, userFound[0].password)) {
                    // console.log(userFound[0])
                    console.log('ESTE ES EL PRIMERO',011222, SECRET)
                    console.log('ESTE ES EL SEGUNDO',344555, {SECRET})
                    let token = jsonwebtoken.sign( {id:userFound[0]._id, rol:userFound[0].rol } , SECRET, {
                        expiresIn: EXPIRES
                    });

                    let loginOk = `Welcome back ${userFound[0].name}`;
                    res.json({
                        loginOk,
                        user: userFound,
                        token: token
                    })

                } else {
              
                    res.send("Incorrect pass");
                }
            }

        }


    } catch (error) {
        res.json({error: error.message});
    }
};

// SeriesController.getAllSeries = async (req, res) => {

    // try {
    //     const filter = {};
    //     // if (Object.keys(req.query).length !== 0){}
    //     if (req.query.tittle) filter.tittle = new RegExp (req.query.tittle, 'i');
    //     if (req.query.genre) filter.genre = new RegExp (req.query.tittle, 'i');
    //     if (req.query.year) filter.year = new RegExp (req.query.tittle, 'i');
    //     if (req.query.rating) filter.rating = new RegExp (req.query.tittle, 'i');
    //     if (req.query.cinemaOrTheater) filter.cinemaOrTheater = new RegExp (req.query.tittle, 'i');
    //     if (req.query.next7DaysEpisode) filter.next7DaysEpisode = new RegExp (req.query.tittle, 'i');
    //     if (req.query._id) filter._id = new RegExp (req.query.tittle, 'i');
    //     const result = await Serie.find(filter);
    //     res.json(result);

    // } catch (error) {
    //     res.json({error: error.message});
    // }
// };

//Exporto CarsController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = UsersController;