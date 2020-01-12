const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require('./config/key');
const { User } = require('./models/user');

mongoose.connect(config.mongoURI, 
    {useUnifiedTopology: true, useNewUrlParser: true}).then(() => console.log("MongoDB connected"))
                            .catch(err => console.error(err));


app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({"hello ~": "Hi ~~ "})
})

app.post('/api/users/register', (req,res) => {
    const user = new User(req.body)

    user.save((err, userData) => {
        if(err) return res.json ({ success: false, err})
    })
    return res.status(200).json({
        success: true
    })
})

app.get('/', (req,res) => {
    res.send('Hello World')
});

app.listen(5000);