const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://abs:abcd1234@cloud-fitness-n9lwh.mongodb.net/test?retryWrites=true&w=majority', 
    {useUnifiedTopology: true, useNewUrlParser: true}).then(() => console.log("MongoDB connected"))
                            .catch(err => console.error(err));




app.get('/', (req,res) => {
    res.send('Hello World')
});

app.listen(5000);