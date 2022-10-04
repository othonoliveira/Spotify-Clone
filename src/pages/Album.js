import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

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

  render() {
    const { musics, loading, artistName, albumName } = this.state;
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
                <div key={ index }>
                  <p>{element.trackName}</p>
                  <audio
                    data-testid="audio-component"
                    src={ element.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    {'O seu navegador não suporta o elemento{" "}'}
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                </div>
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
