import { type ChangeEvent, type FormEvent,useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import { Helmet } from '@dr.pogodin/react-helmet';

import { loginAction } from '@src/store/api-actions';
import { useAppDispatch } from '@src/hooks';

import { AppRoute, INVALID_LOGIN_MESSAGE, INVALID_PASSWORD_MESSAGE, VALID_PASSWORD_REGEX } from '@src/const';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [isValidLogin, setIsValidLogin] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!isValidLogin) {
      toast.warn(INVALID_LOGIN_MESSAGE);
    }

    if (!isValidPassword) {
      toast.warn(INVALID_PASSWORD_MESSAGE);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current === null || passwordRef.current === null) {
      return;
    }

    dispatch(loginAction({
      login: loginRef.current.value,
      password: passwordRef.current.value
    }));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    switch (evt.target.name) {
      case 'user-mail-1':
        setIsValidLogin(true);
        if (loginRef.current === null || loginRef.current.value === '') {
          setIsValidLogin(false);
        } else {
          if (!isEmail(loginRef.current.value)) {
            setIsValidLogin(false);
          }
        }
        break;
      case 'user-password-1':
        setIsValidPassword(true);
        if (passwordRef.current === null || passwordRef.current.value === '') {
          setIsValidPassword(false);
        } else {
          if (!VALID_PASSWORD_REGEX.test(String(passwordRef.current.value))){
            setIsValidPassword(false);
          }
        }
    }
  };

  return (
    <>
      <Helmet>
        <title>Кондитерская Кекс - Авторизация</title>
      </Helmet>

      <div className="wrapper">
        <main>
          <section className="login-page">
            <div className="login-page__header">
              <div className="login-page__img-wrap">
                <img className="login-page__img" src="img/svg/hero-keks.svg" width="727" height="569" alt="Картинка кота." />
              </div>
            </div>
            <div className="login-page__content">
              <div className="login-page__inner">
                <h1 className="login-page__title">Вход</h1>
                <div className="login-page__form">
                  <form action="#" method="post" onSubmit={handleSubmit}>
                    <div className="login-page__fields">

                      <div className={`custom-input login-page__field 
                        ${isValidLogin ? 'is-valid' : ''} ${!isValidLogin ? 'is-invalid' : ''} `}
                      >
                        <label>
                          <span className="custom-input__label">Введите вашу почту</span>
                          <input ref={loginRef} onChange={handleInputChange} type="email" name="user-mail-1" placeholder="Почта" required />
                        </label>
                      </div>

                      <div className={`custom-input login-page__field 
                        ${isValidPassword ? 'is-valid' : ''} ${!isValidPassword ? 'is-invalid' : ''} `}
                      >
                        <label>
                          <span className="custom-input__label">Введите ваш пароль</span>
                          <input ref={passwordRef} onChange={handleInputChange} type="password" name="user-password-1" placeholder="Пароль" required />
                        </label>
                      </div>
                    </div>

                    <button className="btn login-page__btn btn--large" type="submit" onClick={handleClick}>
                    Войти
                    </button>
                  </form>
                </div>
                <p className="login-page__text-wrap">Ещё не зарегистрированы? <Link to={AppRoute.Register} className="login-page__link">Создайте</Link> аккаунт прямо сейчас.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default LoginScreen;
