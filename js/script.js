import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditcategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories } from "./service/api.service.js";

const initApp = async () => {
    const headerParent = document.querySelector('.header');
    const appElem = document.querySelector('#app');

    //function to display categories
     const renderIndex = async(event) => {
            event?.preventDefault();
            allSectionUnmount();

            //getting data
            const categories = await fetchCategories();
    
            if(categories.error) {
                app.append(createElement('p', {
                    className: 'server-error',
                    textContent: 'Ошибка сервера, попробуйте зайти позже'}));
                
                return;
            };
    
            //displaying category via mount method
            categoryObj.mount(categories)
    
    };

    
    //create header + add EventListeners
    const headerObj = createHeader(headerParent);

    headerObj.headerLogoLink.addEventListener('click', renderIndex);
    headerObj.headerBtn.addEventListener('click', () => {
        allSectionUnmount();
        headerObj.updateHeaderTitle('Новая категория');
        editCategoryObj.mount();
    })

    //creating category and getting 2 methods and category list as return
    const categoryObj = createCategory(app);

    //listens on what card user clicked
    categoryObj.categoryList.addEventListener('click', async ({target}) => {
        const categoryItem = target.closest('.category__item');

        if(!categoryItem) return;
        if(target.closest('.category__edit')) {
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();

            headerObj.updateHeaderTitle('Редактирование');
            editCategoryObj.mount(dataCards);
        }
    })

    //creating edit category table
    const editCategoryObj = createEditCategory(app);

    const allSectionUnmount = () => {
        [categoryObj, editCategoryObj].forEach(obj => obj.unmount());
    };

    //open card
    // const createPairsObj = createPairs(app);


    
    renderIndex();

};

initApp();