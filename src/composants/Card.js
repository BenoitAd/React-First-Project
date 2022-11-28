import CardImage from './CardImage';
import React, { useState } from 'react';
function Card(props) {
    const [show, setIsShown] = useState(false);

    function deckButton(event) {
        if (event.target.textContent === '+') {
            event.target.textContent = '✓';
            props.addCard(event.target);
        } else {
            event.target.textContent = '+';
            props.removeCard(event.target.id);
        }
    }

    return (
        <div className="rectangle">
            <h1 className="name">{props.name} </h1>
            <button
                id="deck"
                type="button"
                className="buttonAdd"
                onClick={deckButton}
            >
                +
            </button>
            <p className="mana"> ManaCost : {props.manaCost} </p>
            <div className="imgParent">
                <img className="image" src={props.url} alt={props.name}></img>
            </div>
            <h1 className="descriptionTitle"> Description : </h1>
            <p className="description"> {props.text} </p>
            <button
                type="button"
                className="button"
                onClick={() => setIsShown(true)}
            >
                Card Full Artwork
            </button>
            <CardImage
                onClose={() => setIsShown(false)}
                show={show}
                url={props.url}
                name={props.name}
            />
        </div>
    );
}

export default Card;
