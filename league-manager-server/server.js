require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const cors = require("cors");
const PageContent = require("./schemas/PageSchema.js");
const LeagueSchema = require("./schemas/LeagueSchema.js");

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

/**
 * Retrieve home page content - populate the home page of the league manager application with image references and text
 */
router.get('/getPageContent', (req, res) => {
    PageContent.find((err, data) => {
        if(err) {
            console.error(`ERROR: Could not GET page content data.`);
            return res.json({ success: false, error: err });
        }
        return res.json({ success: true, data: data });
    });
});

/**
 * Retrieve all leagues from database
 */
router.get('/leagues', (req, res) => {
    LeagueSchema.find((err, data) => {
        if(err) {
            console.error(`ERROR: Could not GET leagues.`);
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data});
    });
});

/**
 * GET a single league with via ID
 * @param: {leagueId}
 */
router.get('league', (req, res)=> {
    const {id} = req.body;
    LeagueSchema.findById(id, (err, data)=> {
        if(err) {
            console.error(`ERROR: Could not GET single league, ${id}`);
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data});
    })
})

/**
 * Create a new League
 * @param: {League}
 */
router.post('/createLeague', (req, res) => {
    const {league} = req.body;
    LeagueSchema.create(league, (err) => {
        if(err) {
            console.error(`ERROR: Could not CREATE league.`);
            return res.json({success: false, error: err});
        }
        return res.json({success: true});
    });
});

/**
 * Update league with ID and League Json Object
 * @param: {ID, League}
 */
router.post('/updateLeague', (req, res) => {
    const {id, league} = req.body;
    LeagueSchema.findByIdAndUpdate(id, league, (err) => {
        if(err) {
            console.error(`ERROR: Could not UPDATE league ${id}.`);
            return res.json({success: false, error: err});
        }
        console.log("updated League", id, data);
        return res.json({success: true});
    });
});

/**
 * Delete league with ID
 * @param: {ID}
 */
router.delete('/removeLeague', (req, res) => {
    const {id} = req.body;
    LeagueSchema.findByIdAndRemove(id, (err) => {
        if(err) {
            console.error(`ERROR: Could not DELETE league ${id}.`);
            return res.json({success: false, error: err});
        }
        console.log("DELETED League", id);
        return res.json({success: true});
    });
});

const server = http.createServer(app);

server.listen(process.env.PORT ? process.env.PORT : 4000);
