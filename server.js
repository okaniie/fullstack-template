const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const dashboardRoutes = require('./routes/dashboardRoutes');
const depositRoutes = require('./routes/depositRoutes');
const withdrawRoutes = require('./routes/withdrawRoutes');
const expertRoutes = require('./routes/expertRoutes');
const walletRoutes = require('./routes/walletRoutes');
const cryptoRoutes = require('./routes/cryptoRoutes');
const plansRoutes = require('./routes/plansRoutes');
const wallet2Routes = require('./routes/wallet2Routes');
const safetylockRoutes = require('./routes/safetylockRoutes');
const contactRoutes = require('./routes/contactRoutes');
const investmentRoutes = require('./routes/investmentRoutes');

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/deposit', depositRoutes);
app.use('/withdraw', withdrawRoutes);
app.use('/experts', expertRoutes);
app.use('/wallet', walletRoutes);
app.use('/buycrpto', cryptoRoutes);
app.use('/plans', plansRoutes);
app.use('/wallet2', wallet2Routes);
app.use('/safetylock', safetylockRoutes);
app.use('/contact', contactRoutes);
app.use('/investment', investmentRoutes);


//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
