import { useGuessNumber } from "../store";
import LetterBox from "./LetterBox";

export const LetterRow = ({ row }: { row: number }) => {
	const letters = new Array<string>(5).fill(" ");
	const guessNumber = useGuessNumber();

	return (
		<div className="my-1 flex flex-row justify-center gap-1">
			{letters.map((_element, i) => (
				<LetterBox
					submitted={row < guessNumber}
					index={{ row, column: i }}
					key={i}
				/>
			))}
		</div>
	);
};

