import { createElement } from "../helper/createElement.js";
import { declOfNum } from "../helper/declOfNum.js";


// this function  creates section category and returns 2 methods and categoryList
export const createCategory = (parent) => {

    const category = createElement('section', {
        className: 'category section-offset'
    });

    const container = createElement('div', {
        className: 'container',
    });

    const categoryList = createElement('ul', {
        className: 'category__list',
    });

    //appending
    category.append(container);
    container.append(categoryList);

    //function that creates a card
    const createCategoryCard = (data) => {
        const item = createElement('li', {
            className: 'category__item',
        });
        item.dataset.id = data.id;

        const button = createElement('button', {
            className: 'category__card',
        });

        const buttonEdit = createElement('button', {
            className: 'category__btn category__edit',
            ariaLabel: 'редактировать'
        });

        const buttonDel = createElement('button', {
            className: 'category__btn category__del',
            ariaLabel: 'удалить'
        });

        const spanTitle = createElement('span', {
            className: 'category__title',
            textContent: data.title,
        });

        const spanPairs = createElement('span', {
            className: 'category__pairs',
            textContent: declOfNum(data.length, ['пара', 'пары', 'пар'])
        });
        
        //append

        button.append(spanTitle, spanPairs)
        item.append(button, buttonEdit, buttonDel);

        return item;
    };

    //function that creates many category-cards and appends them to categoryList
    const mount = (data) => {
        categoryList.textContent= '';
        parent.append(category);
        const cards = data.map(createCategoryCard);

        categoryList.append(...cards); //appending all cards at once via spread operators
    };

    //function that unmounts 
    const unmount = () => {
        category.remove();
    }

    return {mount, unmount, categoryList};
}
