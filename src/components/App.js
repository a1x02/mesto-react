import '../index.css';
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api.js"
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [cards, setCards] = React.useState([])
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
    const [isPopupConfirmationOpen, setIsPopupConfirmationOpen] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState(null)
    if (currentUser) {
        console.log(currentUser.name)
    }

    React.useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo)
            })
            .catch((err) => console.log(err))
    }, [])

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsImagePopupOpen(true)
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((like) => like._id === currentUser._id)
        const method = isLiked ? api.deleteCardLike.bind(api) : api.putCardLike.bind(api)
        method(card._id)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)))
            })
            .catch((err) => console.log(err))
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

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id)
                setCards(newCards)
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateUser({name, about}) {
        api
            .patchUserInfo({name, about})
            .then((userData) => {
                setCurrentUser(userData)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function closeAllPopups() {
        setSelectedCard(null)
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsImagePopupOpen(false)
        setIsPopupConfirmationOpen(false)
    }

    if (!currentUser) {
        return null
    }

    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <Header/>
                <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    cards={cards}
                    setCards={setCards}
                    currentUser={currentUser}
                />
                <Footer/>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    name={currentUser.name}
                    about={currentUser.about}
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
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
