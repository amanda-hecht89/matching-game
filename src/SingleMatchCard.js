import React from 'react';
import './SingleMatchCard.css';

export default function SingleMatchCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled) {

      handleChoice(card);
    }
        
  };



  return (
    <div>
      <div className={flipped ? 'flipped' : ''}>

        <div className='card'>
          <img 
            className='front' 
            src={card.src} />
          <img 
            className='back'
            src='/Images/cover.png' 
            onClick={handleClick}/>

        </div>
      </div>
    </div>
  );
}
