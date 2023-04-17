import Card from './Card'
import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main({ cards, onEditAvatarPopup, onProfilePopup, onEditPopup, onCardClick, onCardLike, onCardDelete }) {
	const currentUser = React.useContext(CurrentUserContext)

	return (
		<main>
			<section className="profile">
				<img alt="аватар" className="profile__avatar" src={currentUser.avatar} />
				<button
					className="profile__edit-avatar"
					type="button"
					onClick={() => {
						onEditAvatarPopup(true)
					}}
				></button>
				<div className="profile__info">
					<div className="profile__container">
						<h1 className="profile__name">{currentUser.name}</h1>
						<button
							className="profile__edit"
							type="button"
							onClick={() => {
								onProfilePopup(true)
							}}
						></button>
					</div>
					<p className="profile__description">{currentUser.about}</p>
				</div>
				<button
					className="profile__add"
					type="button"
					onClick={() => {
						onEditPopup(true)
					}}
				></button>
			</section>
			<section className="elements">
				{cards.map((card) => (
					<Card
						key={card._id}
						card={card}
						onCardClick={onCardClick}
						onCardLike={onCardLike}
						onCardDelete={onCardDelete}
					/>
				))}
			</section>
		</main>
	)
}

export default Main
