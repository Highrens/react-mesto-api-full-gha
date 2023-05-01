import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Main } from "./Main.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { ImagePopup } from "./ImagePopup.js";
import { api } from "../utils/Api";
import {
  CurrentUserContext,
  LoggenInContext,
} from "../contexts/CurrentUserContext.js";
import { EditProfilePopup } from "./EditProfilePopup.js";
import { EditAvatarPopup } from "./EditAvatarPopup.js";
import { AddPlacePopup } from "./AddPlacePopup.js";
import { Register } from "./Register.js";
import { Login } from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { InfoTooltip } from "./InfoTooltip.js";
import { register, login, checkToken } from "../utils/Auth.js";

import done from "../images/done.svg";
import error from "../images/error.svg";

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loggenIn, setLoggenIn] = useState(false);
  const [email, setEmail] = useState("unknow@mail.com");
  const [cards, setCards] = useState([]);
  const [tip, setTip] = useState({
    image: error,
    message: "Вы не должны это видеть",
  });
  const [headerLinkTo, setHeaderLinkTo] = useState({
    name: "Зарегистироваться",
    link: "/sign-up",
  });

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((data) => console.log(data));

    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);       
        setEmail(data.email);
      })
      .catch((data) => console.log(data));

    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      checkToken(token)
        .then((res) => {
          if (res) {
            setLoggenIn(true);
            setEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((data) => console.log(data));
    }
  }, []);

  //popups
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }
  //Cards
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked) {
      api
        .takeLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((data) => console.log(data));
    } else {
      api
        .setLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((data) => console.log(data));
    }
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((data) => {
        setCards((prevState) =>
          prevState.filter((cards) => cards._id !== card._id)
        );
      })
      .catch((data) => console.log(data));
  }
  function handleAddPlace(newCard) {
    api
      .postNewCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((data) => console.log(data));
  }
  //User
  function handleUpdateUser(data) {
    api
      .updateUserInfo(data.name, data.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((data) => console.log(data));
  }
  function handleUpdateAvatar(link) {
    api
      .updateUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((data) => console.log(data));
  }
  //Header Link and Register/Auth/Login
  function handleHeaderLinkChange(linkTo) {
    setHeaderLinkTo({
      name: linkTo.name,
      link: linkTo.link,
    });
  }
  function handleRegisterSubmit({ password, email }) {
    register(password, email)
      .then((res) => {
        setTip({ image: done, message: "Вы успешно зарегистрировались!" });
      })
      .catch((err) => {
        setTip({
          image: error,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally((res) => {
        setIsInfoTooltipOpen(true);
      });
  }
  function handleLoginSubmit({ password, email }) {
    login(password, email)
      .then((res) => {
        if (res) {
          setLoggenIn(true);
          setEmail(email);
          localStorage.setItem("token", res.token);
          navigate("/", { replace: true });
          console.log(res);
          setCurrentUser(res);
        }
      }).then(
        api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
      )
      .catch((data) => console.log(data));
  }
  function handleSignOut() {
    setLoggenIn(false);
    localStorage.removeItem("token");
    navigate("/sing-in", { replace: true });
  }
  return (
    <div className="body">
      <CurrentUserContext.Provider value={currentUser}>
        <LoggenInContext.Provider value={loggenIn}>
          <Header
            linkTo={headerLinkTo}
            email={email}
            handleSignOut={handleSignOut}
          />
          <Routes>
            <Route
              path="/"
              element={
                loggenIn ? (
                  <ProtectedRoute
                    element={Main}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    cards={cards}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                    loggedIn={loggenIn}
                  />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />

            <Route
              path="/sign-up"
              element={
                <Register
                  handleHeaderLinkChange={handleHeaderLinkChange}
                  HandleRegisterSubmit={handleRegisterSubmit}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                loggenIn ? (<Navigate to="/" replace />) : (<Login
                  handleHeaderLinkChange={handleHeaderLinkChange}
                  HandleLoginSubmit={handleLoginSubmit}
                />)
                
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />

          {/* Popus */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            name={"tooltip"}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            tip={tip}
          />
        </LoggenInContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
