import { create } from "zustand";

export type GameProps = {
    guesses: string[];
    answer: string;
    guessNumber: number;
    completed: boolean;
    actions: {
        addLetter: (letter: string) => void;
        removeLetter: () => void;
        submitWord: () => void;
        reset: () => void;
        setAnswer: (answer: string) => void;
    }
};

const useGameStore = create<GameProps>((set) => ({
    guesses: [],
    answer: "bacon",
    guessNumber: 0,
    completed: false,
    actions: {
        addLetter: (letter: string) => {
            set((state) => {
                const currentGuess = state.guesses[state.guessNumber];

                if (state.completed || currentGuess?.length === 5) {
                    return state;
                }

                return {
                    guesses: [
                        ...state.guesses.slice(0, state.guessNumber),
                        (currentGuess ? currentGuess + letter[0] : letter[0]),
                    ],
                };
            });
        },
        removeLetter: () => {
            set((state) => {
                if (state.guesses.length == 0) { return state; }

                const wordMinusLetter = state.guesses[state.guessNumber].slice(0, -1);
                const updatedState = {
                    guesses: [
                        ...state.guesses.slice(0, state.guessNumber),
                        wordMinusLetter
                    ],
                };

                return updatedState
            });
        },
        submitWord: () => {
            set((state) => {
                const currentGuess = state.guesses[state.guessNumber];
                if (!currentGuess || currentGuess.length === 0 || state.guesses[state.guessNumber].length !== 5 || state.guessNumber > 5) {
                    return state;
                }

                if (state.guesses[state.guessNumber] === state.answer) {
                    return {
                        guessNumber: state.guessNumber + 1,
                        completed: true,
                    };
                }
                return {
                    guessNumber: state.guessNumber + 1,
                };
            });
        },

        reset: () => {
            set(() => ({
                guesses: [],
                guessNumber: 0,
                completed: false,
            }));
        },
        setAnswer: (answer: string) => {
            set((state) => ({
                answer,
            }));
        },
    }
}));

const useGuesses = () => useGameStore((state) => state.guesses);
const useAnswer = () => useGameStore((state) => state.answer);
const useGuessNumber = () => useGameStore((state) => state.guessNumber);
const useCompleted = () => useGameStore((state) => state.completed);

const useStateActions = () => useGameStore((state) => state.actions);

export { useGuesses, useAnswer, useGuessNumber, useCompleted, useStateActions };