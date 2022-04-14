const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const compression = require('compression');
const morgan = require('morgan');
const SocketIO = require('socket.io');
const roomController = require("./controllers/room");

require("dotenv").config();
require("./database/connect");
app.use(cors());
const port = process.env.PORT || 5000;
const host = process.env.HOST;

app.use(morgan('dev'));
app.use(compression());
app.use(express.json());

const user = require("./routes/user");
app.use('/assets', express.static('assets'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", async(req, res) => {
    res.send({"message": "Welcome"});
});

app.listen(port, host, () => {
    console.log("Server running at http://" + host + ":" + port);
})

const createGroup = async () => {
    const response = await roomController.is_Group_Room_Already_Exist("global");
    if (!response) {
        await roomController.Create_Group_Room("global");
    }
}

createGroup();

// io = SocketI0(myServer);
// socketConnect(io);