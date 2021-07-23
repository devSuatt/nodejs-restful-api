const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restful_api', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log("veritabanına bağlanıldı"))
.catch(err => console.log(err));


