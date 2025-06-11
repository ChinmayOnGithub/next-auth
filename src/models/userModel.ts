import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: [6, "Password must be at least 6 characters long"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: {
		type: String,
		default: null,
	},
	forgotPasswordTokenExpiry: {
		type: Date,
		default: null,
	},
	verifyToken: {
		type: String,
		default: null,
	},
	verifyTokenExpiry: {
		type: Date,
		default: null,
	},
});

// The NEXTjs runs these files multiple times, so we need to check if the model already exists
const User = mongoose.models.users || mongoose.model("users", userSchema);
export { User };
