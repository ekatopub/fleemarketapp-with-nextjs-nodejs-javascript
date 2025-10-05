// utils/database.js
import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(
			//"mongodb+srv://ekatobiz_db_user:xFmPVTPm99VHPZKf@cluster0.9diuqj8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
			//"mongodb+srv://ekatobiz_db_user:xFmPVTPm99VHPZKf@cluster0.9diuqj8.mongodb.net/sample_mflix?retryWrites=true&w=majority"
			"mongodb+srv://ekatobiz_db_user:xFmPVTPm99VHPZKf@cluster0.9diuqj8.mongodb.net/next-market?retryWrites=true&w=majority&appName=Cluster0"
		); // 追加
		console.log("Success: Connected to MongoDB");
	} catch (err) {
		console.log("Failure:Unconnected to MongoDB");
		console.log(err);
		throw new Error("Failure:Unconnected to MongoDB");
	}
};

export default connectDB;
