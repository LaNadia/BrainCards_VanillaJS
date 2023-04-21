import { createElement } from "../helper/createElement.js";
import { showAlert } from "./showAlert.js";
import { snuffleCards } from "../helper/shuffleCards.js";

export const createPairs = (parent) => {


    const pairs = createElement('section', {
        className: 'card section-offset',
    });

    const container = createElement('div', {
        className: 'container card__container',
    });

    const buttonReturn = createElement('button', {
        className: 'card__return',
        ariaLabel: 'Возврат к категориям'
    });
    const buttonCard = createElement('button', {
        className: 'card__item'
    });  
    const spanFront = createElement('span', {
        className: 'card__front',
    });
    const spanBack = createElement('span', {
        className: 'card__back',
    });


    pairs.append(container);
    container.append(buttonReturn, buttonCard);
    buttonCard.append(spanFront, spanBack);

    let dataCards = [];

    //rotation function
    const flipCard = () => {
        buttonCard.classList.add('card__item_flipped');
        buttonCard.removeEventListener('click', flipCard)
        setTimeout(() => {
            buttonCard.classList.remove('card__item_flipped');

            setTimeout(()=> {
                buttonCard.index++;
                if(buttonCard.index == dataCards.length) {
                    spanFront.textContent = 'Well done! You reached the end!'
                    showAlert('Going back to the cards...')
                    setTimeout(()=> {
                        buttonReturn.click()
                    }, 2000)
                    return;
                };

                spanFront.textContent = dataCards[buttonCard.index][0];
                spanBack.textContent = dataCards[buttonCard.index][1];
                setTimeout( () => {
                    buttonCard.addEventListener('click', flipCard)
                }, 200);
            }, 100)
        },1000)
    };

    //rotation controller

    const cardController = data => {
        dataCards=[...data];
        buttonCard.index = 0;
        spanFront.textContent = data[buttonCard.index][0];
        spanBack.textContent = data[buttonCard.index][1];

        buttonCard.addEventListener('click', flipCard)
    }

    const mount = data => {
        parent.append(pairs);

        let snuffled = snuffleCards(data.pairs);
        cardController(snuffled);
    };

    const unmount = () => {
        buttonCard.removeEventListener('click', flipCard)
        pairs.remove()
    }

    return { mount, unmount, buttonReturn };
}