import CardImage from './CardImage';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, removeCard } from '../store/Redux'

function Card(props) {
    const [show, setIsShown] = useState(false);
    const [isChecked, setIsChecked] = useState(props.isChecked);
    const [addButton,setAddButton] = useState("");

    const dispatch = useDispatch();

    const userDeckState = useSelector((state) => state.UserDeck);

    useEffect(() => {
        let includeId = userDeckState.find((card)=>card.id === props.id)
        if(includeId) {
            setIsChecked(true);
        }
        if(!!isChecked){
            setAddButton('✓');
        } else {
            setAddButton('+')
        }
     });


    function deckButton(event) {
        if (!isChecked) {
            setIsChecked(true);
            dispatch(
                addCard({id:props.id, name:props.name, manaCost:props.manaCost, url:props.url, text:props.text, isChecked:true})
            );
        } else {
            if(event.target.baseURI.includes("UserDeck")){
                dispatch(
                    removeCard(props.id)
                );
            } else { // evite bug de synchronicité
                setIsChecked(false);
                dispatch(
                    removeCard(props.id)
                );
            }
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
                {addButton}
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
