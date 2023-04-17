import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupProfile from './PopupProfile'
import PopupEdit from './PopupAddPlace'
import PopupAvatar from './PopupAvatar'
import ImagePopup from './ImagePopup'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { api } from '../utils/api'

function App() {
	const [isEditProfilePopup, setIsEditProfilePopup] = React.useState(false)
	const [isAddPlacePopup, setAddPlacePopup] = React.useState(false)
	const [isEditAvatarPopup, setEditAvatarPopup] = React.useState(false)
	const [selectedCard, setSelectedCard] = React.useState({})
	const [currentUser, setCurrentUser] = React.useState({})
	const [cards, setCards] = React.useState([])

	React.useEffect(() => {
		Promise.all([api.getUserInfo(), api.getInitialsCards()])
			.then(([data, item]) => {
				setCurrentUser(data)
				setCards(item)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	function closeAllPopups() {
		setIsEditProfilePopup(false)
		setAddPlacePopup(false)
		setEditAvatarPopup(false)
		setSelectedCard({})
	}

	const isOpen = isEditAvatarPopup || isEditProfilePopup || isAddPlacePopup || selectedCard.link

	React.useEffect(() => {
		function closeByEscape(e) {
			if (e.key === 'Escape') {
				closeAllPopups()
			}
		}
		if (isOpen) {
			document.addEventListener('keydown', closeByEscape)
			return () => {
				document.removeEventListener('keydown', closeByEscape)
			}
		}
	}, [isOpen])

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === currentUser._id)

		api
			.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
			})
			.catch((err) => {
				console.log(err)
			})
	}

	function handleCardDelete(card) {
		api
			.deleteCard(card._id)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== card._id))
			})
			.catch((err) => console.log(err))
	}

	function handleUpdateUser(data) {
		api
			.setUserInfo(data)
			.then((data) => {
				setCurrentUser(data)
				closeAllPopups()
			})
			.catch((err) => console.log(err))
	}

	function handleUpdateAvatar(data) {
		api
			.setAvatar(data)
			.then((data) => {
				setCurrentUser(data)
				closeAllPopups()
			})
			.catch((err) => console.log(err))
	}

	function handleAddPlace(card) {
		api
			.addCard(card)
			.then((newCard) => {
				setCards([newCard, ...cards])
				closeAllPopups()
			})
			.catch((err) => console.log(err))
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="root">
				<div className="body">
					<Header />
					<Main
						cards={cards}
						onProfilePopup={setIsEditProfilePopup}
						onEditPopup={setAddPlacePopup}
						onEditAvatarPopup={setEditAvatarPopup}
						onCardClick={setSelectedCard}
						onCardLike={handleCardLike}
						onCardDelete={handleCardDelete}
					/>
					<Footer />
					<PopupProfile isOpen={isEditProfilePopup} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
					<PopupEdit isOpen={isAddPlacePopup} onClose={closeAllPopups} onEditPopup={handleAddPlace} />
					<PopupAvatar isOpen={isEditAvatarPopup} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
					<ImagePopup card={selectedCard} onClose={closeAllPopups} />
				</div>
			</div>
		</CurrentUserContext.Provider>
	)
}

export default App
