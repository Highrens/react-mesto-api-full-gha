import logo from "../images/logo.svg";
import {LoggenInContext} from "../contexts/CurrentUserContext.js";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Header(props) {

  const loggenIn = React.useContext(LoggenInContext);

  function handleclick (){
     props.handleSignOut();
  }
  return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Сайта Mesto" />
        {!loggenIn ? <Link to={props.linkTo.link} className="header__button">{props.linkTo.name}</Link>
                  : <div className="header__email-container">
                      <h1 className="header__email">{props.email}</h1>
                      <button onClick={handleclick} className="header__button">Выйти</button> 
                    </div>}
      </header>
  );
}
