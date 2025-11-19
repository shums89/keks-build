import { type FormEvent,useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';

import { loginAction } from '@src/store/api-actions';
import { useAppDispatch } from '@src/hooks';

import { AppRoute, INVALID_LOGIN_MESSAGE, INVALID_PASSWORD_MESSAGE, VALID_PASSWORD_REGEX } from '@src/const';

const LoginScreen = () => {
  const dispatch = useAppDispatch();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);


  const handleClick = () => {
    if (loginRef.current === null || loginRef.current.value === '') {
      toast.warn('Введите вашу почту');
    } else {
      if (!isEmail(loginRef.current.value)) {
        toast.warn(INVALID_LOGIN_MESSAGE);
        return;
      }
    }

    if (passwordRef.current === null || passwordRef.current.value === '') {
      toast.warn('Введите ваш пароль');
    } else {
      const password = String(passwordRef.current.value);

      if (/\s/.test(password) && !password.match(VALID_PASSWORD_REGEX)) {
        toast.warn(INVALID_PASSWORD_MESSAGE);
      }
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

  return (
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
                    <div className="custom-input login-page__field">
                      <label>
                        <span className="custom-input__label">Введите вашу почту</span>
                        <input ref={loginRef} type="email" name="user-mail-1" placeholder="Почта" required />
                      </label>
                    </div>
                    <div className="custom-input login-page__field">
                      <label>
                        <span className="custom-input__label">Введите ваш пароль</span>
                        <input ref={passwordRef} type="password" name="user-password-1" placeholder="Пароль" required />
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
  );
};

export default LoginScreen;
