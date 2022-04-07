import classes from './profile-form.module.css';
import { error } from '../auth/auth-form.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../store/auth-context';

function ProfileForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const authContext = useContext(AuthContext);

  const handelSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:9000/auth/reset', {
      method: 'POST',
      body: JSON.stringify({ confirmPassword, password }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authContext.auth.token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      authContext.login(data);
      setErrorMsg(null);
      return (window.location.href = '/');
    }
    setErrorMsg(data.message);
  };

  return (
    <form onSubmit={handelSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="password">New Password</label>
        <input
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          id="password"
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="confirmPassword">confirmPassword</label>
        <input
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          id="confirmPassword"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      <p className={error}>{errorMsg && errorMsg}</p>
    </form>
  );
}

export default ProfileForm;
