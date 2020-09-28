import React, { Component, createElement } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Playlist from './PlaylistComponent'
import MediaPlayer from './MediaPlayer'
import VideoPlayer from './VideoPlayer'
import AudioPlayer from './AudioPlayer'
import CirclePlayer from './CirclePlayer'

import { Media, Player, controls } from 'react-media-player'
import playlistData from './utils/playlist'

import './main.scss'

const { PlayPause } = controls
const mod = (num, max) => ((num % max) + max) % max

class App extends Component {
  state = {
    currentTrack: { src: null, label: 'No media loaded' },
    showMediaPlayer: true,
    repeatTrack: false,
    autoPlay: true,
  }

  _handleTrackClick = track => {
    this.setState({ currentTrack: track })
  }

  _navigatePlaylist = direction => {
    const newIndex = mod(
      playlistData.indexOf(this.state.currentTrack) + direction,
      playlistData.length
    )
    this.setState({ currentTrack: playlistData[newIndex] })
  }

  render() {
    const { showMediaPlayer, currentTrack, repeatTrack, autoPlay } = this.state
    return (
      <div>
        <button
          onClick={() => this.setState({ showMediaPlayer: !showMediaPlayer })}
        >
          Toggle Media Player
        </button>
        {showMediaPlayer && (
          <div className="media-player-wrapper">
            <MediaPlayer
              ref={c => (this._mediaPlayer = c)}
              src={currentTrack.src}
              autoPlay={autoPlay}
              loop={repeatTrack}
              currentTrack={currentTrack.label}
              repeatTrack={repeatTrack}
              onPrevTrack={() => this._navigatePlaylist(-1)}
              onNextTrack={() => this._navigatePlaylist(1)}
              onRepeatTrack={() => {
                this.setState({ repeatTrack: !repeatTrack })
              }}
              onPlay={() => !autoPlay && this.setState({ autoPlay: true })}
              onPause={() => this.setState({ autoPlay: false })}
              onEnded={() => !repeatTrack && this._navigatePlaylist(1)}
            />
            <Playlist
              tracks={playlistData}
              currentTrack={currentTrack}
              onTrackClick={this._handleTrackClick}
            />
          </div>
        )}
        <VideoPlayer src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" />
        <AudioPlayer src="/audio/armstrong.mp3" />
        <CirclePlayer src="https://p.scdn.co/mp3-preview/f83458d6611ae9589420f71c447ac9d2e3047cb8" />
      </div>
    )
  }
}

export default App;
