import '../index.css';
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
    const [isPopupConfirmationOpen, setIsPopupConfirmationOpen] = React.useState(false)

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsImagePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleDeleteCardClick(card) {
        setIsPopupConfirmationOpen(true)
    }

    function closeAllPopups() {
        setSelectedCard(null)
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsImagePopupOpen(false)
        setIsPopupConfirmationOpen(false)
    }

    return (
        <div className="App">
            <Header/>
            <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onDeleteCardClick={handleDeleteCardClick}
            />
            <Footer/>
            <PopupWithForm
                name="edit"
                title="Редактировать профиль"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                children={
                    <>
                        <label className="popup__label">
                            <input className="popup__input popup__input_subject_name" id="name-input" name="name"
                                   placeholder="Имя"
                                   required minLength="2" maxLength="40"></input>
                            <span className="popup__input-error name-input-error"></span>
                        </label>
                        <label className="popup__label">
                            <input className="popup__input popup__input_subject_description" id="description-input"
                                   name="description"
                                   placeholder="Вид деятельности" required minLength="2" maxLength="200"></input>
                            <span className="popup__input-error description-input-error"></span>
                        </label>
                        <button className="popup__save-button popup__save-button_inactive" type="submit">Сохранить</button>
                    </>
                }
            />
            <PopupWithForm
                name="add"
                title="Новое место"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                children={
                    <>
                        <label className="popup__label">
                            <input className="popup__input popup__input_subject_name" id="title-input"
                                   placeholder="Название"
                                   name="name" required minLength="2" maxLength="30"></input>
                            <span className="popup__input-error title-input-error"></span>
                        </label>
                        <label className="popup__label">
                            <input className="popup__input popup__input_subject_description" id="link-input"
                                   placeholder="Ссылка на картинку" name="description" type="url" required></input>
                            <span className="popup__input-error link-input-error"></span>
                        </label>
                        <button className="popup__save-button popup__save-button_inactive" type="submit">Сохранить</button>
                    </>
                }
            />
            <PopupWithForm
                name="avatar"
                title="Обновить аватар"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
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

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}
            />

            <PopupWithForm
                name="confirmation"
                title="Вы уверены?"
                isOpen={isPopupConfirmationOpen}
                onClose={closeAllPopups}
                children={
                    <>
                        <button type="submit" className="popup__save-button popup__save-button_delete-card">Да</button>
                    </>
                }
            />
        </div>
    );
}

export default App;
