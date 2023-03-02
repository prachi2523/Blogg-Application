const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/Blog', (err, db) => {
    if (err) throw err;
    console.log('mongoose is connected');
})
