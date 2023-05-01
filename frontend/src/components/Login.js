import React, { useEffect, useState } from "react";

export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleLogin(e){
    e.preventDefault();
    props.HandleLoginSubmit({password, email});
  }
  useEffect (()=>{
    props.handleHeaderLinkChange({
      name: 'Зарегистироваться',
      link: '/sign-up'
    });
  }, [])

  
  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
      <form
        onSubmit={handleLogin}
        className="popup__form"
        name={`popup_form_${props.name}`}
      >
        <input
          type="Email"
          id="login-email"
          placeholder="Email"
          name="Email"
          value={email || ''}
          className="register__input popup__text_type_element-src"
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          id="login-password"
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
          Войти
        </button>
      </form>
    </div>
  );
}
