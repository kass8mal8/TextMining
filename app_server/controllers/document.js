const Document = require("../model/document");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // Store files in the "uploads" folder
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname); // Rename file to avoid conflicts
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
		upload(req, res, async (err) => {
			if (err) {
				return res.status(400).json({ message: err.message });
			}

			// Extract file details
			const { originalname, size, path } = req.file;
			const fileType = originalname.split(".").pop().toLowerCase(); // Get file extension

			// Create a new document entry and save to DB
			const newDocument = await Document.create({
				title: req.body.title || originalname, // Use file name as title if none provided
				description: req.body.description || "",
				author: req.user._id, // Assuming user authentication is implemented
				fileType,
				filePath: path, // Relative path to the uploaded file
				fileSize: size,
				tags: req.body.tags ? req.body.tags.split(",") : [],
			});

			res
				.status(201)
				.json({ message: "File uploaded successfully", document: newDocument });
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = { uploadDocument };
