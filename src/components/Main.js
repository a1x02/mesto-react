import React from "react";
import profileAvatar from '../images/profile__avatar.jpg'
import {api} from '../utils/api.js'
import Card from "./Card";


function Main(props) {
    const [userName, setUserName] = React.useState('Жак-Ив Кусто')
    const [userDescription, setUserDescription] = React.useState('Исследователь океана')
    const [userAvatar, setUserAvatar] = React.useState(profileAvatar)
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getUserInfo()
            .then((response) => {
                setUserName(response.name)
                setUserDescription(response.about)
                setUserAvatar(response.avatar)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
            .then((response) => {
                setCards(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-edit" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt="аватар пользователя" />
                </button>
                <div className="profile-info">
                    <div className="profile__top">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={() => props.onCardClick(card)}
                        onDeleteCardClick={() => props.onDeleteCardClick(card)}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main