import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

function Album() {
  const { id } = useParams<{ id?: string }>();
  const [albumDetails, setAlbumDetails] = useState<AlbumType | null>(null);
  const [songs, setSongs] = useState<SongType[]>([]);

  useEffect(() => {
    if (id) {
      const fetchAlbumAndSongs = async () => {
        try {
          const [album, ...fetchedSongs] = await getMusics(id);
          setAlbumDetails(album);
          setSongs(fetchedSongs);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAlbumAndSongs();
    }
  }, [id]);

  if (!albumDetails) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      {albumDetails && (
        <>
          <img className="album-image" src={ albumDetails.artworkUrl100 } alt="" />
          <p className="artist-name" data-testid="artist-name">
            {albumDetails.artistName}

          </p>
          <p className="album-name" data-testid="album-name">
            {albumDetails.collectionName}

          </p>
        </>
      )}
      <h3>Songs</h3>
      <ul>
        {songs.map((song) => (
          <li key={ song.trackId }>
            <MusicCard song={ song } />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Album;
