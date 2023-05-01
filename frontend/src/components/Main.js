import { computeHeadingLevel } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { api } from "../utils/Api";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile" aria-label="профиль">
        <div className="profile__column">
          <button
            className="profile__edit-image"
            onClick={props.onEditAvatar}
          />
          <img
            src={`${currentUser.avatar}`}
            alt="Изоображение профиля"
            className="profile__image"
          />
          <div className="profile__info">
            <div className="profile__item">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                aria-label="Редактировать профиль"
                type="button"
                className="profile__edit-button"
                onClick={props.onEditProfile}
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          aria-label="Добавить место"
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="photos" aria-label="Места">
        <ul className="elements">
          {props.cards.map((data, i) => (
            <Card
              key={data._id}
              data={data}
              onCardClick={props.handleCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
