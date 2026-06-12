const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT=3000;

const deploymentRoutes = require("./src/routes/deploymentRoute");
const helmRoutes = require("./src/routes/helmRoute");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", deploymentRoutes);
app.get('/',(req,res)=>{
    res.send("MobileKube api is running");
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
