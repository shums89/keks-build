import { type ChangeEvent, type FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';

import { registerAction } from '@src/store/api-actions';
import { useAppDispatch } from '@src/hooks';

import { AppRoute, INVALID_LOGIN_MESSAGE, INVALID_PASSWORD_MESSAGE, VALID_PASSWORD_REGEX } from '@src/const';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState('');

  const nameRef = useRef<HTMLInputElement | null>(null);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (nameRef.current === null || nameRef.current.value === '') {
      toast.warn('Введите ваше имя');
    }

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

    if (loginRef.current === null || passwordRef.current === null || nameRef.current === null) {
      return;
    }

    dispatch(registerAction({
      name: nameRef.current.value,
      login: loginRef.current.value,
      password: passwordRef.current.value,
      avatarUrl: avatar || null
    }));
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setAvatar(base64Image);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="wrapper">
      <main>
        <section className="register-page">
          <div className="register-page__header">
            <div className="register-page__img-wrap">
              <img className="register-page__img" src="img/svg/hero-keks.svg" width="727" height="569" alt="Картинка кота." />
            </div>
          </div>
          <div className="register-page__content">
            <div className="register-page__inner">
              <h1 className="register-page__title">Регистрация</h1>
              <div className="register-page__form">
                <form action="#" method="post" autoComplete="off" onSubmit={handleSubmit}>
                  <div className="register-page__fields">
                    <div className="custom-input register-page__field">
                      <label>
                        <span className="custom-input__label">Введите ваше имя</span>
                        <input ref={nameRef} type="text" name="user-name-1" placeholder="Имя" required />
                      </label>
                    </div>
                    <div className="custom-input register-page__field">
                      <label>
                        <span className="custom-input__label">Введите вашу почту</span>
                        <input ref={loginRef} type="email" name="user-mail-1" placeholder="Почта" required />
                      </label>
                    </div>
                    <div className="custom-input register-page__field">
                      <label>
                        <span className="custom-input__label">Введите ваш пароль</span>
                        <input ref={passwordRef} type="password" name="user-password-1" placeholder="Пароль" required />
                      </label>
                    </div>
                    <div className="custom-input register-page__field">
                      <label>
                        <span className="custom-input__label">Загрузите ваше фото</span>
                        <input ref={avatarRef} type="file" name="user-name-1" data-text="Аватар" accept="image/jpeg" onChange={handleFileChange} />
                      </label>
                    </div>
                  </div>
                  <button className="btn register-page__btn btn--large" type="submit" onClick={handleClick}>
                    Зарегистрироваться
                  </button>
                </form>
              </div>
              <p className="register-page__text-wrap">Уже зарегистрированы? <Link to={AppRoute.Login} className="register-page__link">Войдите</Link> в свой аккаунт.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterScreen;
