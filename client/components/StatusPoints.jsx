import React, { Component } from 'react';
import styles from './StatusPoints.css';

export default class StatusPoints extends Component {
  constructor() {
    super()
    this.state = {
      guild: '',
      points: 1325,
      baseStats: {
        str: 1,
        agi: 1,
        vit: 1,
        int: 1,
        dex: 1,
        luk: 1,
      },
      addStats: {
        str: 9,
        agi: 7,
        vit: 10,
        int: 7,
        dex: 8,
        luk: 3,
      },
      advStats: {
        atk: 0,
        def: 0,
        matk: 0,
        mdef: 0,
        hit: 284,
        flee: 208,
        crit: 2,
        aspd: 161.70
      },
      advAddStats: {
        atk: 0,
        def: 0,
        matk: 0,
        mdef: 0,
        flee: 0,
      }
    }
    this.onDragStart = this.onDragStart.bind(this);
  }

  componentDidMount() {

  }

  onDragStart(e) {
    this.setState({ dragging: !this.state.dragging })
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  }

  onDragEnd(e) {
    this.setState({ dragging: !this.state.dragging })
  }

  render() {
    const baseStats = this.state.baseStats;
    return (
      <div>
        <table className={styles.status}>
          <th colspan="10" draggable className={styles.header} onDragStart={e=>this.onDragStart(e)}>
          Status
          </th>
          <tr>
            <td>&nbsp;Str&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl].join(' ')}>{baseStats.str}</td>
            <td className={[styles.background, styles.borderud].join(' ')}>{this.state.addStats.str !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{this.state.addStats.str !== 0 && `${this.state.addStats.str}`}</td>
            <td className={styles.background}>0</td>
            <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{Math.floor((baseStats.str - 1) / 10) + 2}</td>
            <td>
              &nbsp;
              <span class={styles.underline}>Atk</span>
            </td>
            <td>
              <span class={styles.underline}>{this.state.advStats.atk} + {this.state.advAddStats.atk}</span>
            </td>
            <td>
              &nbsp;
              <span class={styles.underline}>Def</span>
            </td>
            <td>
              <span class={styles.underline}>{this.state.advStats.def} + {this.state.advAddStats.def}</span>
              &nbsp;
            </td>
          </tr>
          <tr>
            <td>&nbsp;Agi&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl].join(' ')}>{baseStats.agi}</td>
            <td className={[styles.background, styles.borderud].join(' ')}>{this.state.addStats.agi !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{this.state.addStats.agi !== 0 && `${this.state.addStats.agi}`}</td>
            <td className={styles.background}>0</td>
            <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{Math.floor((baseStats.agi - 1) / 10) + 2}</td>
            <td>
              &nbsp;
              <span class={styles.underline}>Matk</span>
            </td>
            <td>
              <span class={styles.underline}>{this.state.advStats.matk} + {this.state.advAddStats.matk}</span>
            </td>
            <td>
              &nbsp;
              <span class={styles.underline}>Mdef</span>
            </td>
            <td>
              <span class={styles.underline}>{this.state.advStats.mdef} + {this.state.advAddStats.mdef}</span>
              &nbsp;
            </td>
          </tr>
          <tr>
            <td>&nbsp;Vit&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl].join(' ')}>{baseStats.vit}</td>
            <td className={[styles.background, styles.borderud].join(' ')}>{this.state.addStats.vit !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{this.state.addStats.vit !== 0 && `${this.state.addStats.vit}`}</td>
            <td className={styles.background}>0</td>
            <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{Math.floor((baseStats.vit - 1) / 10) + 2}</td>
            <td>
              &nbsp;
              <span class={styles.underline}>Hit</span>
            </td>
            <td className={styles.textRight}>
              <span class={styles.underline}>{this.state.advStats.hit}</span>
            </td>
            <td>
              &nbsp;
              <span class={styles.underline}>Flee</span>
            </td>
            <td>
              <span class={styles.underline}>{this.state.advStats.flee} + {this.state.advAddStats.flee}</span>
              &nbsp;
            </td>
          </tr>
          <tr>
            <td>&nbsp;Int&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl].join(' ')}>{baseStats.int}</td>
            <td className={[styles.background, styles.borderud].join(' ')}>{this.state.addStats.int !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{this.state.addStats.int !== 0 && `${this.state.addStats.int}`}</td>
            <td className={styles.background}>0</td>
            <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{Math.floor((baseStats.int - 1) / 10) + 2}</td>
            <td>
              &nbsp;
              <span class={styles.underline}>Critical</span>
            </td>
            <td className={styles.textRight}>
              <span class={styles.underline}>{this.state.advStats.crit}</span>
            </td>
            <td>
              &nbsp;
              <span class={styles.underline}>Aspd</span>
            </td>
            <td className={styles.textRight}>
              <span class={styles.underline}>{Math.floor(this.state.advStats.aspd)}</span>
              &nbsp;
            </td>
          </tr>
          <tr>
            <td>&nbsp;Dex&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl].join(' ')}>{baseStats.dex}</td>
            <td className={[styles.background, styles.borderud].join(' ')}>{this.state.addStats.dex !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{this.state.addStats.dex !== 0 && `${this.state.addStats.dex}`}</td>
            <td className={styles.background}>0</td>
            <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{Math.floor((baseStats.dex - 1) / 10) + 2}</td>
            <td colspan="2">
              &nbsp;
              <span class={styles.underline}>Status Point</span>
            </td>
            <td colspan="2" className={styles.textRight}>
            <span class={styles.underline}>{this.state.points}</span>
              &nbsp;
            </td>
          </tr>
          <tr>
            <td>&nbsp;Luk&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl, styles.borderlast].join(' ')}>{baseStats.luk}</td>
            <td className={[styles.background, styles.borderud, styles.borderlast].join(' ')}>{this.state.addStats.luk !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud, styles.borderlast].join(' ')}>{this.state.addStats.luk !== 0 && `${this.state.addStats.luk}`}</td>
            <td className={[styles.background, styles.borderlast].join(' ')}>0</td>
            <td className={[styles.textRight, styles.background, styles.borderurd, styles.borderlast].join(' ')}>{Math.floor((baseStats.luk - 1) / 10) + 2}</td>
            <td>
              &nbsp;
              <span class={styles.underline}>Guild</span>
            </td>
            <td colspan="3" className={styles.textRight}>
              <span class={styles.underline}>{this.state.guild}</span>
              &nbsp;
            </td>
          </tr>
        </table>
      </div>
    )
  }
}