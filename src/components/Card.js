import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
	const currentUser = React.useContext(CurrentUserContext)
	const isOwn = card.owner._id === currentUser._id
	const isLiked = card.likes.some((i) => i._id === currentUser._id)
	const cardLikeButtonClassName = `elements__like__button ${isLiked && 'elements__like__button_active'}`

	function handleClick() {
		onCardClick(card)
	}

	function handleLikeClick() {
		onCardLike(card)
	}

	function handleDeleteCard() {
		onCardDelete(card)
	}

	return (
		<div className="elements__card">
			{isOwn && <button className="elements__trash" type="button" onClick={handleDeleteCard}></button>}
			<img className="elements__image" src={card.link} alt={card.name} onClick={handleClick} />
			<div className="elements__header">
				<h2 className="elements__title">{card.name}</h2>
				<div className="elements__like">
					<button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
					<p className="elements__like__count">{card.likes.length}</p>
				</div>
			</div>
		</div>
	)
}

export default Card
