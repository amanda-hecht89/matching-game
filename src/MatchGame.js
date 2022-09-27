import { useEffect, useState } from 'react';
import './MatchGame.css';
import SingleMatchCard from './SingleMatchCard';

const cardImages = [
  { 'src': '/Images/blue.png', matched: false },
  { 'src': '/Images/grey.png', matched: false },
  { 'src': '/Images/green.png', matched: false },
  { 'src': '/Images/purple.png', matched: false },
  { 'src': '/Images/pink.png', matched: false },
  { 'src': '/Images/orange.png', matched: false },
];

export default function MatchGame() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0); 
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));


    setChoiceOne(null),
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        
        setTimeout(() => resetTurn(), 1000) ;
      }
    }
    
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);



  return (
    <div className='matchApp'>
      <h1>Match Game!</h1>
      <button onClick={shuffleCards}>
        <h2>
            New Game!
        </h2>
      </button>
      <h2>
        turns: {turns}
      </h2>

      <div className='cardGrid'>
        {cards.map(card => (
          <SingleMatchCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
          
        ))}
      </div>

    </div>
  );
}
