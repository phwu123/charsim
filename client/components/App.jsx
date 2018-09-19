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
    this.handleClick = this.handleClick.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleClick() {
    this.setState({ showStatus: !this.state.showStatus });
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    e.preventDefault();
    this.setState({ coordinates: 
      {
        position: 'absolute',
        top: e.pageY - 12 + 'px',
        left: e.pageX - 165 + 'px'
      }
    })
  }

  render() {
    const sims = [];
    const components = [StatusPoints];
    components.forEach((C, i) => {
      sims.push(
        <div className={this.state.showStatus ? `visible` : `invisible`} style={this.state.coordinates}>
          <C
            key={i}
          />
        </div>
      );
    })
    return (
      <div>
        <div className={`row`}>
          <div className={`col-sm-2`}>
            <div className={styles.menu}>
              Create New Character
            </div>
          </div>
          <div className={`col-sm-10`}>

            <div className={styles.header}>
              <button onClick={e=>this.handleClick()} type="button" className={`btn`}>Status</button>
            </div>
            
            <div className={styles.sim} onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e)}>
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