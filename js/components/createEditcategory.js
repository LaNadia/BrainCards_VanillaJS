import { createElement } from "../helper/createElement.js";


const TITLE = 'Введите название категории';

export const createEditCategory = (parent) => {

    const editCategory = createElement('section', {
        className: 'edit section-offset',
    });

    const container = createElement('div', {
        className: 'container edit__container',
    });

    const title = createElement('h2', {
        className: 'edit__title',
        contentEditable: true,
        title: 'Можно редактировать',
    });
    
    const table = createElement('table', {
        className: 'edit__table table',
    });

    const thead = createElement('thead');

    const trThead = createElement('tr');

    const thThedOne = createElement('th', {
        className: 'table__cell',
        textContent: 'main'
    });
    const thThedTwo = createElement('th', {
        className: 'table__cell',
        textContent: 'second'
    });
    const thThedThree = createElement('th', {
        className: 'table__cell'
    });

    const tBody = createElement('tbody');

    const btnWrapper = createElement('div', {
        className: 'edit__btn-wrapper'
    });
    const btnAddRow = createElement('button', {
        className: 'edit__btn edit__add-row',
        textContent: 'Добавить пару'
    });
    const btnSave = createElement('button', {
        className: 'edit__btn edit__save',
        textContent: 'Сохранить категорию'
    });
    const btnCancel = createElement('button', {
        className: 'edit__btn edit__cancel',
        textContent: 'Отмена'
    });


    //creating tr

    const createTrCell = (dataArr) => {
        const tr = createElement('tr');

        const thThedOne = createElement('th', {
            className: 'table__cell table__cell_one',
            textContent: dataArr[0],
            contentEditable: true,
        });
        const thThedTwo = createElement('th', {
            className: 'table__cell table__cell_two',
            textContent: dataArr[1],
            contentEditable: true,
        });
        const thThedThree = createElement('th', {
            className: 'table__cell'
        });
        const delRow = createElement('button', {
            className: 'table__del',
            textContent: 'x'
        });
    
        delRow.addEventListener('click', ()=> {
            if(confirm('Удалить строку?')) tr.remove();
        });

        thThedThree.append(delRow);
        tr.append(thThedOne, thThedTwo, thThedThree);

        return tr;
    }
   
    editCategory.append(container);
    table.append(thead, tBody);
    thead.append(trThead);
    trThead.append(thThedOne, thThedTwo, thThedThree);
    btnWrapper.append(btnAddRow, btnSave, btnCancel);
    container.append(title, table, btnWrapper);


    const clearTitle = () => {
        if(title.textContent === TITLE){
            title.textContent = '';
        }
    };

    const checkTitle = () => {
        if(title.textContent === ''){
            title.textContent = TITLE;
        }
    };

    title.addEventListener('focus', clearTitle);
    title.addEventListener('blur', checkTitle)


    btnAddRow.addEventListener('click', () => {
        const emptyRow = createTrCell(['', '']);

        tBody.append(emptyRow)
    })

    
    const mount = (data = { title: TITLE, pairs: []}) => {
        tBody.textContent = '';
        title.textContent = data.title;

        if(title.textContent === TITLE) {
            title.classList.add('edit__title_change')
        } else {
            title.classList.remove('edit__title_change') 
        };

        const rows = data.pairs.map(createTrCell);
        const emptyRow = createTrCell(['', '']);
        tBody.append(...rows, emptyRow);

        app.append(editCategory)
    };

    const unmount = () => {
        editCategory.remove()
    };


    return {mount, unmount, }
}

