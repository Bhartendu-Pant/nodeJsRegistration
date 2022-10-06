const express = require("express");
const { emit } = require("../models/homeSchema");
const Router = express.Router();  // learn
const alert = require('alert');

const homeSchema = require('../models/homeSchema');

Router.get('/', (err, res) => {
    res.render('register', { title: 'Fill Form', password: '', email: '' });
})

Router.post('/register', async (req, res) => {
    try {
        const {
            email,
            password,
            cpassword
        } = req.body;
        if (password === cpassword) {
            const userData = new homeSchema({
                email,
                password
            })
            userData.save(err => {
                if (err) {
                    console.log("Something is wrong");
                } else {
                    res.render('register', { title: 'Done', password: '', email: '' });
                }
            })

            const useremail = await homeSchema.findOne({ email: email });
            if (email === useremail.email) {
                res.render('register', { title: '', password: '', email: 'User is already registered!' });
            } else {
                console.log('err')
            }
        }
        else {
            res.render('register', { title: '', password: 'Wrong Password', email: '' });
        }
    }
    catch (error) {
        res.render('register', { title: 'Error', password: '', email: '' });
    }
})


// Sign In
Router.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body;

    homeSchema.findOne({ email: email }, (err, result) => {
        if (email === result.email && password === result.password) {
            res.render('dashboard', { email: result.email });
        }
        else {
            // console.log(err);
            console.log(err);

            // popup.alert({
            //     content: 'Something went wrong !'
            // });
            alert("Something went wrong!!");
        }
    })
})

module.exports = Router;