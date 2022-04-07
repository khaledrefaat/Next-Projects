import { useContext, useState } from 'react';
import { AuthContext } from '../../store/auth-context';
import classes from './auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const authContext = useContext(AuthContext);

  function switchAuthModeHandler() {
    setError(null);
    setIsLogin(prevState => !prevState);
  }

  const handelSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:9000/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (res.ok) {
      authContext.login(data);
      setError(null);
      return (window.location.href = 'profile');
    }
    setError(data.message);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handelSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
        <p className={classes.error}>{error && error}</p>
      </form>
    </section>
  );
}

export default AuthForm;
