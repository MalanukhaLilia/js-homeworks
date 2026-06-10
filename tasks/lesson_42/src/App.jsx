import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import contactIllustration from './assets/contact_illustration.webp';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Юзернейм повинен містити мінімум 4 символи')
    .required("Поле обов'язкове для заповнення"),
  email: Yup.string()
    .email('Неправильна адреса електронної пошти')
    .required("Поле обов'язкове для заповнення"),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Перевір формат номеру телефона')
    .required("Поле обов'язкове для заповнення"),
  message: Yup.string()
    .min(10, 'Повідомлення має бути не менше 10 символів')
    .required("Поле обов'язкове для заповнення"),
  subscribe: Yup.boolean()
});

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (values, { resetForm }) => {
    setSubmittedData(values);
    resetForm();
  };

  return (
    <div className="contact-app">
      <div className="contact-app__container">
        <header className="contact-header">
          <div className="contact-header__text">
            <h1 className="contact-header__title">Зв'язатися з нами</h1>
            <p className="contact-header__subtitle">
              Залиш нам повідомлення, а ми відповімо якнайшвидше
            </p>
          </div>
          <div className="contact-header__illustration">
            <img src={contactIllustration} alt="Contact Illustration" className="contact-header__img" />
          </div>
        </header>

        <Formik
          initialValues={{ name: '', email: '', phone: '', message: '', subscribe: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="contact-form">
              <div className="contact-form__grid">
                <div className="contact-form__group">
                  <label htmlFor="name" className="contact-form__label">Ім'я та прізвище</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className={`contact-form__input ${errors.name && touched.name ? 'contact-form__input--error' : ''}`}
                    placeholder=" "
                  />
                  <div className="contact-form__error-container">
                    <ErrorMessage name="name" component="span" className="contact-form__error" />
                  </div>
                </div>
                <div className="contact-form__group">
                  <label htmlFor="email" className="contact-form__label">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className={`contact-form__input ${errors.email && touched.email ? 'contact-form__input--error' : ''}`}
                    placeholder=" "
                  />
                  <div className="contact-form__error-container">
                    <ErrorMessage name="email" component="span" className="contact-form__error" />
                  </div>
                </div>
                <div className="contact-form__group contact-form__group--full">
                  <label htmlFor="phone" className="contact-form__label">Телефон (у форматі +380)</label>
                  <Field
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`contact-form__input ${errors.phone && touched.phone ? 'contact-form__input--error' : ''}`}
                    placeholder=" "
                  />
                  <div className="contact-form__error-container">
                    <ErrorMessage name="phone" component="span" className="contact-form__error" />
                  </div>
                </div>
                <div className="contact-form__group contact-form__group--full">
                  <label htmlFor="message" className="contact-form__label">Повідомлення</label>
                  <Field
                    id="message"
                    name="message"
                    as="textarea"
                    rows="1"
                    className={`contact-form__input contact-form__input--textarea ${errors.message && touched.message ? 'contact-form__input--error' : ''}`}
                    placeholder=" "
                  />
                  <div className="contact-form__error-container">
                    <ErrorMessage name="message" component="span" className="contact-form__error" />
                  </div>
                </div>
                <div className="contact-form__group contact-form__group--full contact-form__group--checkbox">
                  <label className="contact-form__checkbox-label">
                    <Field type="checkbox" name="subscribe" className="contact-form__checkbox" />
                    <span className="contact-form__checkbox-custom"></span>
                    Надсилати мені оновлення про академію
                  </label>
                </div>
              </div>
              <div className="contact-form__actions">
                <button type="submit" className="contact-form__submit-btn">
                  Надіслати
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {submittedData && (
          <div className="contact-success">
            <div className="contact-success__overlay" onClick={() => setSubmittedData(null)}></div>
            <div className="contact-success__card">
              <div className="contact-success__icon-box">
                <svg className="contact-success__icon" viewBox="0 0 24 24" width="48" height="48">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="contact-success__title">Заявка надіслана!</h3>
              <p className="contact-success__message">
                Дякуємо, {submittedData.name}! Ваше повідомлення успішно надіслано. Ми відповімо вам якнайшвидше.
              </p>
              <button className="contact-success__close-btn" onClick={() => setSubmittedData(null)}>
                Зрозуміло
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
