const express=require("express");
const cors=require('cors');
const connectDB=require("./db-config/mongo-config");
const vendorRoute=require("./routes/vendor-route");
const property=require("./routes/property-route");
const adminRoute=require("./routes/admin-route");
const http=require("http");
const socketIO=require("socket.io");
const chatModel=require("./schema/chat-schema");

const app=express();

connectDB();

app.use(cors(
    {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
));

app.use(express.json());


app.use(express.urlencoded({extended:true}));



app.use("/api/vendor", vendorRoute);
app.use("/api/property",property);
app.use("/api/admin",adminRoute);

const server=http.createServer(app);

const io=socketIO(server,{cors:{
    origin:"*",
    methods: ["GET", "POST"]
}})

io.on("connect",(socket)=>{
    console.log(socket)

    socket.on("sendMessage",async({userId,message,senderName})=>{
        console.log("new message received !!",message);
        chatModel.create({username:senderName,message:message,userId:userId}).then(
            (result) => {
                console.log(result);
                socket.to(userId).emit("receiveMessage",{senderName,message});
        }).catch((err) => {
            console.log(err);
        });
        
    });
    socket.on("disconnect",()=>{
        console.log("client Disconnected !!");
    });
})

server.listen(process.env.DEFAULT_PORT || 8000,()=>{
    console.log(`server is running on port ${process.env.DEFAULT_PORT || 8000}`)
})