import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import styles from './SearchAlbum.module.css'; 

function SearchAlbum() {
  const [search, setSearch] = useState(false);
  const [artist, setArtist] = useState('');
  const [albumDetails, setAlbumDetails] = useState<AlbumType[]>([]);

  async function fetchAlbum() {
    const response = await searchAlbumsAPI(artist);
    setArtist('');
    setAlbumDetails(response);
    setSearch(true);
  }

  const validate = artist.length >= 2;
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            onChange={(e) => setArtist(e.target.value)}
            data-testid="search-artist-input"
            value={artist}
            className={styles.searchInput}
            placeholder="NOME DO ARTISTA"
          />
          <button
            onClick={fetchAlbum}
            disabled={!validate}
            data-testid="search-artist-button"
            className={styles.searchButton}
          >
            PROCURAR
          </button>
        </div>

        {search && albumDetails.length === 0 ? (
          <p className={styles.resultMessage}>Nenhum álbum foi encontrado</p>
        ) : (
          <div className={styles.resultContainer}>
            <p className={styles.resultHeader}>{`Resultado de álbuns de: ${artist}`}</p>
            {albumDetails.map((album) => (
              <Link
                className={styles.albumLink}
                data-testid={`link-to-album-${album.collectionId}`}
                to={`/album/${album.collectionId}`}
                key={album.collectionId}
              >
                {album.collectionName}
                <div className={styles.albumDetails}>
                  Artist: {album.artistName}
                </div>
                <div>
                  <img
                    src={album.artworkUrl100}
                    alt={album.artistName}
                    className={styles.albumImage}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchAlbum;

