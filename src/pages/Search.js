import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    buttonState: true,
  };

  handleArtist = (event) => {
    this.setState({ artist: event.target.value }, this.toggleButton);
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
    const { buttonState } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            <input
              type="text"
              name="search-input"
              data-testid="search-artist-input"
              onChange={ this.handleArtist }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonState }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
