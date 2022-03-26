import { useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  async function registrationHandler(event) {
    event.preventDefault();
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
        return setError(data.msg);
      }
      setError(null);
      inputRef.current.value = '';
    } catch (err) {
      console.log(err);
    }

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
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
      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
          {error}
        </p>
      )}
      {error === null && (
        <p style={{ color: '#27ae60', textAlign: 'center', marginTop: 5 }}>
          Done ^_^
        </p>
      )}
    </section>
  );
}

export default NewsletterRegistration;
