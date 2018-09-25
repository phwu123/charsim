import React, { Component } from 'react';
import StatusPoints from './StatusPoints.jsx';
import styles from './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showNew: false,
      showStatus: false,
    }
  }

  statusToggle() {
    this.setState({ showStatus: !this.state.showStatus });
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    e.preventDefault();
    this.setState({
      coordinates: {
        position: 'absolute',
        top: e.clientY - 0.012 * window.innerHeight + 'px',
        left: e.clientX - 0.16 * window.innerWidth + 'px'
      },
    })
  }

  render() {
    const sims = [];
    const components = [StatusPoints];
    components.forEach((C, i) => {
      sims.push(
        <div 
          className={this.state.showStatus ?
            `visible` : `invisible`} 
          style={this.state.coordinates}
          key={i}
        >
          <C/>
        </div>
      );
    })

    return (
      <div>
        <div className={`row`}>
          <div className={`col-sm-2`}>
            <div className={styles.menu}>
              <span className={[`btn`, styles.statusb].join(' ')}>
                Menu
              </span>
            </div>
          </div>
          <div className={`col-sm-10`}>
            <div className={styles.header}>
              <button 
                onClick={e=>this.statusToggle()} 
                type="button"
                className={ this.state.showStatus ?
                  [`btn`, styles.statusbp].join(' ') :
                  [`btn`, styles.statusb].join(' ')}>
                Status
              </button>
            </div>
            
            <div 
              className={styles.sim}
              onDragOver={(e)=>this.onDragOver(e)} 
              onDrop={(e)=>this.onDrop(e)}>
              {sims.map(s => (
                s
              ))}
            </div>

          </div>
        </div>
      </div>
    )
  }
} 