const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//app.get('/',(req,res)=>{
//    res.json({message:"RESt API with Node.js, and Sqlite"})
//})

require("./routes/index")(app);

app.listen(PORT, () => {
  console.log("hello");
});

module.exports = app;
