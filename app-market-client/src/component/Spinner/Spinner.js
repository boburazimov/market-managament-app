import React from 'react';
import SpinnerIcon from "./SpinnerIcon";

const Spinner = () => {

  const styled = {
    position: 'fixed',
    display: 'flex',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    opacity: .8,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={styled}>
      <SpinnerIcon text='Loading...'/>
    </div>
  );
};

export default Spinner;
