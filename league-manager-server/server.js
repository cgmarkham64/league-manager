require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const cors = require("cors");
const {ObjectId} = require("bson");

const PageContent = require("./schemas/PageSchema.js");
const League = require("./schemas/LeagueSchema.js");
// const User = require("./schemas/UserSchema.js"); // TODO implement
const Team = require("./schemas/TeamSchema.js");

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
 * GET all Leagues
 */
router.get('/leagues', (req, res) => {
    League.find((err, data) => {
        if(err) {
            console.error(`ERROR: Could not GET leagues.`);
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data});
    });
});

/**
 * GET League with ID
 * @param: {leagueId}
 */
router.get('/league/:id', (req, res)=> {
    const id = req.params.id;
    League.findById(id, (err, data) => {
        if(err) {
            console.error(`ERROR: Could not GET League, ${id}`);
            return res.json({success: false, error: err});
        }
        console.log("data response is ", data)
        return res.json({success: true, data});
    });
});

/**
 * TODO CREATE NEW League
 * @param: {League}
 */
router.post('/league', (req, res) => {
    // TODO still need implementation
    // const {league} = req.body;
    // LeagueSchema.create(league, (err) => {
    //     if(err) {
    //         console.error(`ERROR: Could not CREATE league.`);
    //         return res.json({success: false, error: err});
    //     }
    //     return res.json({success: true});
    // });
});

/**
 * TODO UPDATE League with ID and League Json Object
 * @param: {ID, League}
 */
router.post('/league/:id', (req, res) => {
    // TODO still need implementation
    // const {id, league} = req.body;
    // LeagueSchema.findByIdAndUpdate(id, league, (err) => {
    //     if(err) {
    //         console.error(`ERROR: Could not UPDATE league ${id}.`);
    //         return res.json({success: false, error: err});
    //     }
    //     console.log("updated League", id);
    //     return res.json({success: true});
    // });
});

/**
 * TODO DELETE League with ID
 * @param: {ID}
 */
router.delete('/league/:id', (req, res) => {
    // TODO still need implementation
    // const {id} = req.body;
    // LeagueSchema.findByIdAndRemove(id, (err) => {
    //     if(err) {
    //         console.error(`ERROR: Could not DELETE League, ${id}.`);
    //         return res.json({success: false, error: err});
    //     }
    //     console.log("DELETED League", id);
    //     return res.json({success: true});
    // });
});

/**
 * GET all Teams
 */
router.get('/teams', (req, res) => {
    Team.find((err, data) => {
        if(err) {
            console.error(`ERROR: Could not GET Teams.`);
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data});
    });
});

/**
 * GET Team with ID
 * @param: id
 */
router.get('/team/:id', (req, res) => {
    const id = req.params.id;
    Team.findById(id,(err, data) => {
        if(err) {
            console.error(`ERROR: Could not GET Team, ${id}`);
            return res.json({success: false, error: err});
        }
        console.log("data response is ", data)
        return res.json({success: true, data});
    });
});

/**
 * TODO CREATE NEW Team
 */
router.post('/team', (req, res) => {
    // TODO still need implementation
    // const {id} = req.body;
    // Team.findById(id, (err, data) => {
    //     if(err) {
    //         console.error(`ERROR: Could not GET Team, ${id}`);
    //         return res.json({success: false, error: err});
    //     }
    //     return res.json({success: true, data});
    // });
});

/**
 * TODO UPDATE Team with ID and Team JSON Object
 * @param: id
 */
router.post('/team/:id', (req, res) => {
    // TODO still need implementation
    // const {id} = req.body;
    // Team.findById(id, (err, data) => {
    //     if(err) {
    //         console.error(`ERROR: Could not GET Team, ${id}`);
    //         return res.json({success: false, error: err});
    //     }
    //     return res.json({success: true, data});
    // });
});

/**
 * TODO DELETE Team
 * @param: id
 */
router.delete('/team/:id', (req, res) => {
    // TODO still need implementation
    // const {id} = req.body;
    // Team.findById(id, (err, data) => {
    //     if(err) {
    //         console.error(`ERROR: Could not GET Team, ${id}`);
    //         return res.json({success: false, error: err});
    //     }
    //     return res.json({success: true, data});
    // });
});


const server = http.createServer(app);
server.listen(process.env.PORT ? process.env.PORT : 4000);
