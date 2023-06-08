import Image from "next/image";

export const GithubLink = () => {
	return (
		<div className=" absolute bottom-2 right-2">
			<a
				href="https://github.com/ltsSmitty/swordle"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
					alt="GitHub Logo"
					width={50}
					height={50}
				/>
			</a>
		</div>
	);
};

