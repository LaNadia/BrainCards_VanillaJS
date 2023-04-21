import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditcategory.js";
import { createHeader } from "./components/createHeader.js";
import { createPairs } from "./components/createPairs.js";
import { showAlert } from "./components/showAlert.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories, fetchCreateCategory, fetchDeleteCategory, fetchEditCategory } from "./service/api.service.js";

const initApp = async () => {
    const headerParent = document.querySelector('.header');
    const appElem = document.querySelector('#app');

    //function to display categories
     const renderIndex = async(event) => {
            event?.preventDefault();
            allSectionUnmount();

            //getting data
            const categories = await fetchCategories();
            headerObj.updateHeaderTitle('Категории');
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
        editCategoryObj.btnSave.addEventListener('click', postHandler)
        editCategoryObj.btnSave.removeEventListener('click', patchHandler)
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
            editCategoryObj.btnSave.addEventListener('click', patchHandler)
            editCategoryObj.btnSave.removeEventListener('click', postHandler)
            
            return;
        };

        if(target.closest('.category__del')) {
            if(confirm('Удалить категорию?')) {
               const result = fetchDeleteCategory(categoryItem.dataset.id);
                if(result.error) {
                    showAlert(result.error.message);
                    return;
                };

                showAlert('Категория удалена');
                categoryItem.remove()
            }
            return; 
        };

        if(categoryItem) {
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();
            headerObj.updateHeaderTitle(dataCards.title);
            pairsObj.mount(dataCards)
        }
    });

    //creating edit category table
    const editCategoryObj = createEditCategory(app);

    const allSectionUnmount = () => {
        [categoryObj, editCategoryObj, pairsObj].forEach(obj => obj.unmount());
    };

    //open card
    const pairsObj = createPairs(app);

    //making buttonreturn work
    pairsObj.buttonReturn.addEventListener('click', renderIndex);

    const postHandler = async () => {
        const data = editCategoryObj.parseData();
        const dataCategories = await fetchCreateCategory(data);
        if(dataCategories.error) {showAlert(dataCategories.error.message); return;}
        showAlert("Новая категория была успешно добавлена");
        allSectionUnmount();
        headerObj.updateHeaderTitle('Категории');
        categoryObj.mount(dataCategories);
    };

    const patchHandler = async () => {
        const data = editCategoryObj.parseData();
        const dataCategories = await fetchEditCategory(editCategoryObj.btnSave.dataset.id, data);
        if(dataCategories.error) {showAlert(dataCategories.error.message); return;}
        showAlert("Категория была успешно обновлена");
        allSectionUnmount();
        headerObj.updateHeaderTitle('Категории');
        categoryObj.mount(dataCategories);
    }

    renderIndex();

};

initApp();