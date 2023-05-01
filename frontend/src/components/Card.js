import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import React, { useEffect, useState } from "react";

export function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.data.owner._id === currentUser._id;
  const isLiked = props.data.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.data);
  }

  function handleLikeClick() {
    props.onCardLike(props.data);
  }
  function handleCardDelete() {
    props.onCardDelete(props.data);
  }
  return (
    <li className="element">
      {isOwn && (
        <button
          aria-label="Удалить элемент"
          className="element__delete"
          type="button"
          onClick={handleCardDelete}
        />
      )}
      <button
        aria-label="увеличить изоображение"
        className="element__image"
        type="button"
        style={{ backgroundImage: `url(${props.data.link})` }}
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__name">{props.data.name}</h2>
        <div className="like-container">
          <button
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          />
          <p className="likes-count">{props.data.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
