import React, { Component } from 'react';
import styles from './Char.css';
import CharCreate from './CharCreate.jsx';

export default class Char extends Component {
  constructor() {
    super();
    this.state = {
      showChar: true,
    }
  }

  clickCloseChar() {
    this.setState({ showChar: !this.state.showChar });
  }

  onDragStart(e) {
    e.dataTransfer.setDragImage(new Image(), 0, 0);
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
      <div>
        <table className={styles.character}>
          <thead className={styles.header}>
            <tr>
              <th className={this.state.showChar ? styles.roundedl : styles.roundedlmin}>
                <span className={styles.dotmove} draggable onDragStart={e => this.onDragStart(e)}></span>
                <span>Character&emsp;&emsp;&emsp;&emsp;&emsp;</span>
              </th>
              <th className={this.state.showChar ? styles.roundedr : styles.roundedrmin}>
                <div className={styles.dot}>
                  <div className={styles.dotletter} onClick={e => this.clickCloseChar()}>
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
        {this.state.showChar && <CharCreate />}
      </div>
    )
  }
} 