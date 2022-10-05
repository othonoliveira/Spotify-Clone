import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    musics: [],
    loading: false,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchMusics(id);
    this.setState({ loading: false });
  }

  fetchMusics = async (id) => {
    this.setState({ loading: true });
    const album = await getMusics(id);
    this.setState({
      musics: album,
      artistName: album[0].artistName,
      albumName: album[0].collectionName,
    });
  };

  handleCheck = ({ target }) => {
    const { musics } = this.state;
    const { checked, id } = target;
    const music = musics.find((element) => element.trackId === id);
    if (checked) {
      this.setState({
        loading: true,
        [id]: true,
      }, async () => {
        const addFavorite = await addSong(music);
        console.log(addFavorite);
        this.setState({ loading: false });
      });
    } else {
      this.setState({
        loading: true,
        [id]: false,
      }, async () => {
        const removeFavorite = await removeSong(music);
        console.log(removeFavorite);
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const { musics, loading, artistName, albumName } = this.state;
    const { handleCheck } = this;
    return (
      <>
        <Header />
        {loading && <p>Carregando...</p>}
        {!loading && (
          <div data-testid="page-album">
            <h1 data-testid="artist-name">{artistName}</h1>
            <h2 data-testid="album-name">{albumName}</h2>
            {musics.filter((element, _index, array) => element !== array[0])
              .map((element, index) => (
                <MusicCard
                  key={ index }
                  trackId={ element.trackId }
                  trackName={ element.trackName }
                  previewUrl={ element.previewUrl }
                  handleCheck={ handleCheck }
                  state={ this.state }
                />
              ))}
          </div>
        )}
      </>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
