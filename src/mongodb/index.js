import mongoose from "mongoose";

async function connect(){
  try {

    // console.log(process.env.NEXT_PUBLIC_DB_USER);
    const uri = `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USER}:${process.env.NEXT_PUBLIC_DB_PASS}@cluster0.sdpuocy.mongodb.net/${process.env.NEXT_PUBLIC_dbName}?retryWrites=true&w=majority`;

 

    await mongoose.connect(uri, {});

    const connection = mongoose.connection;
  
    connection.on("connected", () => {
      console.log("mongodb connected successfully");
    });
  
    connection.on("error", (err) => {
      console.log("mongodb connection error, please make sure MOngodb is running", err);
      process.exit(1);
    })
  } catch (error) {
    console.log("someting went wrong");
    console.log(error);
  }

}

export default connect;