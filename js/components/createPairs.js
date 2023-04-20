// import { createElement } from "../helper/createElement.js";

// export const createPairs = (parent) => {


//     const card = createElement('section', {
//         className: 'card section-offset',
//     });

//     const container = createElement('div', {
//         className: 'container card__container',
//     });

//     const buttonReturn = createElement('button', {
//         className: 'card__return',
//         ariaLabel: 'Возврат к категориям'
//     });

//     const buttonCardItem= createElement('button', {
//         className: 'card__item'
//     });  
//     const spanFront = createElement('span', {
//         className: 'card__front',
//         textContent: 'test front'
//     });
//     const spanBack = createElement('span', {
//         className: 'card__back',
//         textContent: 'test back'
//     });


//     card.append(container);
//     container.append(buttonReturn, buttonCardItem);
//     buttonCardItem.append(spanFront, spanBack);

     
//     const mount = (data = { pairs: []}) => {
     
//         const pairs = data.pairs.map(createPairs);


//         const emptyRow = createTrCell(['', '']);
//         tBody.append(...rows, emptyRow);

//         app.append(card)
//     };


//     return { mount, unmount };

// }