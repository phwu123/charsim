import React, { Component } from 'react';
import styles from './StatusPoints.css';

export default class StatusPoints extends Component {
  constructor() {
    super()
    this.state = {
      guild: 'Shhh',
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
      showStats: true,
    }
    this.onDragStart = this.onDragStart.bind(this);
    this.clickCloseStats = this.clickCloseStats.bind(this);
    this.incStat = this.incStat.bind(this);
    this.incStatPush = this.incStatPush.bind(this);
    this.incStatRelease = this.incStatRelease.bind(this);
  }

  clickCloseStats() {
    this.setState({ showStats: !this.state.showStats });
  }

  incStat(e) {
    const getStat = (stat) => {
      if (stat === 'str')
        return this.state.baseStats.str;
      if (stat === 'agi')
        return this.state.baseStats.agi;
      if (stat === 'vit')
        return this.state.baseStats.vit;
      if (stat === 'int')
        return this.state.baseStats.int;
      if (stat === 'dex')
        return this.state.baseStats.dex;
      if (stat === 'luk')
        return this.state.baseStats.luk;
    };
    const statType = e.target.dataset.stat;
    const stat = getStat(statType);
    const statIncrement = Math.floor((stat - 1) / 10) + 2;
    const baseStats = {...this.state.baseStats};
    baseStats[statType] += 1;
    this.setState({
      points: this.state.points - statIncrement,
      baseStats,
    });
  }

  incStatPush(e) {
    const statType = e.target.dataset.stat + 'Press';
    this.setState({ [statType]: true })
  }

  incStatRelease(e) {
    const statType = e.target.dataset.stat + 'Press';
    this.setState({ [statType]: false })
  }

  onDragStart(e) {
    this.setState({ dragging: !this.state.dragging })
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  }

  onDragEnd(e) {
    this.setState({ dragging: !this.state.dragging })
  }

