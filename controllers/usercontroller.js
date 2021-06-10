const router = require('express').Router();
const { UserModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// register user
router.post('/register', async(req, res)=>{
    let { firstName, lastName, emailAddress, password, zipCode } = req.body.user;
    try {
        const User = await UserModel.create({
            firstName,
            lastName,
            emailAddress,
            password: bcrypt.hashSync(password, 13),
            zipCode
        });

        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

        res.status(201).json({
            msg: 'User successfully registered!',
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError){
            res.status(409).json({
                msg: 'Email already registered! Did you mean to login?'
            });
        } else {
            res.status(500).json({
                msg: `Oh no! Server failed to register user. err=${err}`
            })
        }
    }
});

// login user
router.post('/login', async (req, res) =>{
    let { emailAddress, password } = req.body.user;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                emailAddress: emailAddress,
            },
        });

        if(loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if(passwordComparison){
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24})
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    msg: 'Incorrect email or password'
                });
            }
        } else {
            res.status(401).json({
                msg: 'Incorrect email or password'
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: 'Failed to log user in.'
        })
    }
});

module.exports = router;