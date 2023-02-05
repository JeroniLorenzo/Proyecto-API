const router = require('express').Router();

const UsersRouter = require('./entities/Users/UsersRouter');


router.use("/users", UsersRouter);



module.exports = router;