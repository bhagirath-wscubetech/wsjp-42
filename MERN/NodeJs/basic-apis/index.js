const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter = require('./router/userRouter');

const server = express();
server.use(express.json());
server.use(cors({
    origin: ['http://localhost:5173', 'https://wscubetech.com', 'https://www.wscubetech.com']
}))

server.use("/user", UserRouter);
// server.use("/product", ProductRouter);
// server.use("/category", CategoryRouter);

mongoose.connect(
    "mongodb://localhost:27017/",
    {
        dbName: "wsjp42"
    }
).then(
    () => {
        console.log('DB Connected');
        server.listen(
            5000,
            () => {
                console.log('Server started');
            }
        )
    }
).catch(
    () => {
        console.log('Unable to connect with DB');
    }
)

