const express=require("express");
const cors=require('cors');
const connectDB=require("./db-config/mongo-config");
const vendorRoute=require("./routes/vendor-route");
const property=require("./routes/property-route");


const app=express();

connectDB();

app.use(cors());

app.use(express.json());


app.use(express.urlencoded({extended:true}));



app.use("/api/vendor", vendorRoute);
app.use("/api/property",property);

app.listen(process.env.DEFAULT_PORT || 8000,()=>{
    console.log(`server is running on port ${process.env.DEFAULT_PORT || 8000}`)
})