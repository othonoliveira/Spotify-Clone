import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artist: '',
    search: '',
    buttonState: true,
    loading: false,
    searched: false,
    albums: [],
  };

  handleArtist = (event) => {
    this.setState({ artist: event.target.value }, this.toggleButton);
  };

  handleButton = async () => {
    const { artist } = this.state;
    this.setState({ loading: true, searched: false, search: artist, artist: '' });
    const response = await searchAlbumsAPI(artist);
    this.setState({ loading: false, searched: true, albums: response });
  };

  toggleButton = () => {
    const { artist } = this.state;
    const MIN_LENGTH = 2;
    if (artist.length >= MIN_LENGTH) {
      this.setState({ buttonState: false });
    } else {
      this.setState({ buttonState: true });
    }
  };

  render() {
    const { buttonState, loading, searched, albums, search, artist } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <label htmlFor="search-input">
            <input
              type="text"
              name="search-input"
              value={ artist }
              data-testid="search-artist-input"
              onChange={ this.handleArtist }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonState }
            onClick={ this.handleButton }
          >
            Pesquisar
          </button>
          {loading && <p>Carregando...</p>}
          {
            searched && (albums.length === 0) ? <p>Nenhum álbum foi encontrado</p>
              : (
                searched && (
                  <>
                    <h1>{`Resultado de álbuns de: ${search}`}</h1>
                    {albums.map((element, index) => (
                      <Link
                        data-testid={ `link-to-album-${element.collectionId}` }
                        to={ `/album/${element.collectionId}` }
                        key={ index }
                      >
                        <div className="albums-conteiner">
                          <img
                            src={ element.artworkUrl100 }
                            alt={ element.collectionName }
                          />
                          <h2>{element.collectionName}</h2>
                          <h3>{element.artistName}</h3>
                        </div>
                      </Link>
                    ))}
                  </>
                )
              )
          }
        </div>
      </>
    );
  }
}

export default Search;
