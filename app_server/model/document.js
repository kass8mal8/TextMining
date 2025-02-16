const { Schema, model } = require("mongoose");

// Define the schema for a document
const documentSchema = new Schema({
	title: {
		type: String,
		required: true, // Title is mandatory
		trim: true, // Remove whitespace from both ends
		maxlength: 255, // Limit the length of the title
	},
	description: {
		type: String, // Optional description for the document
		default: "", // Default to an empty string if not provided
	},
	author: {
		type: Schema.Types.ObjectId, // Reference to the User model
		ref: "User", // Relationship with the User model
		required: true, // Every document must have an author
	},
	fileType: {
		type: String,
		enum: ["pdf", "docx"], // Restrict file types to PDF or Word
		required: true, // File type is mandatory
	},
	filePath: {
		type: String,
		required: true, // Path to the uploaded file (stored in cloud storage or local filesystem)
	},
	fileSize: {
		type: Number, // Size of the file in bytes
		required: true, // File size is mandatory
	},
	createdAt: {
		type: Date,
		default: Date.now, // Automatically set the creation date
	},
	tags: {
		type: [String], // Array of tags for categorization
		default: [], // Default to an empty array if no tags are provided
	},
});

// Create and export the Document model
module.exports = model("Document", documentSchema);
