import React, { useState } from 'react';
import { SongType } from '../types';

import checkedHeartImage from '../assets/checked_heart.png';
import emptyHeartImage from '../assets/empty_heart.png';

interface MusicCardProps {
  song: SongType;
}

function MusicCard({ song }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCheckboxChange = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="music-card">
      <div className="music-details">
        <h3>{song.trackName}</h3>
      </div>
      <div className="favorite-checkbox">
        <label
          htmlFor={ `checkbox-music-${song.trackId}` }
          data-testid={ `checkbox-music-${song.trackId}` }
        >
          <input
            type="checkbox"
            id={ `checkbox-music-${song.trackId}` }
            checked={ isFavorite }
            onChange={ handleCheckboxChange }
          />
          {}
          <img
            src={ isFavorite ? checkedHeartImage : emptyHeartImage }
            alt="favorite"
          />
        </label>
      </div>
      <audio data-testid="audio-component" src={ song.previewUrl } controls>
        <track kind="captions" />
        Seu navegador não suporta o
        {' '}
        <code>audio</code>
        {' '}
        elemento.
      </audio>
    </div>
  );
}

export default MusicCard;
