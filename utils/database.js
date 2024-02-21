import mongoose from 'mongoose'

export const connectToDb = async () => {
    let isConnected = false
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDB is already connected")
    }
    try {
        await mongoose.connect(
            process.env.MONGODB_URL,
            {
                dbName: "AI-APP",
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        isConnected = true
        console.log("MongoDb Connected")
    } catch (error) {
        console.log("db connection error" + error)
    }
}