import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.error(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    }
};
//  handle disconnects/reconnects gracefully
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});
export default connectDB;
//# sourceMappingURL=Database.js.map