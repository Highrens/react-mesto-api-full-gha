import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleRegisterSubmit (e){
    e.preventDefault();
    props.HandleRegisterSubmit({password, email})
  }

  useEffect (()=>{
    props.handleHeaderLinkChange({
      name: 'Войти',
      link: '/sign-in'
    });
  }, [])

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form
        onSubmit={handleRegisterSubmit}
        className="popup__form"
        name={`popup_form_${props.name}`}
      >
        <input
          type="Email"
          id="register-email"
          placeholder="Email"
          name="Email"
          value={email || ''}
          className="register__input popup__text_type_element-src"
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          id="register-password"
          placeholder="Пароль"
          name="password"
          value={password || ''}
          className="register__input popup__text_type_element-src"
          onChange={handlePasswordChange}
          required
        />
        <button
          aria-label="подтвердить"
          type="submit"
          className="register__submit-button"
        >
          Зарегистироваться
        </button>
      </form>
      <h2 className="register__sign-in">Уже зарегистрированы? <Link to="/sign-in" className="register__sign-in">Войти</Link></h2>
    </div>
  );
}
