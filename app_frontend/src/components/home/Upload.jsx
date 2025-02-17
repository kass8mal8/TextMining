import iconInfo from "../../assets/images/icon-info.svg";
import upload from "../../assets/images/upload.png";
import pdf from "../../assets/images/pdf.png";
import doc from "../../assets/images/doc.png";
import trash from "../../assets/images/trash.png";
import { useState } from "react";
import axios from "axios";

const Upload = () => {
	const [fileType, setFileType] = useState("");
	const [fileName, setFileName] = useState("");
	const [fileDetails, setFileDetails] = useState(null);
	const url = "http://localhost:5000/api/document/upload";

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const fileProperties = file.name.split(".");
		setFileDetails(file);
		setFileType(fileProperties[fileProperties.length - 1]); // Handle filenames with multiple dots
		setFileName(fileProperties.slice(0, -1).join("."));

		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await axios.post(url, formData, {
				headers: { "Content-Type": "multipart/form-data" }, // Optional: Explicitly set headers
			});
			const data = res.data;
			console.log("Response:", data);
			alert("File uploaded successfully!");
		} catch (error) {
			console.error("Upload error:", error.response?.data || error.message);
			alert(
				"Upload failed: " + (error.response?.data?.message || "Unknown error")
			);
		}
	};

	const fileSize = Math.floor((fileDetails?.size || 0) / 1000);

	return (
		<form
			encType="multipart/form-data"
			className="absolute left-[24%] h-screen top-0 w-[76%]"
		>
			<section className="mx-auto text-center bg-white border-dashed border-2 border-gray-300 rounded-lg mt-[16%] tracking-wide p-10 w-[50%]">
				<label htmlFor="upload" className="">
					<input
						id="upload"
						type="file"
						name="file"
						className="hidden"
						onChange={handleFileChange}
						accept=".pdf,.docx" // Restrict file types on the frontend
					/>
					<aside className="text-gray-500">
						<img src={upload} alt="upload" className="w-8 mx-auto opacity-45" />
						<p className="mt-2 tracking-wide">
							Drag & drop or click to choose files.
						</p>
						<p>Max file size: 5 MB</p>
					</aside>
				</label>
			</section>
			<section className="ml-[25%] mt-4 flex space-x-2 items-center text-neutral-400">
				<img src={iconInfo} alt="info" className="w-7" />
				<p>Only pdf and docx formats allowed!</p>
			</section>
			{fileDetails && (
				<>
					<section className="flex relative items-center space-x-2 ml-[25%] mt-3 border border-gray-300 rounded-md w-[50%] p-3 text-gray-500">
						<img
							src={fileType === "pdf" ? pdf : doc}
							alt="typeIcon"
							className="w-10"
						/>
						<aside>
							<p className="text-neutral-700">{fileName}</p>
							<article className="flex space-x-2">
								<p>.{fileType} |</p>
								<p>
									{fileSize < 1000
										? `${fileSize} KB`
										: `${Math.floor(fileSize / 1000)} MB`}
								</p>
							</article>
						</aside>
						<img
							src={trash}
							alt="trash"
							className="w-6 opacity-45 cursor-pointer absolute right-2"
							onClick={() => setFileDetails(null)}
						/>
					</section>
					<button className="bg-[#016FEA] p-4 ml-[25%] w-[50%] text-white rounded-md mt-3 tracking-wide">
						Generate Summary
					</button>
				</>
			)}
		</form>
	);
};

export default Upload;
