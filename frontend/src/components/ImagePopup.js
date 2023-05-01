export function ImagePopup(props) {
  return (
    <div
      className={`popup popup_image popup-image ${
        props.card.hasOwnProperty("_id") ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <button
          aria-label="Закрыть попап"
          className="popup__close popup-image-close"
          type="button"
          onClick={props.onClose}
        />
        <h2 className="popup__image-name" />
        {props.card.name}
        <h2 />
      </div>
    </div>
  );
}
