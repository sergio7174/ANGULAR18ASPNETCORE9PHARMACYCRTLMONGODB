const 
express = require('express'),
app = express(),
cors = require('cors'),
connectDb = require("./config/db"),
colors = require("colors"),
dotenv = require("dotenv"),
bodyParser = require('body-parser'),

// use express router 
router = require("./routes/index");
 

//config
dotenv.config();

//connect to database
connectDb();
    
app.use(cors())

app.use(bodyParser.json());
app.use(cors({ origin:'http://localhost:4200'}));

app.use("/uploads", express.static("uploads"));

app.get('/', (req, res) => {
    res.send('Hi')
})

// This code tells your Express.js application to use the router object as 
// a system for middleware and routing.
app.use("/", router);


// set uyp the aplication to listen on port 3000
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}         `.bgCyan.blue);
  });