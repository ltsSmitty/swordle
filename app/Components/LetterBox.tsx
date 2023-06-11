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
	const guess = useGuesses()[index.row];
	const letter = guess?.[index.column];
	const answer = useAnswer();

	const borderColor = letter ? "border-stone-400" : "border-stone-300";
	let backgroundColor;
	if (!submitted || !letter) backgroundColor = "bg-stone-50";
	else {
		const status = doesLetterMatch({
			submittedWord: guess,
			thisLetterIdx: index.column,
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
				"flex h-14 w-14 items-center  justify-center border-2 text-stone-800",
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

export const doesLetterMatch = (props: {
	submittedWord: string;
	thisLetterIdx: number;
	answer: string;
}): LetterStatus => {
	const { submittedWord, thisLetterIdx, answer } = props;

	if (!submittedWord) return "empty";

	const answerLetters = answer.split("").map((l) => l.toLocaleLowerCase());
	const guessLetters = submittedWord
		.split("")
		.map((l) => l.toLocaleLowerCase());
	const thisLetter = guessLetters[thisLetterIdx];

	const numberOfTimesThisLetterAppearsInAnswer = answerLetters.filter(
		(l) => l === thisLetter
	).length;

	const isThisGuessInTheRightPlace =
		answerLetters[thisLetterIdx] === thisLetter;

	const indicesOfThisLetterInGuess = guessLetters
		.map((l, i) => (l === thisLetter ? i : -1))
		.filter((i) => i !== -1);

	if (numberOfTimesThisLetterAppearsInAnswer === 0) return "incorrect";

	if (isThisGuessInTheRightPlace) return "correct";
	else {
		// this instance of this letter is not in the right place, but this letter is in the answer.
		// before just saying it's in the wrong place, need to check if any of the other instances of this letter are in the right place.
		const numberOfInstancesOfThisLetterInRightPlace = indicesOfThisLetterInGuess
			.map((i) => answerLetters[i] === thisLetter)
			.map((b) => (b ? 1 : 0))
			.reduce((a: number, b: number) => a + b, 0);

		const indexOfThisLetterInGuess =
			indicesOfThisLetterInGuess.indexOf(thisLetterIdx);

		if (
			numberOfInstancesOfThisLetterInRightPlace ===
			numberOfTimesThisLetterAppearsInAnswer
		)
			return "incorrect";

		if (indexOfThisLetterInGuess >= numberOfTimesThisLetterAppearsInAnswer)
			return "incorrect";
		else return "wrongLocation";
	}

	//
};

export default LetterBox;

