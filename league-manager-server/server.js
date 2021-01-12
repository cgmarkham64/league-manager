require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const cors = require("cors");
const PageContent = require("./schemas/PageContent.js");

const router = express.Router();

// Connect mongoose to mongo database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connection Successful :)")
}).catch(err => {
    console.error(`There was an error: ${err}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: "false"}));
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());
app.use('/api', router);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// this is our get method
// this method fetches all available data in our database
router.get('/getPageContent', (req, res) => {
    PageContent.find((err, data) => {
        if (err) {
            console.error(`ERROR: Could not retrieve page content data.`);
            return res.json({ success: false, error: err });
        }
        console.log("returning all PageContent data", data);
        return res.json({ success: true, data: data });
    });
});

const server = http.createServer(app);

server.listen(process.env.PORT ? process.env.PORT : 4000);
