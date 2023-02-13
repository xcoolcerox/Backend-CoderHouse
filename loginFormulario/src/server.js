import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import viewsRoutes from "./routes/views.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import path from 'path'
const app = express();

// Server config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://Coder:coderBackend2023@codercluster.dzpfie2.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60*60,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://Coder:coderBackend2023@codercluster.dzpfie2.mongodb.net/?retryWrites=true&w=majority" )
  .then(() => console.log("Connected to MongoDB"))

app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use("/", viewsRoutes);
app.use("/session", sessionRoutes);
console.log(__dirname)
app.use(express.static(path.join(__dirname, '/public')));

app.listen(8080, () => console.log("Server running on port 8080"))
