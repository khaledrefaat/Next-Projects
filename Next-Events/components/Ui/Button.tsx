import Link from 'next/link';
import classes from './ui.module.css';

const Button = props => {
  const renderButton = props.href ? (
    <Link href={props.href} {...props}>
      <a className={classes.linkBtn}>{props.children}</a>
    </Link>
  ) : (
    <button className={classes.btn} {...props}>
      {props.children}
    </button>
  );

  return renderButton;
};

export default Button;
