/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useContext, createContext } from "react";
import { cn } from "./utils/utils";
import { useGameStore } from "./store";

const LetterBox = ({ letter }: { letter: string | undefined }) => {
	const borderColor = letter ? "border-stone-400" : "border-stone-300";
	return (
		<div
			className={cn(
				"flex h-14 w-14 items-center justify-center border-2  bg-stone-50 text-stone-800",
				borderColor
			)}
		>
			<div className="  ">
				<span className="text-3xl font-bold">
					{(letter ? letter[0] : "").toLocaleUpperCase()}
				</span>
			</div>
		</div>
	);
};

const WordSubmission = ({ letters }: { letters: (string | undefined)[] }) => {
	const initialArray: (String | undefined)[] = new Array(5).fill(" ");

	return (
		<div className="flex flex-row gap-2">
			{initialArray.map((_element, i) => (
				<LetterBox key={i} letter={letters ? letters[i] : ""} />
			))}
		</div>
	);
};

const LetterKey = ({ letter }: { letter: string }) => {
	const addLetter = useGameStore((state) => state.addLetter);
	const guessNumber = useGameStore((state) => state.guessNumber);
	const thisGuess = useGameStore((state) => state.guesses[guessNumber]);

	const onButtonPress = (letter: string) => {
		console.log("letter", letter, `thisGuess`, thisGuess);
		if (!thisGuess || thisGuess.length < 5) addLetter(letter[0]);
	};

	return (
		<button
			className="flex h-14 w-10 items-center justify-center rounded-md  bg-stone-300 text-stone-800"
			onClick={() => onButtonPress(letter)}
		>
			<div className="  ">
				<span className="text-xl font-bold">{letter.toLocaleUpperCase()}</span>
			</div>
		</button>
	);
};

const EnterKey = () => {
	const submitWord = useGameStore((state) => state.submitWord);

	return (
		<button
			className="flex h-14 w-16 items-center justify-center rounded-md  bg-stone-300 text-stone-800"
			onClick={submitWord}
		>
			<div className="  ">
				<span className="text-xs font-bold">ENTER</span>
			</div>
		</button>
	);
};

const BackspaceKey = () => {
	const removeLetter = useGameStore((state) => state.removeLetter);
	const guessNumber = useGameStore((state) => state.guessNumber);
	const thisGuess = useGameStore((state) => state.guesses[guessNumber]);

	const onBackspacePress = () => {
		if (thisGuess.length > 0) removeLetter();
	};

	return (
		<button
			className="flex h-14 w-16 items-center justify-center rounded-md bg-stone-300   text-stone-800"
			onClick={onBackspacePress}
		>
			<div className="  ">
				<span className="text-xl ">⌫</span>
			</div>
		</button>
	);
};

const Keyboard = () => {
	const row1 = "qwertyuiop";
	const row2 = "asdfghjkl";
	const row3 = "zxcvbnm";
	return (
		<div className="flex flex-col items-center justify-between gap-2 ">
			<div className="flex flex-row gap-2 ">
				{row1.split("").map((letter) => (
					<LetterKey key={letter} letter={letter} />
				))}
			</div>
			<div className="flex flex-row gap-2">
				{row2.split("").map((letter) => (
					<LetterKey key={letter} letter={letter} />
				))}
			</div>
			<div className="flex flex-row gap-2">
				<EnterKey />
				{row3.split("").map((letter) => (
					<LetterKey key={letter} letter={letter} />
				))}
				<BackspaceKey />
			</div>
		</div>
	);
};

export default function Home() {
	const guessNumber = useGameStore((state) => state.guessNumber);
	const guesses = useGameStore((state) => state.guesses);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between bg-stone-50 p-24 ">
			<div className="">
				<WordSubmission letters={guesses[0]} />
				<WordSubmission letters={guesses[1]} />
				<WordSubmission letters={guesses[2]} />
				<WordSubmission letters={guesses[3]} />
				<WordSubmission letters={guesses[4]} />
				<WordSubmission letters={guesses[5]} />
				<Keyboard />
			</div>
		</main>
	);
}
