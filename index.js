const express=require("express");
const app=express();

const dotenv=require('dotenv');
dotenv.config();

const PORT=process.env.PORT || 3000;

//cookie parser
const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

require('./config/database').connect();

const user=require('./routes/user');
app.use('/api/v1',user)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
