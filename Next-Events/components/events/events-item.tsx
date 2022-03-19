import Image from 'next/image';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import DateIcon from '../icons/date-icon';
import Button from '../Ui/Button';
import classes from './events.module.css';

interface EventsItemProps {
  image: string;
  title: string;
  date: string;
  location: string;
  id: string;
}

const EventItem: React.FC<EventsItemProps> = ({
  image,
  title,
  date,
  location,
  id,
}) => {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress: string = location.replace(', ', '\n');
  return (
    <li className={classes.item}>
      <div className={classes.imageContainer}>
        <Image src={`/${image}`} alt={title} layout="fill" priority />
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
