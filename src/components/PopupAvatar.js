import PopupWithForm from './PopupWithForm'
import React from 'react'

function PopupAvatar({ isOpen, onClose, onUpdateAvatar }) {
	const ref = React.useRef()

	function handleSubmit(e) {
		e.preventDefault()
		onUpdateAvatar({
			avatar: ref.current.value,
		})
	}

	return (
		<PopupWithForm
			name={'avatarForm'}
			title={'Обновить аватар'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				type="url"
				placeholder={'Ссылка на картинку'}
				className="popup__input"
				name="avatar"
				id="avatarImage"
				required
				ref={ref}
			/>
			<span className="popup__error avatarImage-error" />
		</PopupWithForm>
	)
}

export default PopupAvatar
