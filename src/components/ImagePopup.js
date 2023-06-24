import React from "react";

function ImagePopup(props) {
    return (
        <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id="popup-image">
            <div className="popup__image-container">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <img className="popup__image"
                     src={props.card?.link} alt={props.card?.name}></img>
                <p className="popup__description">{props.card?.name}</p>
            </div>
        </section>
    )
}

export default ImagePopup