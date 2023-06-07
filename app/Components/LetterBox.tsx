import { ClassValue } from "clsx";
import { useGuesses, useAnswer, useGuessNumber } from "../store";
import { cn } from "../utils/utils";
import { useEffect, useRef } from "react";

type LetterStatus =
	| "empty"
	| "idle"
	| "correct"
	| "incorrect"
	| "wrongLocation";

const LetterBox = ({
	index,
	submitted,
}: {
	index: { row: number; column: number };
	submitted: boolean;
}) => {
	const letter = useGuesses()[index.row]?.[index.column];
	const answer = useAnswer();

	const borderColor = letter ? "border-stone-400" : "border-stone-300";
	let backgroundColor;
	if (!submitted || !letter) backgroundColor = "bg-stone-50";
	else {
		const status = doesLetterMatch({
			guess: letter,
			guessIndex: index.column,
			answer,
		});
		switch (status) {
			case "empty":
				backgroundColor = "bg-stone-50";
				break;
			case "idle":
				backgroundColor = "bg-stone-300";
				break;
			case "correct":
				backgroundColor = "bg-green-500 text-stone-50";
				break;
			case "incorrect":
				backgroundColor = "bg-stone-500 text-stone-50";
				break;
			case "wrongLocation":
				backgroundColor = "bg-amber-300 text-stone-50";
				break;
		}
	}

	const transitionLength = (): ClassValue => {
		if (!submitted) return "delay-[50ms]";
		switch (index.column) {
			case 0:
				return "delay-100 border-0";
			case 1:
				return "delay-200 border-0";
			case 2:
				return "delay-300 border-0";
			case 3:
				return "delay-[400ms] border-0";
			case 4:
				return " delay-[500ms] border-0";
		}
	};

	const transitionCN = `transition duration-300 ease-in-out`;

	return (
		<div
			className={cn(
				"flex h-14 w-14 items-center justify-center  border-2 text-stone-800 ",
				borderColor,
				backgroundColor,
				transitionCN,
				transitionLength()
			)}
		>
			<div className="  ">
				<span className="text-3xl font-bold">
					{(letter ? letter[0] : " ").toLocaleUpperCase()}
				</span>
			</div>
		</div>
	);
};

export const doesLetterMatch = ({
	guess,
	guessIndex,
	answer,
}: {
	guess: string;
	guessIndex: number;
	answer: string;
}): LetterStatus => {
	const letters = answer.split("");
	if (letters[guessIndex]?.toLocaleLowerCase() === guess[0].toLocaleLowerCase())
		return "correct";
	if (letters.includes(guess[0])) return "wrongLocation";
	return "incorrect";
};

export default LetterBox;