  render() {
    const str = this.state.baseStats.str;
    const strBonus = this.state.addStats.str;
    const agi = this.state.baseStats.agi;
    const agiBonus = this.state.addStats.agi;
    const vit = this.state.baseStats.vit;
    const vitBonus = this.state.addStats.vit;
    const int = this.state.baseStats.int;
    const intBonus = this.state.addStats.int;
    const dex = this.state.baseStats.dex;
    const dexBonus = this.state.addStats.dex;
    const luk = this.state.baseStats.luk;
    const lukBonus = this.state.addStats.luk;

    const baseLvl = 99;
    const baseAtk = Math.floor((baseLvl / 4) + str + dex / 5 + luk / 3);
    const baseDef = Math.floor(vit / 2 + Math.max(vit * 0.3, vit * vit / 150 - 1));
    const baseMatk = Math.floor(Math.floor(baseLvl / 4) + int + Math.floor(int / 2) + Math.floor(dex / 5) + Math.floor(luk / 3));
    const baseMdef = Math.floor(int + vit / 5 + dex / 5 + baseLvl / 4);
    const baseHit = 175 + baseLvl + dex + Math.floor(luk / 3);
    const baseCrit = luk * 0.3;
    const baseFlee = 100 + baseLvl + agi + Math.floor(luk / 5);
    const baseAspd = 161;

    const atk = baseAtk;
    const atkAdd = 0;
    const def = baseDef;
    const defAdd = 0;
    const matk = baseMatk;
    const matkAdd = 0;
    const mdef = baseMdef;
    const mdefAdd = 0;
    const hit = baseHit;
    const crit = Math.floor(baseCrit);
    const flee = baseFlee;
    const perfectDodge = Math.floor(luk / 10) + 1;
    const aspd = baseAspd;

    const baseStats = this.state.baseStats;
    const strIncrement = Math.floor((baseStats.str - 1) / 10) + 2
    const agiIncrement = Math.floor((baseStats.agi - 1) / 10) + 2
    const vitIncrement = Math.floor((baseStats.vit - 1) / 10) + 2
    const intIncrement = Math.floor((baseStats.int - 1) / 10) + 2
    const dexIncrement = Math.floor((baseStats.dex - 1) / 10) + 2
    const lukIncrement = Math.floor((baseStats.luk - 1) / 10) + 2

    return (
      <div>
        <table className={styles.status}>
          <th colspan="10" className={styles.header}>
            <span className={styles.dotmove} draggable onDragStart={e=>this.onDragStart(e)}></span>Status<span className={styles.floatr}><span className={styles.dot}><span className={styles.dotletter} onClick={e=>this.clickCloseStats()}>-</span></span><span className={styles.dot}><span className={styles.dotletter}>x</span></span></span>
          </th>
          <tr className={this.state.showStats ? styles.unhide : styles.hide}>
            <td>&nbsp;Str&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl].join(' ')}>{str}</td>
            <td className={[styles.background, styles.borderud].join(' ')}>{strBonus !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{strBonus !== 0 && `${strBonus}`}</td>
            <td className={styles.background}>
              {this.state.points >= strIncrement && str <= 99 ?
                <span 
                  onClick={e=>this.incStat(e)}
                  data-stat="str"
                  onMouseDown={e=>this.incStatPush(e)}
                  onMouseUp={e=>this.incStatRelease(e)}
                  className={this.state.strPress ? styles.trianglerpress : styles.triangler }
                >
                </span> : 
                <span className={styles.trianglerhide}></span>
              }
            </td>
            <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{strIncrement}</td>
            <td>
              &nbsp;
              <span class={styles.underline}>Atk</span>
            </td>
            <td>
              <span class={styles.underline}>{atk} + {atkAdd}</span>
            </td>
            <td>
              &nbsp;
              <span class={styles.underline}>Def</span>
            </td>
            <td className={styles.textRight}>
              <span class={styles.underline}>{def} + {defAdd}</span>
              &nbsp;
            </td>
          </tr>
          <tr className={this.state.showStats ? styles.unhide : styles.hide}>
            <td>&nbsp;Agi&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl].join(' ')}>{agi}</td>
            <td className={[styles.background, styles.borderud].join(' ')}>{agiBonus !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{agiBonus !== 0 && `${agiBonus}`}</td>
            <td className={styles.background}>
              {this.state.points >= agiIncrement && agi <= 99 ?
                <span 
                  onClick={e=>this.incStat(e)}
                  data-stat="agi"
                  onMouseDown={e=>this.incStatPush(e)}
                  onMouseUp={e=>this.incStatRelease(e)}
                  className={this.state.agiPress ? styles.trianglerpress : styles.triangler }
                >
                </span> : 
                <span className={styles.trianglerhide}></span>
              }
            </td>
            <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{agiIncrement}</td>
            <td>
              &nbsp;
              <span class={styles.underline}>Matk</span>
            </td>
            <td>
              <span class={styles.underline}>{matk} ~ {matkAdd}</span>
            </td>
            <td>
              &nbsp;
              <span class={styles.underline}>Mdef</span>
            </td>
            <td className={styles.textRight}>
              <span class={styles.underline}>{mdef} + {mdefAdd}</span>
              &nbsp;
            </td>
          </tr>
          <tr className={this.state.showStats ? styles.unhide : styles.hide}>
            <td>&nbsp;Vit&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl].join(' ')}>{vit}</td>
            <td className={[styles.background, styles.borderud].join(' ')}>{vitBonus !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{vitBonus !== 0 && `${vitBonus}`}</td>
            <td className={styles.background}>
              {this.state.points >= vitIncrement && vit <= 99 ?
                <span 
                  onClick={e=>this.incStat(e)}
                  data-stat="vit"
                  onMouseDown={e=>this.incStatPush(e)}
                  onMouseUp={e=>this.incStatRelease(e)}
                  className={this.state.vitPress ? styles.trianglerpress : styles.triangler }
                >
                </span> : 
                <span className={styles.trianglerhide}></span>
              }
            </td>
            <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{vitIncrement}</td>
            <td>
              &nbsp;
              <span class={styles.underline}>Hit</span>
            </td>
            <td className={styles.textRight}>
              <span class={styles.underline}>{hit}</span>
            </td>
            <td>
              &nbsp;
              <span class={styles.underline}>Flee</span>
            </td>
            <td>
              <span class={styles.underline}>{flee} + {perfectDodge}</span>
              &nbsp;
            </td>
          </tr>
          <tr className={this.state.showStats ? styles.unhide : styles.hide}>
            <td>&nbsp;Int&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl].join(' ')}>{int}</td>
            <td className={[styles.background, styles.borderud].join(' ')}>{intBonus !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{intBonus !== 0 && `${intBonus}`}</td>
            <td className={styles.background}>
              {this.state.points >= intIncrement && int <= 99 ?
                <span 
                  onClick={e=>this.incStat(e)}
                  data-stat="int"
                  onMouseDown={e=>this.incStatPush(e)}
                  onMouseUp={e=>this.incStatRelease(e)}
                  className={this.state.intPress ? styles.trianglerpress : styles.triangler }
                >
                </span> : 
                <span className={styles.trianglerhide}></span>
              }
            </td>
            <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{intIncrement}</td>
            <td>
              &nbsp;
              <span class={styles.underline}>Critical</span>
            </td>
            <td className={styles.textRight}>
              <span class={styles.underline}>{crit}</span>
            </td>
            <td>
              &nbsp;
              <span class={styles.underline}>Aspd</span>
            </td>
            <td className={styles.textRight}>
              <span class={styles.underline}>{aspd}</span>
              &nbsp;
            </td>
          </tr>
          <tr className={this.state.showStats ? styles.unhide : styles.hide}>
            <td>&nbsp;Dex&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl].join(' ')}>{dex}</td>
            <td className={[styles.background, styles.borderud].join(' ')}>{dexBonus !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{dexBonus !== 0 && `${dexBonus}`}</td>
            <td className={styles.background}>
              {this.state.points >= dexIncrement && dex <= 99 ?
                <span 
                  onClick={e=>this.incStat(e)}
                  data-stat="dex"
                  onMouseDown={e=>this.incStatPush(e)}
                  onMouseUp={e=>this.incStatRelease(e)}
                  className={this.state.dexPress ? styles.trianglerpress : styles.triangler }
                >
                </span> : 
                <span className={styles.trianglerhide}></span>
              }
            </td>
            <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{dexIncrement}</td>
            <td colspan="2">
              &nbsp;
              <span class={styles.underline}>Status Point</span>
            </td>
            <td colspan="2" className={styles.textRight}>
            <span class={styles.underline}>{this.state.points}</span>
              &nbsp;
            </td>
          </tr>
          <tr className={this.state.showStats ? styles.unhide : styles.hide}>
            <td>&nbsp;Luk&nbsp;</td>
            <td className={[styles.textRight, styles.background, styles.borderudl, styles.borderlast].join(' ')}>{luk}</td>
            <td className={[styles.background, styles.borderud, styles.borderlast].join(' ')}>{lukBonus !== 0 && '+'}</td>
            <td className={[styles.textRight, styles.background, styles.borderud, styles.borderlast].join(' ')}>{lukBonus !== 0 && `${lukBonus}`}</td>
            <td className={[styles.background, styles.borderlast].join(' ')}>
              {this.state.points >= lukIncrement && luk <= 99 ?
                <span 
                  onClick={e=>this.incStat(e)}
                  data-stat="luk"
                  onMouseDown={e=>this.incStatPush(e)}
                  onMouseUp={e=>this.incStatRelease(e)}
                  className={this.state.lukPress ? styles.trianglerpress : styles.triangler }
                >
                </span> : 
                <span className={styles.trianglerhide}></span>
              }
            </td>
            <td className={[styles.textRight, styles.background, styles.borderurd, styles.borderlast].join(' ')}>{lukIncrement}</td>
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