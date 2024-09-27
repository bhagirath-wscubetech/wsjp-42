require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CategoryRouter = require('./routers/CategoryRouter');
const ColorRouter = require('./routers/ColorRouter');
const ProductRouter = require('./routers/ProductRouter');
const AdminRouter = require('./routers/AdminRouter');
const UserRouter = require('./routers/UserRouter');
const OrderRouter = require('./routers/OrderRouter');
const server = express();

server.use(express.static("public"));
server.use(express.json());
server.use(cors({
    origin: ['http://localhost:5173']
}))

server.use("/category", CategoryRouter);
server.use("/color", ColorRouter);
server.use("/product", ProductRouter);
server.use("/admin", AdminRouter);
server.use("/user", UserRouter);
server.use("/order", OrderRouter);

mongoose.connect(
    process.env.MONGODB_URL,
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

