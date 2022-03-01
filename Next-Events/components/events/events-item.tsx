import Image from 'next/image';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import DateIcon from '../icons/date-icon';
import Button from '../Ui/Button';
import classes from './events.module.css';

const EventItem = ({ image, title, date, location, id }) => {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress: string = location.replace(', ', '\n');
  return (
    <li className={classes.item}>
      <div className={classes.imageContainer}>
        <Image src={`/${image}`} alt={title} layout="fill" />
      </div>
      <div className={classes.content}>
        <div>
          <h2>{title}</h2>
        </div>
        <div className={classes.date}>
          <DateIcon />
          <time>{humanReadableDate}</time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formattedAddress}</address>
        </div>
        <div className={classes.actions}>
          <Button href={`/events/${id}`}>
            <span>explore event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
