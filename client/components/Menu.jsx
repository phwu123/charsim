import React, { Component } from 'react';
import styles from './Menu.css';
import { connect } from 'react-redux';
import Char from './Char.jsx';
import StatusPoints from './StatusPoints.jsx';

const mapStateToProps = (state) => {
  return {
    all: state,
  }
}

class ConnectedMenu extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {
  }

  showToggle(e) {
    const type = e.target.dataset.type;
    this.setState({ [`show${type}`]: !this.state[`show${type}`] });
  }

  onDragOver(e) {
    e.preventDefault();
  }

  render() {
    const components = [<Char />, <StatusPoints />];
    const sims = [];
    const names = [['Char', 'Character'], ['StatusPoints', 'Status']];
    const buttons = [];
    components.forEach((C, i) => {
      sims.push(
        <div key={i} className={this.state[`show${names[i][0]}`] ? '' : styles.hide}>
          {components[i]}
        </div>
      );
    })
    names.forEach((button, i) => {
      buttons.push(
        <button
        key={i}
        onClick={e => this.showToggle(e)}
        data-type={button[0]}
        className={this.state[`show${button[0]}`] ?
          [`btn`, styles.buttonp, styles.margin].join(' ') :
          [`btn`, styles.button, styles.margin].join(' ')}>
        {button[1]}
      </button>
      )
    })

    return (
      <div>
        <div className={[`row`, styles.row].join(' ')}>
          <div className={`col-sm-2`}>
            <div className={styles.menu}>
              <span className={[`btn`, styles.button].join(' ')}>
                Menu
              </span>
            </div>
          </div>

          <div className={`col-sm-10`}>
            <div className={styles.header}>
              {buttons.map((button, i) => (
                button
              ))}
            </div>
            <div className={styles.sim} onDragOver={(e) => this.onDragOver(e)}>
              {sims.map((sim, i) => (
                sim
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
} 

const Menu = connect(mapStateToProps)(ConnectedMenu);

export default Menu;