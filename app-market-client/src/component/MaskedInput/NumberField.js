import React from 'react';

const NumberField = (props) => {

  const onChange = (event) => {
      props.onChange(event.target.value);
  };

  return (
    <div>
        <label >Income</label>
    </div>
  );
};

export default NumberField;
