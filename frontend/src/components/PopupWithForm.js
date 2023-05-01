export function PopupWithForm(props) {
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
        <h2 className="popup__heading">{props.title}</h2>
        <form
          onSubmit={props.onSubmit}
          className="popup__form"
          name={`popup_form_${props.name}`}
        >
          {props.children}
          <button
            aria-label="подтвердить"
            type="submit"
            className="popup__submit-button"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
