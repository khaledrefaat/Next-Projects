import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';

import classes from './main-navigation.module.css';

function MainNavigation() {
  const authContext = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {authContext?.auth ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={() => authContext.logout()}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
