import React, { useEffect, useState } from "react";
import { PopupWithForm } from "./PopupWithForm.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <input
        id="name-input"
        placeholder="Имя"
        name="name"
        className="popup__text popup__text_type_name"
        value={name || " "}
        onChange={handleNameChange}
        required
        minLength={2}
        maxLength={40}
      />
      <span className="popup__text-error name-input-error" />
      <input
        id="about-input"
        placeholder="О себе"
        name="about"
        className="popup__text popup__text_type_about"
        value={description || " "}
        onChange={handleDescriptionChange}
        required
        minLength={2}
        maxLength={200}
      />
      <span className="popup__text-error about-input-error" />
    </PopupWithForm>
  );
}
