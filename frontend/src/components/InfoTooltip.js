import React from "react";

export function InfoTooltip(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          aria-label="Закрыть попап"
          className={`popup__close popup_close-${props.name}`}
          type="button"
          onClick={props.onClose}
        />
        <img
          className="infoTooltip__image"
          src={props.tip.image}
          alt="Info-image"
        />
        <h2 className="intoTooltip__heading">{props.tip.message}</h2>
      </div>
    </div>
  );
}
