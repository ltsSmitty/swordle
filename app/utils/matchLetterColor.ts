import { doesLetterMatch } from "../Components/LetterBox";

type GuessStatus = "notGuessed" | "correct" | "incorrect" | "wrongLocation";

export const matchLetterColor = (
    _letter: string,
    guesses: string[],
    answer: string
): GuessStatus => {
    const letter = _letter[0].toLocaleLowerCase();

    const listOfGuessedLetters = guesses
        .map((guess) => guess.split("").map((letter) => letter[0]))
        .flat()
        .filter((letter, index, self) => self.indexOf(letter) === index);

    if (!listOfGuessedLetters.includes(letter)) return "notGuessed";

    const doAnyLettersMatch = guesses
        .map((guess) => {
            const letters = guess.split("");
            return letters.map((l, letterIndex) => {
                if (l.toLocaleLowerCase() !== letter) return "notGuessed";
                return doesLetterMatch({
                    submittedWord: guess,
                    thisLetterIdx: letterIndex,
                    answer,
                });
            });
        })
        .flat()
        .filter((letter, index, self) => self.indexOf(letter) === index);

    if (doAnyLettersMatch.includes("correct")) return "correct";
    if (doAnyLettersMatch.includes("wrongLocation")) return "wrongLocation";
    if (doAnyLettersMatch.includes("incorrect")) return "incorrect";
    return "notGuessed";
    // eslint-disable-next-line react-hooks/exhaustive-deps
};