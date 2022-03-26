import { useContext, useRef, useState } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);

  const inputRef = useRef(null);

  async function registrationHandler(event) {
    event.preventDefault();
    notificationCtx.showNotification({
      title: 'Registering...',
      message: 'Pending Registering...',
      status: 'pending',
    });
    try {
      const res = await fetch('http://localhost:3000/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: inputRef.current.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || 'Something went wrong.');
      }
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully registered for newsletter ^_^',
        status: 'success',
      });
      inputRef.current.value = '';
    } catch (err) {
      console.log(err);
      notificationCtx.showNotification({
        title: 'Error',
        message: err.message,
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={inputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
