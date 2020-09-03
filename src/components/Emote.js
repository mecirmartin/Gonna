import React from 'react';

const Emote = (props) => {
  return (
    <span role='img' aria-label='pin'>
      {props.emote}
    </span>
  );
};

export default Emote;
