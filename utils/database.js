// utils/database.js
import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const uri = process.env.MONGODB_URI;
		if (!uri) {
			throw new Error("MONGODB_URI is not defined");
		}
		await mongoose.connect(uri); // 追加
		console.log("Success: Connected to MongoDB");
	} catch (err) {
		console.log("Failure:Unconnected to MongoDB");
		console.log(err);
		throw new Error("Failure:Unconnected to MongoDB");
	}
};

export default connectDB;
