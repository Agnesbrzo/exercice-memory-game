import './SingleCard.sass'

export default function SingleCard({card, handleChoice, isflipped, disabled}) {

const handleClick = () => {
	if (disabled === false){
		handleChoice(card)
	}
}

	return (
		<div className="cards-grid__card">
			<div className={isflipped ? "cards-grid__flipped" : ""}>
				<img
					className="cards-grid__card--front"
					src={card.src}
					alt="card front"
				/>
				<img
					className="cards-grid__card--back"
					src="./img/backOfCard.jpg"
					alt="card back"
					onClick={handleClick}
				/>
			</div>
					</div>
	)
}
