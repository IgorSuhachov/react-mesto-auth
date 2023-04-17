import PopupWithForm from './PopupWithForm'
import React from 'react'
import { useForm } from '../hooks/useForm'

function PopupEdit({ isOpen, onClose, onEditPopup }) {
	const { values, handleChange } = useForm({
		title: '',
		link: '',
	})

	function handleSubmit(e) {
		e.preventDefault()

		onEditPopup({
			title: values.title,
			link: values.link,
		})
	}

	return (
		<PopupWithForm name={'cardForm'} title={'Новое место'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder={'Название'}
				className="popup__input"
				name="title"
				id="elementTitle"
				required
				minLength="2"
				maxLength="30"
				value={values.title}
				onChange={handleChange}
			/>
			<span className="popup__error elementTitle-error" />
			<input
				type="url"
				placeholder={'Ссылка на картинку'}
				className="popup__input"
				name="link"
				id="elementImage"
				required
				value={values.link}
				onChange={handleChange}
			/>
			<span className="popup__error elementImage-error" />
		</PopupWithForm>
	)
}

export default PopupEdit
