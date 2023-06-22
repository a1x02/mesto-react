import React from "react";

function PopupWithForm(props) {

    return (
        <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={`popup-${props.name}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name="popup-form" id={`form-${props.name}`} noValidate>
                    {props.children}
                    <button className="popup__save-button popup__save-button_inactive" type="submit">Сохранить</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;