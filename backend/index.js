const app=require("./app");
const config=require("./config")


app.listen(config.PORT,()=>{
    console.log(`Server is running on port http://localhost:${config.PORT}`);
    
    
})