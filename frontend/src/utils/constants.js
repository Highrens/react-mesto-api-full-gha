export const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_anacvite',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__error_visible'
  }; 

export const cardListSection = ".elements";
export const elementTemplateSelector = ".card-template";

//Инпуты
export const popupNameInput = document.querySelector('.popup__text_type_name');
export const popupAboutInput = document.querySelector('.popup__text_type_about');
//Кнопки
export const popupAddElementButton = document.querySelector(".profile__add-button"); 
export const popupAvatarButton = document.querySelector('.profile__edit-image');
export const popupProfileButton = document.querySelector(".profile__edit-button");
// Формы
export const popupAddElementForm = document.querySelector("[name=add-element-form]"); 
export const popupProfileForm = document.querySelector("[name=profile-edit-form]");  
export const popupAvatarForm = document.querySelector("[name=popup-new-profile-form]"); 
