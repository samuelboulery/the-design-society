import React, { useState, useEffect } from 'react';

export default function DinoEasterEgg() {
  const [keySequence, setKeySequence] = useState('');
  const [showDino, setShowDino] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const newSequence = keySequence + e.key;
      setKeySequence(newSequence.slice(-4)); // Garde les 4 dernières touches
      
      if (newSequence.slice(-4) === 'dino') {
        setShowDino(true);
        setTimeout(() => setShowDino(false), 5000); // Le dinosaure disparaît après 5 secondes
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  if (!showDino) return null;

  return (
    <div className="fixed bottom-4 left-0 animate-dino">
      <img 
        src="/images/dino-easter-egg.png" 
        alt="Dino easter egg" 
        width="64" height="64"
        className="w-16 h-16"
      />
    </div>
  );
} 