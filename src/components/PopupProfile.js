import PopupWithForm from './PopupWithForm'
import React from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'
import { useForm } from '../hooks/useForm'

function PopupProfile({ isOpen, onClose, onUpdateUser }) {
	const currentUser = React.useContext(CurrentUserContext)
	const { values, handleChange, setValues } = useForm({
		name: '',
		description: '',
	})

	React.useEffect(() => {
		setValues({
			name: currentUser.name,
			description: currentUser.about,
		})
	}, [currentUser])

	function handleSubmit(e) {
		e.preventDefault()
		onUpdateUser({
			name: values.name,
			description: values.description,
		})
	}

	return (
		<PopupWithForm
			name="profileForm"
			title="Редактировать профиль"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				placeholder={'Введите имя'}
				className="popup__input"
				id="profileName"
				name="name"
				required
				minLength="2"
				maxLength="40"
				value={values.name || ''}
				onChange={handleChange}
			/>
			<span className="popup__error profileName-error" />
			<input
				type="text"
				placeholder={'Введите описание'}
				className="popup__input"
				id="profileDescription"
				name="description"
				required
				minLength="2"
				maxLength="200"
				value={values.description || ''}
				onChange={handleChange}
			/>
			<span className="popup__error profileDescription-error" />
		</PopupWithForm>
	)
}

export default PopupProfile
