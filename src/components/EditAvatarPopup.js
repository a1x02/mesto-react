import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditAvatarPopup(props) {

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            children={
                <>
                    <input className="popup__input popup__input_subject_avatar" name="input-avatar"
                           id="avatar-input" type="url"
                           placeholder="Ссылка на аватар" required value=""></input>
                    <span className="popup__input-error avatar-input-error"></span>
                    <button className="popup__save-button popup__save-button_inactive" type="submit">Сохранить</button>
                </>
            }
        />
    )
}

export default EditAvatarPopup