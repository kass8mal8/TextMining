import { Link, useNavigate } from "react-router-dom";
import conceptIllustration from "../../assets/images/concept-illustration.png";
import axios from "axios";
import { useState } from "react";
const Signup = () => {
	const [userDetails, setUserDetails] = useState(null);
	const url = "http://localhost:5000/api/auth/signup";
	const navigate = useNavigate();

	const handleChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(url, userDetails);
			const data = res.data;
			navigate("/");
			console.log("Response Data:", data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex justify-between h-screen w-full border">
			<div className="bg-neutral-100 w-2/3">
				<img
					src={conceptIllustration}
					alt="illustration"
					className="w-3/4 mx-auto"
				/>
				<h1 className="text-center w-2/3 mx-auto text-[#0256B8] font-bold text-3xl">
					Get started by creating your account today!
				</h1>
			</div>
			<form className="w-2/3 px-[10%] mt-[8%] relative" onSubmit={handleSubmit}>
				<section className="flex space-x-3 my-3">
					<input
						name="firstName"
						className="focus:outline-none w-1/2 rounded-md p-4 bg-[#FAFBFD] border border-neutral-200"
						type="text"
						placeholder="first name"
						onChange={handleChange}
					/>
					<input
						name="lastName"
						className="focus:outline-none w-1/2 rounded-md p-4 bg-[#FAFBFD] border border-neutral-200"
						type="text"
						placeholder="last name"
						onChange={handleChange}
					/>
				</section>
				<input
					name="email"
					className="block focus:outline-none rounded-md p-4 bg-[#FAFBFD] w-full my-5 border border-neutral-200"
					type="text"
					placeholder="email"
					onChange={handleChange}
				/>
				<input
					name="password"
					className="focus:outline-none rounded-md p-4 bg-[#FAFBFD] w-full border border-neutral-200"
					type="password"
					placeholder="password"
					onChange={handleChange}
				/>
				<button
					type="submit"
					className="bg-[#016FEA] p-4 w-full mt-4 rounded-md font-bold text-white"
				>
					Signup
				</button>
				<footer className="absolute bottom-2 left-[30%]">
					Already have an account?{" "}
					<Link to="/signin" className="text-[#016FEA] font-bold">
						Signin
					</Link>
				</footer>
			</form>
		</div>
	);
};

export default Signup;
