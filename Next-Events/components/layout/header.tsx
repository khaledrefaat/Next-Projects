import Link from 'next/link';
import classes from './header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <a>NextEvents</a>
        </Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">
              <a>browse all events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
