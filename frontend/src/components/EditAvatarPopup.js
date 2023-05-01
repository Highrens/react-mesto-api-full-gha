import React, { useRef, useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm.js";

export function EditAvatarPopup(props) {
  const inputRef = useRef("");

  useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="new-profile-image"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <input
        type="url"
        id="new-profile-image"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__text popup__text_type_element-src"
        ref={inputRef}
        required
      />
      <span className="popup__text-error new-profile-image-error" />
    </PopupWithForm>
  );
}
