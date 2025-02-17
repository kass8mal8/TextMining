import userIcon from "../../assets/images/user.png";

const SideNav = () => {
	return (
		<section className="bg-[#016FEA] text-white w-[25%] h-screen fixed px-4 py-2">
			<h1>Legal Text Summarizer</h1>
			<p>previous document</p>
			<p>previous document</p>
			<p>previous document</p>

			<aside className="flex space-x-3 absolute bottom-2 items-center">
				<img src={userIcon} alt="profile icon" className="w-6" />
				<p>Profile name</p>
			</aside>
		</section>
	);
};

export default SideNav;
