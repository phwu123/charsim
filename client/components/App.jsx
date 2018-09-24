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
    this.statusToggle = this.statusToggle.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  statusToggle() {
    this.setState({ showStatus: !this.state.showStatus });
  }

  onDragStart(e) {
    this.setState({ dragStart: 
      {
        position: 'absolute',
        top: e.pageY,
        left: e.pageX,
      }
    })
  }

  onDrag(e) {
    this.setState({ dragEnd: 
      {
        position: 'absolute',
        top: e.pageY,
        left: e.pageX,
      }
    })
  }

  onDragEnd(e) {
    // this.setState({ dragStart: !this.state.dragStart, dragEnd: !this.state.dragEnd });
  }

  onDragOver(e) {
    e.preventDefault();
    this.setState({
      dragEnd: {
        position: 'absolute',
        top: e.pageY,
        left: e.pageX,
      }
    })
  }

  onDrop(e) {
    e.preventDefault();
    this.setState({
      coordinates: {
        position: 'absolute',
        top: e.pageY - 10 + 'px',
        left: e.pageX - 160 + 'px'
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