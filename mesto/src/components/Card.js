import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card)
    }

    return (
        <div className="element" key={props.card._id}>
            <img className="element__image"
                 src={props.card.link}
                 alt={props.card.name}
                 onClick={handleClick}
            />
            <div className="element__description">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like">
                    <button className="element__like-button" type="button"></button>
                    <h3 className="element__like-counter">{props.card.likes.length}</h3>
                </div>
                <button className="delete-button" type="button"></button>
            </div>
        </div>
    )
}

export default Card