import React from 'react';
export const DisplayMessage = ({title, message}) => {
return (
    <div>
      <h2>{title || 'No Data Found'}</h2>
     <p> {message || 'There is no data for requested Planet. Please try'}</p>
    </div>
    )
};