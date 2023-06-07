interface WordleSolution {
    today: string
}

export const fetchSolution = async () => {
    const url = 'https://wordle-answers-solutions.p.rapidapi.com/today';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '65cced1613msh269f44488f98d93p17057cjsn695e92bad64f',
            'X-RapidAPI-Host': 'wordle-answers-solutions.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = (await response.text())
        const solution = JSON.parse(result) as WordleSolution;
        return solution.today;
    } catch (error) {
        console.error(error);
    }
}