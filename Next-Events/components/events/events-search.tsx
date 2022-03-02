import { useRef } from 'react';
import Button from '../Ui/Button';
import classes from './events-search.module.css';

interface EventsSearchProps {
  onSearch: (year: string, month: string) => void;
}

const EventsSearch: React.FC<EventsSearchProps> = ({ onSearch }) => {
  const yearInputRef = useRef<HTMLSelectElement>();
  const monthInputRef = useRef<HTMLSelectElement>();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSearch(yearInputRef.current.value, monthInputRef.current.value);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select ref={yearInputRef} name="year" id="year">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">
            <select ref={monthInputRef} name="month" id="month">
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </label>
        </div>
      </div>
      <Button type="submit">Find Events</Button>
    </form>
  );
};

export default EventsSearch;
