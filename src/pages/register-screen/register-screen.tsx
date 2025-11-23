import { type ChangeEvent, type FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import { Helmet } from '@dr.pogodin/react-helmet';

import { registerAction } from '@src/store/api-actions';
import { useAppDispatch } from '@src/hooks';

import { AppRoute, INVALID_LOGIN_MESSAGE, INVALID_PASSWORD_MESSAGE, VALID_NAME_REGEX, VALID_PASSWORD_REGEX } from '@src/const';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!isValidName) {
      toast.warn(INVALID_PASSWORD_MESSAGE);
    }

    if (!isValidLogin) {
      toast.warn(INVALID_LOGIN_MESSAGE);
    }

    if (!isValidPassword) {
      toast.warn(INVALID_PASSWORD_MESSAGE);
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

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    switch (evt.target.name) {
      case 'user-name-1':
        setIsValidName(true);
        if (nameRef.current === null || nameRef.current.value === '') {
          setIsValidName(false);
        } else {
          if (!VALID_NAME_REGEX.test(String(nameRef.current.value))) {
            setIsValidName(false);
          }
        }
        break;
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

  const validField = (value: boolean) => value ? 'is-valid' : 'is-invalid';

  return (
    <>
      <Helmet>
        <title>Кондитерская Кекс - Регистрация</title>
      </Helmet>

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
                      <div className={`custom-input register-page__field ${validField(isValidName)}`}>
                        <label>
                          <span className="custom-input__label">Введите ваше имя</span>
                          <input
                            ref={nameRef} onChange={handleInputChange}
                            type="text" name="user-name-1" placeholder="Имя" required
                          />
                        </label>
                      </div>

                      <div className={`custom-input register-page__field ${validField(isValidLogin)}`}>
                        <label>
                          <span className="custom-input__label">Введите вашу почту</span>
                          <input
                            ref={loginRef} onChange={handleInputChange}
                            type="email" name="user-mail-1" placeholder="Почта" required
                          />
                        </label>
                      </div>

                      <div className={`custom-input register-page__field ${validField(isValidPassword)}`}>
                        <label>
                          <span className="custom-input__label">Введите ваш пароль</span>
                          <input
                            ref={passwordRef} onChange={handleInputChange}
                            type="password" name="user-password-1" placeholder="Пароль" required
                          />
                        </label>
                      </div>

                      <div className="custom-input register-page__field">
                        <label>
                          <span className="custom-input__label">Загрузите ваше фото</span>
                          <input
                            ref={avatarRef} onChange={handleFileChange}
                            type="file" name="user-name-1" data-text="Аватар" accept="image/jpeg"
                          />
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
    </>
  );
};

export default RegisterScreen;
