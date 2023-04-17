function ImagePopup({ card, onClose }) {
	return (
		<section className={`popup ${card.link && 'popup_opened'}`} id="popupImage">
			<div className="popup__container-image">
				<button className="popup__close" type="button" id="imageClose" onClick={onClose}></button>
				<img className="popup__image" src={card.link} alt={card.name} />
				<p className="popup__text">{card.name}</p>
			</div>
		</section>
	)
}
export default ImagePopup
