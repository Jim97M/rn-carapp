const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const compression = require('compression');
const morgan = require('morgan');
const SocketIO = require('socket.io');
const userRoute = require('./routes/user');
const carRoutes = require('./routes/car');
const payRoutes = require('./routes/paypal');
require("dotenv").config();
require("./database/connect");
app.use(cors());
const port = process.env.PORT || 5000;
const host = process.env.HOST;

app.use(morgan('dev'));
app.use(compression());
app.use(express.json());

app.use('/assets', express.static('assets'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/user", userRoute);
app.use("/car", carRoutes);
app.use("/pay", payRoutes);

app.get("/", async(req, res) => {
    res.send({"message": "Welcome"});
});


app.listen(port, () => {
    console.log("Server running at http://" + host + ":" + port);
})


// io = SocketI0(myServer);
// socketConnect(io);