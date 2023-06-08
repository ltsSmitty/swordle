import { useCallback, useEffect, useRef, useState } from "react";
import {
	useStateActions,
	useGuessNumber,
	useGuesses,
	useAnswer,
} from "../store";
import { cn } from "../utils/utils";
import { matchLetterColor } from "../utils/matchLetterColor";

type GuessStatus = "notGuessed" | "correct" | "incorrect" | "wrongLocation";

const LetterKey = ({ letter }: { letter: string }) => {
	const { addLetter } = useStateActions();
	const guessNumber = useGuessNumber();
	const guesses = useGuesses();
	const answer = useAnswer();
	const thisGuess = guesses[guessNumber];

	const [letterState, setLetterState] = useState<GuessStatus>("notGuessed");

	useEffect(() => {
		setLetterState(matchLetterColor(letter, guesses, answer));
		// intentionally don't update on guess until the guess is submitted
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [guessNumber, answer, letter]);

	const onButtonPress = (letter: string) => {
		if (!thisGuess || thisGuess.length < 5) addLetter(letter[0]);
	};

	const buttonBG = () => {
		if (letterState === "correct")
			return "delay-500 bg-green-500 text-stone-50";
		if (letterState === "incorrect")
			return "delay-500 bg-stone-500 text-stone-50";
		if (letterState === "wrongLocation")
			return "delay-500 bg-amber-300 text-stone-50";
		return "";
	};

	return (
		<button
			className={cn(
				"flex h-14 flex-1 items-center justify-center rounded-md  bg-stone-300 text-stone-800",
				buttonBG(),
				"mr-[6px] last-of-type:mr-0"
			)}
			onClick={() => onButtonPress(letter)}
		>
			<div className="  ">
				<span className="text-xl font-bold">{letter.toLocaleUpperCase()}</span>
			</div>
		</button>
	);
};

const EnterKey = () => {
	const { submitWord } = useStateActions();

	return (
		<button
			className="flex h-14 flex-[1.5] items-center justify-center rounded-md  bg-stone-300 text-stone-800 "
			style={{ margin: "0 6px 0 0" }}
			onClick={submitWord}
		>
			<div className="  ">
				<span className="text-xs font-bold">ENTER</span>
			</div>
		</button>
	);
};

const BackspaceKey = () => {
	const thisGuess = useGuesses()[useGuessNumber()];
	const { removeLetter } = useStateActions();

	const onBackspacePress = () => {
		if (thisGuess.length > 0) removeLetter();
	};

	return (
		<button
			className="flex h-14 flex-[1.5] items-center justify-center rounded-md bg-stone-300   text-stone-800"
			onClick={onBackspacePress}
		>
			<div className="  ">
				<span className="text-xl ">⌫</span>
			</div>
		</button>
	);
};

const row1 = "qwertyuiop";
const row2 = "asdfghjkl";
const row3 = "zxcvbnm";

const Keyboard = () => {
	return (
		<div className="mx-2 items-center justify-between">
			<div className="mb-2 flex w-full flex-row last:m-0">
				{row1.split("").map((letter) => (
					<LetterKey key={letter} letter={letter} />
				))}
			</div>
			<div className="mb-2 flex flex-row">
				<div className="flex-[0.5]"></div>
				{row2.split("").map((letter) => (
					<LetterKey key={letter} letter={letter} />
				))}
				<div className="flex-[0.5]"></div>
			</div>
			<div className="mb-2 flex flex-row">
				<EnterKey />
				{row3.split("").map((letter) => (
					<LetterKey key={letter} letter={letter} />
				))}
				<BackspaceKey />
			</div>
		</div>
	);
};

const KeyboardPressHandler = () => {
	const { addLetter, removeLetter, submitWord } = useStateActions();
	const thisGuess = useGuesses()[useGuessNumber()];

	const onKeyPress = (event: KeyboardEvent) => {
		// console.log("event.key", event.key);
		if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
			addLetter(event.key);
		} else if (event.key === "Backspace") {
			if (thisGuess?.length > 0) removeLetter();
		} else if (event.key === "Enter") {
			submitWord();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", onKeyPress);
		return () => {
			document.removeEventListener("keydown", onKeyPress);
		};
	});

	return null;
};

const isLetterInAnyGuess = (letter: string, guesses: string[]) => {
	return guesses.some((guess) => guess.includes(letter));
};

export { Keyboard, KeyboardPressHandler, LetterKey, EnterKey, BackspaceKey };

