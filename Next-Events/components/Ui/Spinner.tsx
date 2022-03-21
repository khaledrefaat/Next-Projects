import classes from './Spinner.module.css';
import Svg from '../icons/spinner.svg';
import Image from 'next/image';

const Spinner: React.FC = () => {
  return (
    <div className={classes.modal}>
      <Image src={Svg} alt="spinner" />
    </div>
  );
};

export default Spinner;
