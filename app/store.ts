import { create } from "zustand";

export type GameProps = {
    guesses: string[][];
    answer: string[];
    guessNumber: number;
    completed: boolean;
    addLetter: (letter: string) => void;
    removeLetter: () => void;
    submitWord: () => void;
    reset: () => void;
    setAnswer: (answer: string[]) => void;
};

export const useGameStore = create<GameProps>((set) => ({
    guesses: [[]],
    answer: [],
    guessNumber: 0,
    completed: false,
    addLetter: (letter: string) => {
        set((state) => {
            const currentGuess = state.guesses[state.guessNumber];

            if (!currentGuess) {
                const newGuesses = [...state.guesses, [letter]];
                return {
                    guesses: newGuesses,
                }
            }

            if (currentGuess.length === 5) {
                return state;
            }
            return {
                guesses: [
                    ...state.guesses.slice(0, state.guessNumber),
                    [...currentGuess, letter],
                    ...state.guesses.slice(state.guessNumber + 1),
                ],
            };
        });
    },
    removeLetter: () => {
        set((state) => ({
            guesses: [
                ...state.guesses.slice(0, state.guessNumber),
                [...state.guesses[state.guessNumber].slice(0, -1)],
                ...state.guesses.slice(state.guessNumber + 1),
            ],
        }));
    },
    submitWord: () => {
        set((state) => {
            console.log(`state.guesses`, state.guesses, `guessNumber`, state.guessNumber, `current guess`, state.guesses[state.guessNumber])
            if (state.guesses[state.guessNumber].length !== 5 || state.guessNumber > 5) {
                return state;
            }

            if (state.guesses[state.guessNumber].join("") === state.answer.join("")) {
                return {
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
            guesses: [[]],
            guessNumber: 0,
            completed: false,
        }));
    },
    setAnswer: (answer: string[]) => {
        set(() => ({
            answer,
        }));
    },
}));