import React from 'react'
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupProfile from './PopupProfile'
import PopupEdit from './PopupAddPlace'
import PopupAvatar from './PopupAvatar'
import ImagePopup from './ImagePopup'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { api } from '../utils/api'
import { ProtectedRoute } from './ProtectedRoute'
import Register from './Register'
import Login from './Login'
import * as auth from '../utils/Auth'
import InfoToolTip from './InfoToolTip'

function App() {
	const [isEditProfilePopup, setIsEditProfilePopup] = React.useState(false)
	const [isAddPlacePopup, setAddPlacePopup] = React.useState(false)
	const [isEditAvatarPopup, setEditAvatarPopup] = React.useState(false)
	const [isInfoToolTip, setInfoToolTip] = React.useState(false)
	const [selectedCard, setSelectedCard] = React.useState({})
	const [currentUser, setCurrentUser] = React.useState({})
	const [cards, setCards] = React.useState([])
	const [loggedIn, setLoggedIn] = React.useState(false)
	const [userEmail, setUserEmail] = React.useState('')
	const [status, setStatus] = React.useState(false)
	const navigate = useNavigate()
	const location = useLocation()

	React.useEffect(() => {
		Promise.all([api.getUserInfo(), api.getInitialsCards()])
			.then(([data, item]) => {
				setCurrentUser(data)
				setCards(item)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [loggedIn])

	function closeAllPopups() {
		setIsEditProfilePopup(false)
		setAddPlacePopup(false)
		setEditAvatarPopup(false)
		setInfoToolTip(false)
		setSelectedCard({})
	}

	const isOpen = isEditAvatarPopup || isEditProfilePopup || isAddPlacePopup || selectedCard.link || isInfoToolTip

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

	React.useEffect(() => {
		const jwt = localStorage.getItem('jwt')
		if (!jwt) {
			return
		}

		auth
			.getContent(jwt)
			.then((res) => {
				setUserEmail(res.data.email)
				setLoggedIn(true)
				const url = location?.state?.returnUrl || '/'
				navigate(url)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

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

	function handleRegister(email, password) {
		auth
			.register({ email, password })
			.then(() => {
				setInfoToolTip(true)
				setStatus(true)
				navigate('/sign-in')
			})
			.catch((err) => {
				console.log(err)
				setStatus(false)
				setInfoToolTip(true)
			})
	}

	function handleLogin(email, password) {
		auth
			.authorize({ email, password })
			.then((data) => {
				if (data.token) {
					localStorage.setItem('jwt', data.token)
				}
				setLoggedIn(true)
				setUserEmail(email)
				navigate('/')
			})
			.catch((err) => console.log(err))
	}

	function handleSignout() {
		localStorage.removeItem('jwt')
		setLoggedIn(false)
		navigate('/')
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="root">
				<div className="body">
					<Header handleSignout={handleSignout} loggedIn={loggedIn} userEmail={userEmail} />
					<Routes>
						<Route
							path="/"
							element={
								<ProtectedRoute
									component={Main}
									cards={cards}
									onProfilePopup={setIsEditProfilePopup}
									onEditPopup={setAddPlacePopup}
									onEditAvatarPopup={setEditAvatarPopup}
									onCardClick={setSelectedCard}
									onCardLike={handleCardLike}
									onCardDelete={handleCardDelete}
									loggedIn={loggedIn}
								/>
							}
						/>
						<Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
						<Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
						<Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
					</Routes>
					<Footer />
					<PopupProfile isOpen={isEditProfilePopup} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
					<PopupEdit isOpen={isAddPlacePopup} onClose={closeAllPopups} onEditPopup={handleAddPlace} />
					<PopupAvatar isOpen={isEditAvatarPopup} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
					<ImagePopup card={selectedCard} onClose={closeAllPopups} />
					<InfoToolTip isOpen={isInfoToolTip} onClose={closeAllPopups} status={status} />
				</div>
			</div>
		</CurrentUserContext.Provider>
	)
}

export default App
