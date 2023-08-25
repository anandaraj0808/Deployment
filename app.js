require('dotenv').config();
const express = require('express');
const app = express();
const { db } = require('./connect');
const {requireSignIn, isAuth} = require('./utils/authentications');
const {isAdmin} = require('./utils/adminValidation');

const cors = require('cors')

db();


const User = require('./models/users');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const quoteRoutes = require('./routes/quotes');


app.use(express.json()); 
app.use(cors()); 
app.use('/api', authRoutes); 
app.use('/api', requireSignIn, isAuth, isAdmin, userRoutes); 
app.use('/api', requireSignIn, isAuth, quoteRoutes); 

app.use('/backend', (req, res) => {
    res.redirect('/api/users');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Listening on Port ${PORT}..!`);
});