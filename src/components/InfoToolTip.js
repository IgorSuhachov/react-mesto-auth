import union from '../images/Union.svg'
import union1 from '../images/Union1.svg'

export default function InfoToolTip({ isOpen, name, onClose, status }) {
	return (
		<section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button className="popup__close" type="button" onClick={onClose}></button>
				<form className="popup__form" name={`${name}-form`}>
					<img className="popup__tooltip__image" src={status ? union : union1} alt="успех" />
					<p className="popup__tooltip__text">
						{status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
					</p>
				</form>
			</div>
		</section>
	)
}
