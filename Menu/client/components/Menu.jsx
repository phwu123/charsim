import React, { Component } from 'react';
import styles from './Menu.css';

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  statusToggle(e) {
    const type = e.target.dataset.type;
    this.setState({ [`show${type}`]: !this.state[`show${type}`] });
  }

  onDragOver(e) {
    e.preventDefault();
  }

  render() {
    const sims = [];
    const components = ['Char', 'StatusPoints'];
    components.forEach((C, i) => {
      sims.push(
        <div
          key={i}
          className={this.state[`show${components[i]}`] ? '' : styles.hide}
          id={C}
        >
        </div>
      );
    })

    return (
      <div>
        <div className={`row`}>
          <div className={`col-sm-2`}>
            <div className={styles.menu}>
              <span className={[`btn`, styles.button].join(' ')}>
                Menu
              </span>
            </div>
          </div>

          <div className={`col-sm-10`}>
            <div className={styles.header}>
              <button
                onClick={e => this.statusToggle(e)}
                type="button"
                data-type='Char'
                className={this.state.showchar ?
                  [`btn`, styles.buttonp].join(' ') :
                  [`btn`, styles.button].join(' ')}>
                Character
              </button>
              <button
                onClick={e => this.statusToggle(e)}
                type="button"
                data-type='StatusPoints'
                className={this.state.showstatus ?
                  [`btn`, styles.buttonp].join(' ') :
                  [`btn`, styles.button].join(' ')}>
                Status
              </button>
            </div>

            <div
              className={styles.sim}
              onDragOver={(e) => this.onDragOver(e)}
            >
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