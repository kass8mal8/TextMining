const Document = require("../model/document");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = "./uploads";
if (!fs.existsSync(uploadDirectory)) {
	fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDirectory); // Store files in the "uploads" folder
	},
	filename: (req, file, cb) => {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		// Allow only PDF and DOCX files
		if (!file.originalname.match(/\.(pdf|docx)$/)) {
			return cb(new Error("Only PDF and DOCX files are allowed!"));
		}
		cb(null, true);
	},
}).single("file"); // Single file upload

const uploadDocument = async (req, res) => {
	try {
		await upload(req, res, async (err) => {
			if (err) {
				return res.status(400).json({ message: err.message });
			}
			console.log("Request Body:", req.body);

			// Extract file details
			const { originalname, size, path } = req.file;
			const fileType = originalname.split(".").pop().toLowerCase(); // Get file extension

			// Create a new document entry and save to DB
			const newDocument = await Document.create({
				title: req.body.title || originalname,
				description: req.body.description || "",
				author: req.user?._id, // Handle cases where req.user is undefined
				fileType,
				filePath: path,
				fileSize: size,
			});

			res
				.status(201)
				.json({ message: "File uploaded successfully", document: newDocument });
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = { uploadDocument };
