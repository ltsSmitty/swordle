import { useState } from "react";

export const Spoiler = ({
	message,
	secret,
}: {
	message: string;
	secret: string;
}) => {
	const [hidden, setHidden] = useState(true);

	return (
		<div className=" absolute right-8 top-4 w-24">
			<button
				className="text-md rounded-md border-2 bg-stone-200 p-3 font-bold text-stone-800 transition ease-in-out hover:bg-stone-400 hover:text-stone-900"
				onClick={() => setHidden(!hidden)}
			>
				{hidden ? (
					message
				) : (
					<div className=" text-stone-500">{secret.toLocaleUpperCase()}</div>
				)}
			</button>
		</div>
	);
};

