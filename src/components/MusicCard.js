import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { trackId, trackName, previewUrl, handleCheck, state } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          {'O seu navegador não suporta o elemento{" "}'}
          {' '}
          <code>audio</code>
          .
        </audio>
        <input
          type="checkbox"
          name="favorite"
          id={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ handleCheck }
          checked={ state[trackId] || false }
        />
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  handleCheck: PropTypes.func.isRequired,
  state: PropTypes.shape({
    trackId: PropTypes.string,
  }).isRequired,
};
