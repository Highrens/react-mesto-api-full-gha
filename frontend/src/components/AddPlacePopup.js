import React, { useState, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm.js";

import { currentUserContext } from "../contexts/CurrentUserContext.js";

export function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setlink] = useState("");
  useEffect(() => {
    setName("");
    setlink("");
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handlelinkChange(e) {
    setlink(e.target.value);
  }
  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onAddPlace({ name, link });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="add-element"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
      buttonText={'Сохранить'}
    >
      <input
        id="new-element-name"
        placeholder="Название"
        name="name"
        className="popup__text popup__text_type_element-name"
        value={name}
        onChange={handleNameChange}
        required
        minLength={2}
        maxLength={30}
      />
      <span className="popup__text-error new-element-name-error" />
      <input
        type="url"
        id="new-element-src"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__text popup__text_type_element-src"
        value={link}
        onChange={handlelinkChange}
        required
      />
      <span className="popup__text-error new-element-src-error" />
    </PopupWithForm>
  );
}
