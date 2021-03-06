import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
const app = express();

// Conexion a DB

//Conexión a la base de datos
const uri = "mongodb://guille:4Emperador@localhost:27017/Fate?authSource=admin"; //Poner el nombre del contenedor de mongo en docker en vez de localhost
const options = { useNewUrlParser: true, useUnifiedTopology: true, family: 4 };
mongoose.set("strictQuery", false);

mongoose.connect(uri, options).then(
  () => {
    console.log("Conectado a DB");
  },
  (err) => {
    console.log(err);
  }
);

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/login", require("./API/LoginApi"));
app.use("/api", require("./API/UserApi"));
app.use("/api", require("./API/CharactersApi"));
app.use("/api", require("./API/CampaignApi"));

// Middleware para Vue.js router modo history
const history = require("connect-history-api-fallback");
app.use(history());
app.use(express.static(path.join(__dirname, "public")));

app.set("puerto", process.env.PORT || 3000);

app.listen(app.get("puerto"), () => {
  console.log("Example app listening on port: " + app.get("puerto"));
});
