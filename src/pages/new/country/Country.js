import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const Country = () => {
  // set country
  const [country, setCountry] = useState();

  // set id
  // const [id, setId] = useState();
  // get the data
  const options = useMemo(() => countryList().getData(), []);
  const id = useMemo(() => Object.keys(countryList().getValueList(), []));

  

  // eventhandler
  const changeHandler = (country) => {
    setCountry(country);
   
  };
  return (
    <div>
      <Select options={options} value={country} onChange={changeHandler} placeholder="Country"/>
    </div>
    
  );
};


// id={countryid}
export default Country;
