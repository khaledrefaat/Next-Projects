import Link from 'next/link';
import classes from './ui.module.css';

const Button = ({ children, href }) => {
  const renderButton = href ? (
    <Link href={href}>
      <a className={classes.linkBtn}>{children}</a>
    </Link>
  ) : (
    <button className={classes.btn}>{children}</button>
  );

  return renderButton;
};

export default Button;
