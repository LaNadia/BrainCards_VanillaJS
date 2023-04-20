import { createElement } from "../helper/createElement.js";

export const createHeader = (parent) => {

   const container = createElement('div', {
    className: 'container header__container',
   });

   const headerLogoLink = createElement('a', {
    href: '#',
    className: "header__logo-link",
   });

   const logo = createElement('img',
   {
    src: 'img/logo.svg',
    className:'header__logo',
    alt: 'Логотип',
   });

   const headerTitle = createElement('h2',
   {
    className: 'header__subtitle',
    textContent: 'Категории'
   });

   const headerBtn = createElement('button',
   {
    className: 'header__btn',
    textContent: 'Добавить категорию'
   })

   parent.append(container);
   headerLogoLink.append(logo);
   container.append(headerLogoLink, headerTitle, headerBtn);

   const updateHeaderTitle = title => {
    headerTitle.textContent = title;
   };

   return { 
    headerLogoLink, headerBtn, updateHeaderTitle
   };
}
