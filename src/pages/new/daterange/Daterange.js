import { format, addDays } from 'date-fns';
import { useEffect, useState, useRef } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Daterange = () => {
  // Set date picker
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  // open and close date (calendar) picker
  const [open, setOpen] = useState(false);
  //  get the target element to toggle
  const refOne = useRef(null);

  // load current date on page start
  useEffect(() => {
    // close date (calendar) picker
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  const hideOnEscape = e => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };
  const hideOnClickOutside = e => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="daterange">
      <label>Date Range</label>
      <input
        value={`${format(range[0].startDate, 'MM-dd-yyyy')}     to    ${format(
          range[0].endDate,
          'MM-dd-yyyy'
        )}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen(open => !open)} //close or open the calender
        style={{ color: 'gray' }}
      />
      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calenderElement"
          />
        )}
      </div>
    </div>
  );
};

export default Daterange;
