import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

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
      <div>
        <input
          type="text"
          onChange={ (e) => setArtist(e.target.value) }
          data-testid="search-artist-input"
          value={ artist }
        />
        <button
          onClick={ fetchAlbum }
          disabled={ !validate }
          data-testid="search-artist-button"
        >
          Pesquisar

        </button>
      </div>

      {search && albumDetails.length === 0
        ? (
          <p>Nenhum álbum foi encontrado</p>
        )
        : (
          <div>
            <p>{`Resultado de álbuns de: ${artist}`}</p>
            {albumDetails.map((album) => (
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
                key={ album.collectionId }
              >
                {album.collectionName}
                <div>
                  Artist:
                  {' '}
                  {album.artistName}
                </div>
                <div>
                  <img src={ album.artworkUrl100 } alt={ album.artistName } />
                </div>
              </Link>
            ))}
          </div>
        )}

    </div>
  );
}
export default SearchAlbum;
