const mongoose = require('mongoose');

require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

exports.connect=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Database connected successfully');
    })
    .catch((err)=>{
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process with an error code
    });
}