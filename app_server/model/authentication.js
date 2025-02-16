const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// User Schema
const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	otp: {
		type: String || null,
		// required: true,
		default: null,
	},
});

// Hash the password before saving
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.statics.login = async function (email, password) {
	try {
		const user = await this.findOne({ email });

		if (user && bcrypt.compareSync(password, user.password)) {
			return user;
		}
		throw new Error("Incorrect credentials");
	} catch (error) {
		throw error;
	}
};

module.exports = model("User", UserSchema);
