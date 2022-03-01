import EventItem from './events-item';
import classes from './events.module.css';

const EventsList = ({ events }) => {
  return (
    <ul className={classes.list}>
      {events.map(event => {
        return <EventItem key={event.id} {...event} />;
      })}
    </ul>
  );
};

export default EventsList;
