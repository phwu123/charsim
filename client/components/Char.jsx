import React, { Component } from 'react';
import styles from './Char.css';
import { connect } from 'react-redux';
import CharCreate from './CharCreate.jsx';

const mapStateToProps = (state) => {
  return {
    // all: state,
  }
}

class ConnectedChar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChar: true,
    }
  }

  componentDidMount() {
  }

  clickCloseChar() {
    this.setState({ showChar: !this.state.showChar }, () => {
      if (this.state.showChar && parseInt(this.state.coordinates.top) > 0.995 * window.innerHeight - 204)
        this.setState({
          coordinates: {
            ...this.state.coordinates,
            top: 0.995 * window.innerHeight - 204 + 'px',
          }
        })
    });
  }

  onDragStart(e) {
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  }

  onDragEnd(e) {
    this.setState({
      coordinates: {
        position: 'absolute',
        top: Math.min(
          Math.max(
            e.clientY - 0.01 * window.innerHeight, 0.111 * window.innerHeight),
          0.995 * window.innerHeight - (this.state.showChar ? 204 : 19)) + 'px',
        left: Math.min(
          Math.max(
            e.clientX - 0.16 * window.innerWidth, 0),
          0.84 * window.innerWidth - 222) + 'px'
      }
    })
  }

  resetStyle() {

  }

  tooltipOn(e) {
    this.setState({ tooltip: true });
  }

  tooltipOff(e) {
    this.setState({ tooltip: false });
  }

  render() {

    return (
      <div style={this.state.coordinates}>
        <table className={styles.character}>
          <thead className={styles.header}>
            <tr>
              <th className={this.state.showChar ? styles.roundedl : styles.roundedlmin}>
                <span 
                  className={styles.dotmove}
                  draggable
                  onDragStart={(e) => this.onDragStart(e)}
                  onDragEnd={e => this.onDragEnd(e)}
                ></span>
                <span>Character&emsp;&emsp;&emsp;&emsp;&emsp;</span>
              </th>
              <th className={this.state.showChar ? styles.roundedr : styles.roundedrmin}>
                <div className={styles.dot}>
                  <div 
                    className={styles.dotletter}
                    onClick={e => this.clickCloseChar()}>
                    -
                  </div>
                </div>
                <div className={styles.dot}>
                  <div className={styles.dotletter} onClick={e => this.resetStyle(e)} onMouseOver={e => this.tooltipOn(e)} onMouseOut={e => this.tooltipOff(e)}>
                    x
                  </div>
                </div>
                <div className={this.state.tooltip ? styles.tooltip : styles.hide}>
                  {/* Reset Character Style */}
                </div>
              </th>
            </tr>
          </thead>
        </table>
        <div className={this.state.showChar ? '' : styles.hide}>
          <CharCreate />
        </div>
      </div>
    )
  }
} 

const Char = connect(mapStateToProps)(ConnectedChar);

export default Char;