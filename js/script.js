import { createCategory } from "./components/createCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";
import { fetchCategories } from "./service/api.service.js";

const initApp = async () => {
    const headerParent = document.querySelector('.header');
    const appElem = document.querySelector('#app');

    //create header + add EventListeners
    const headerObj = createHeader(headerParent);

    //function to display categories
     const returnIndex = async(event) => {
            event?.preventDefault();
            
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

    headerObj.headerLogoLink.addEventListener('click', returnIndex);
    headerObj.headerBtn.addEventListener('click', () => {
        categoryObj.unmount(); //delete if any categories displayed
        headerObj.updateHeaderTitle('Новая категория');
    })


    //creating category and getting 2 methods and category list as return
    const categoryObj = createCategory(app);
    
    returnIndex()

};

initApp();