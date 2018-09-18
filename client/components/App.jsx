import React, { Component } from 'react';
import StatusPoints from './StatusPoints.jsx';
import styles from './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showNew: false,
      showStatus: false,
      coordinates: {}
    }
    this.handleClick = this.handleClick.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.testClick = this.testClick.bind(this);
  }

  handleClick() {
    this.setState({ showStatus: !this.state.showStatus });
  }

  onDragOver(e) {
    console.log('dragover')
    e.preventDefault();
  }

  onDragStart(e, i) {
    console.log('dragging')
    ev.dataTransfer.setData('i', i);
  }

  onDrop(e) {
    let i = e.dataTransfer.getData('i');
  }

  testClick(e) {
    console.log('clicked');
    this.setState({ coordinates: 
      {
        position: 'absolute',
        top: 100 + 'px',
        left: 100 + 'px'
      }
    })
    console.log(this.state.coordinates)
  }

  render() {
    const sims = [];
    const components = [StatusPoints];
    components.forEach((C, i) => {
      sims.push(
        <div className={this.state.showStatus ? `visible` : `invisible`} onClick={(e)=>this.testClick()}  style={this.state.coordinates}>
          <C
            key={i}
            draggable
            onDragStart={(e)=>this.onDragStart(e, i)}
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

            <div className={styles.sim} onDragOver={(e)=>this.onDragOver(e)}>
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