import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';
import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // Redirect away if NOT auth
  const authContext = useContext(AuthContext);

  if (authContext.auth === null) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (authContext.auth === undefined) {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth';
    }
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
