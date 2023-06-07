"use client";

import {
	useGuessNumber,
	useCompleted,
	useStateActions,
	useAnswer,
} from "./store";
import { KeyboardPressHandler, Keyboard } from "./Components/Keyboard";
import { fetchSolution } from "./utils/fetchSolution";
import { useEffect } from "react";
import { Spoiler } from "./Components/Spoiler";
import { LetterRow } from "./Components/LetterRow";

export default function Home() {
	const completed = useCompleted();
	const guessNumber = useGuessNumber();
	const setAnswer = useStateActions().setAnswer;
	const answer = useAnswer();

	useEffect(() => {
		async function fetchSolutionData() {
			const solution = await fetchSolution();
			setAnswer(solution?.toLocaleLowerCase() || "bacon");
		}
		fetchSolutionData();
	}, [setAnswer]);

	return (
		<main className="flex min-h-screen flex-col items-center bg-stone-50  pt-3">
			<KeyboardPressHandler />
			<Spoiler message="Peek the answer..." secret={answer || ""} />
			<div className="">
				<LetterRow row={0} />
				<LetterRow row={1} />
				<LetterRow row={2} />
				<LetterRow row={3} />
				<LetterRow row={4} />
				<LetterRow row={5} />
				<Keyboard />
			</div>
			{completed && (
				<div className="py-2 text-lg">
					You completed this Swordle in {guessNumber} guesses!
				</div>
			)}
		</main>
	);
}
