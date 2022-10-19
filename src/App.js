import { useEffect, useState } from "react";
import "./App.sass";
import SingleCard from "./SingleCard/SingleCard";

const cardObjects = [
	{ src: "./img/flag1.svg", matched: false },
	{ src: "./img/flag2.svg", matched: false },
	{ src: "./img/flag3.svg", matched: false },
	{ src: "./img/flag4.svg", matched: false },
	{ src: "./img/flag5.svg", matched: false },
	{ src: "./img/flag6.svg", matched: false },
	{ src: "./img/flag7.svg", matched: false },
	{ src: "./img/flag8.svg", matched: false },
	{ src: "./img/flag9.svg", matched: false },
	{ src: "./img/flag10.svg", matched: false },
	{ src: "./img/flag11.svg", matched: false },
	{ src: "./img/flag12.svg", matched: false },
	{ src: "./img/flag13.svg", matched: false },
	{ src: "./img/flag14.svg", matched: false },
	{ src: "./img/flag15.svg", matched: false },
];

function App() {
	const [cards, setCards] = useState([]);
	const [tries, setTries] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false)

	const mixCards = () => {
		const mixedCards = [...cardObjects, ...cardObjects]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setCards(mixedCards);
		setTries(0);
		setChoiceOne(null)
		setChoiceTwo(null)
	};

	useEffect(()=>{mixCards()}, [])

	useEffect(()=>{
		if(choiceOne && choiceTwo){
			setDisabled(true)
			if(choiceOne.src === choiceTwo.src){
				setCards(prevCards => {
					return prevCards.map(card => {
						if (card.src === choiceOne.src){
							return {...card, matched: true}
						} else {
							return card
						}
					})
				})
				resetMove()
			
			} else{
				
				setTimeout(() => resetMove(), 1200)
			}
		}

	}, [choiceOne, choiceTwo])

	console.log(cards)

	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
		console.log(choiceOne, choiceTwo)
	};

const resetMove = () => {
	setChoiceOne(null);
	setChoiceTwo(null)
	setTries(prevTries => prevTries + 1)
	setDisabled(false)
}

	return (
		<div className="App">
			<h1 className="App__header">Memory game</h1>
			<button className="App__button" onClick={mixCards}>
				New game
			</button>
			<p className="tries-paragraph">Tries: {tries}</p>
			<div className="cards-grid">
				{cards.map((card) => (
					<SingleCard
						card={card}
						disabled={disabled}
						key={card.id}
						handleChoice={handleChoice}
						isflipped={card === choiceOne || card === choiceTwo || card.matched}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
