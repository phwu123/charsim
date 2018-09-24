import React, { Component } from 'react';
import styles from './StatusPoints.css';
import { connect } from 'react-redux';
import * as incStats from './actions';
import store from './store';

const mapStateToProps = (state) => {
  return { all: state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incStr: (stat) => dispatch(incStats.incStr(stat)),
  };
}

class ConnectedStatusPoints extends Component {
  constructor() {
    super()
    this.state = {
      guild: 'None',
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
  }

  componentDidMount() {
    this.validateStats();
    const strBase = this.state.baseStats.str + 2;
    this.props.incStr(strBase);
    console.log(store.getState())
    console.log(this.props.all);
  }

  clickCloseStats() {
    this.setState({ showStats: !this.state.showStats });
  }

  validateStats() {
    let pointsLeft = 1325
    const baseStats = { ...this.state.baseStats }
    for (let stats in baseStats) {
      const stat = baseStats[stats];
      let count = 1;
      let increment = 2;
      while (count < stat && pointsLeft >= increment) {
        increment = Math.floor((count - 1) / 10) + 2;
        pointsLeft -= increment
        count += 1;
      }
      // if (stat > 91) pointsLeft -= 540 + (11 * (stat - 91));
      // else if (stat > 81) pointsLeft -= 440 + (10 * (stat - 81));
      // else if (stat > 71) pointsLeft -= 350 + (9 * (stat - 71));
      // else if (stat > 61) pointsLeft -= 270 + (8 * (stat - 61));
      // else if (stat > 51) pointsLeft -= 200 + (7 * (stat - 51));
      // else if (stat > 41) pointsLeft -= 140 + (6 * (stat - 41));
      // else if (stat > 31) pointsLeft -= 90 + (5 * (stat - 31));
      // else if (stat > 21) pointsLeft -= 50 + (4 * (stat - 21));
      // else if (stat > 11) pointsLeft -= 20 + (3 * (stat - 11));
      // else  pointsLeft -= 2 * (stat - 1);
    }
    this.setState({ points: pointsLeft },
      () => {
        return pointsLeft;
      });
  }

  maxAllowed(stat) {
    let points = this.state.points;
    const baseStats = { ...this.state.baseStats };
    stat = baseStats[stat];
    let increment = Math.floor((stat - 1) / 10) + 2;
    while (points >= increment && stat < 99) {
      increment = Math.floor((stat - 1) / 10) + 2;
      points -= increment;
      stat += 1;
    }
    return stat;
  }

  statInput(e) {
    const baseStats = { ...this.state.baseStats };
    const stat = e.target.dataset.stat;
    const statInput = stat + 'Input';
    const value = e.target.validity.valid && e.target.value > 0 ? e.target.value : 1;
    const maxStat = this.maxAllowed(stat);
    if (Number(value) > maxStat) {
      baseStats[stat] = maxStat;
      this.setState({ baseStats }, () => {
        this.validateStats();
      });
    } else {
      this.setState(
        { [statInput]: Number(value) },
        () => {
          baseStats[stat] = this.state[statInput];
          this.setState({ baseStats }, () => {
            this.validateStats();
          });
        }
      );
    }
  }

  incStat(e) {
    const statType = e.target.dataset.stat;
    const stat = this.state.baseStats[statType];
    const statIncrement = Math.floor((stat - 1) / 10) + 2;
    const baseStats = { ...this.state.baseStats };
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
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  }

  preventDefault(e) {
    e.preventDefault();
  }

  clearInput(e) {
    e.target.value = '';
  }

  resetStats() {
    const baseStats = { ...this.state.baseStats };
    for (let stat in baseStats) {
      baseStats[stat] = 1;
    }
    this.setState({ baseStats, points: 1325 });
  }

  tooltipOn(e) {
    this.setState({ tooltip: true });
  }

  tooltipOff(e) {
    this.setState({ tooltip: false });
  }

  nameInput(e) {
    this.setState({ guild: e.target.value });
  }

  render() {
    const guild = this.state.guild;

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

    const points = this.state.points;

//formulas mostly based on https://irowiki.org/classic/Stats

    const baseLvl = 99;
    const baseAtk = Math.floor((baseLvl / 4) + str + dex / 5 + luk / 5) + Math.floor(str / 10) * 2 - 1;
    const baseDef = Math.floor(vit / 2 + Math.max(vit * 0.3, vit * vit / 150 - 1));
    const baseMatk = int + Math.floor(int / 7) * Math.floor(int / 7);
    const baseMdef = Math.floor(int + vit / 5 + dex / 5 + baseLvl / 4);
    const baseHit = 175 + baseLvl + dex + Math.floor(luk / 3);
    const baseCrit = luk * 0.3 + 1;
    const baseFlee = 100 + baseLvl + agi + Math.floor(luk / 5);
    //aspd formula? => https://www.novaragnarok.com/wiki/Attack_Speed
    const baseAspd = 156;
    const aspdEquip = 5 + 3;
    const aspdStatBonus = Math.sqrt(dex * dex / 5 + agi * agi / 2) / 4;

    const atk = baseAtk;
    const atkAdd = 0;
    const def = baseDef;
    const defAdd = 0;
    const matkMin = baseMatk;
    const matkMax = int + Math.floor(int / 5) * Math.floor(int / 5);
    const matkAdd = 0;
    const mdef = baseMdef;
    const mdefAdd = 0;
    const hit = baseHit;
    const crit = Math.floor(baseCrit);
    const flee = baseFlee;
    const perfectDodge = Math.floor(luk / 10) + 1;

    const aspdBase = baseAspd - aspdEquip + aspdStatBonus + (aspdStatBonus * agi / 200);
    const aspd = Math.floor(aspdBase);

    const strIncrement = Math.floor((str - 1) / 10) + 2;
    const agiIncrement = Math.floor((agi - 1) / 10) + 2;
    const vitIncrement = Math.floor((vit - 1) / 10) + 2;
    const intIncrement = Math.floor((int - 1) / 10) + 2;
    const dexIncrement = Math.floor((dex - 1) / 10) + 2;
    const lukIncrement = Math.floor((luk - 1) / 10) + 2;

    return (
      <div>
        <table className={styles.status}>
          <thead className={styles.header}>
            <tr>
              <td colSpan="9">
                <span className={styles.dotmove} draggable onDragStart={e => this.onDragStart(e)}></span>
                <span>Status</span>
              </td>
              <td className={styles.floatr}>
                <div className={styles.dot}>
                  <div className={styles.dotletter} onClick={e => this.clickCloseStats()}>
                    -
                </div>
                </div>
                <div className={styles.dot}>
                  <div className={styles.dotletter} onClick={e => this.resetStats(e)} onMouseOver={e => this.tooltipOn(e)} onMouseOut={e => this.tooltipOff(e)}>
                    x
                  </div>
                </div>
                <div className={this.state.tooltip ? styles.tooltip : styles.hide}>
                  Reset Status Points
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className={this.state.showStats ? styles.unhide : styles.hide}>
              <td className={styles.borderu}>&nbsp;Str&nbsp;</td>
              <td className={[styles.background, styles.borderudl].join(' ')}>
                <form onSubmit={e => this.preventDefault(e)}>
                  <input
                    className={styles.formlenstats}
                    data-stat="str"
                    placeholder={str}
                    maxLength="2"
                    type="text"
                    pattern="[0-9]*"
                    onKeyUp={e => this.statInput(e)}
                    onBlur={e => this.clearInput(e)}
                  />
                </form>
              </td>
              <td className={[styles.background, styles.borderud].join(' ')}>{strBonus !== 0 && '+'}</td>
              <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{strBonus !== 0 && `${strBonus}`}</td>
              <td className={styles.background}>
                {this.state.points >= strIncrement && str < 99 ?
                  <span
                    onClick={e => this.incStat(e)}
                    data-stat="str"
                    onMouseDown={e => this.incStatPush(e)}
                    onMouseUp={e => this.incStatRelease(e)}
                    className={this.state.strPress ? styles.trianglerpress : styles.triangler}
                  >
                  </span> :
                  <span className={styles.trianglerhide}></span>
                }
              </td>
              <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{strIncrement}</td>
              <td className={styles.borderu}>
                &nbsp;
              <span className={styles.underline}>Atk</span>
              </td>
              <td className={styles.borderu}>
                <span className={styles.underline}>{atk} + {atkAdd}</span>
              </td>
              <td className={styles.borderu}>
                &nbsp;
              <span className={styles.underline}>Def</span>
              </td>
              <td className={[styles.textRight, styles.borderu].join(' ')}>
                <span className={styles.underline}>{def} + {defAdd}</span>
                &nbsp;
            </td>
            </tr>
            <tr className={this.state.showStats ? styles.unhide : styles.hide}>
              <td>&nbsp;Agi&nbsp;</td>
              <td className={[styles.background, styles.borderudl].join(' ')}>
                <form onSubmit={e => this.preventDefault(e)}>
                  <input
                    className={styles.formlenstats}
                    data-stat="agi"
                    placeholder={agi}
                    maxLength="2"
                    type="text"
                    pattern="[0-9]*"
                    onKeyUp={e => this.statInput(e)}
                    onBlur={e => this.clearInput(e)}
                  />
                </form>
              </td>
              <td className={[styles.background, styles.borderud].join(' ')}>{agiBonus !== 0 && '+'}</td>
              <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{agiBonus !== 0 && `${agiBonus}`}</td>
              <td className={styles.background}>
                {this.state.points >= agiIncrement && agi < 99 ?
                  <span
                    onClick={e => this.incStat(e)}
                    data-stat="agi"
                    onMouseDown={e => this.incStatPush(e)}
                    onMouseUp={e => this.incStatRelease(e)}
                    className={this.state.agiPress ? styles.trianglerpress : styles.triangler}
                  >
                  </span> :
                  <span className={styles.trianglerhide}></span>
                }
              </td>
              <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{agiIncrement}</td>
              <td>
                &nbsp;
              <span className={styles.underline}>Matk</span>
              </td>
              <td>
                <span className={styles.underline}>{matkMin} ~ {matkMax}</span>
              </td>
              <td>
                &nbsp;
              <span className={styles.underline}>Mdef</span>
              </td>
              <td className={styles.textRight}>
                <span className={styles.underline}>{mdef} + {mdefAdd}</span>
                &nbsp;
            </td>
            </tr>
            <tr className={this.state.showStats ? styles.unhide : styles.hide}>
              <td>&nbsp;Vit&nbsp;</td>
              <td className={[styles.background, styles.borderudl].join(' ')}>
                <form onSubmit={e => this.preventDefault(e)}>
                  <input
                    className={styles.formlenstats}
                    data-stat="vit"
                    placeholder={vit}
                    maxLength="2"
                    type="text"
                    pattern="[0-9]*"
                    onKeyUp={e => this.statInput(e)}
                    onBlur={e => this.clearInput(e)}
                  />
                </form>
              </td>
              <td className={[styles.background, styles.borderud].join(' ')}>{vitBonus !== 0 && '+'}</td>
              <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{vitBonus !== 0 && `${vitBonus}`}</td>
              <td className={styles.background}>
                {this.state.points >= vitIncrement && vit < 99 ?
                  <span
                    onClick={e => this.incStat(e)}
                    data-stat="vit"
                    onMouseDown={e => this.incStatPush(e)}
                    onMouseUp={e => this.incStatRelease(e)}
                    className={this.state.vitPress ? styles.trianglerpress : styles.triangler}
                  >
                  </span> :
                  <span className={styles.trianglerhide}></span>
                }
              </td>
              <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{vitIncrement}</td>
              <td>
                &nbsp;
              <span className={styles.underline}>Hit</span>
              </td>
              <td className={styles.textRight}>
                <span className={styles.underline}>{hit}</span>
              </td>
              <td>
                &nbsp;
              <span className={styles.underline}>Flee</span>
              </td>
              <td>
                <span className={styles.underline}>{flee} + {perfectDodge}</span>
                &nbsp;
            </td>
            </tr>
            <tr className={this.state.showStats ? styles.unhide : styles.hide}>
              <td>&nbsp;Int&nbsp;</td>
              <td className={[styles.background, styles.borderudl].join(' ')}>
                <form onSubmit={e => this.preventDefault(e)}>
                  <input
                    className={styles.formlenstats}
                    data-stat="int"
                    placeholder={int}
                    maxLength="2"
                    type="text"
                    pattern="[0-9]*"
                    onKeyUp={e => this.statInput(e)}
                    onBlur={e => this.clearInput(e)}
                  />
                </form>
              </td>
              <td className={[styles.background, styles.borderud].join(' ')}>{intBonus !== 0 && '+'}</td>
              <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{intBonus !== 0 && `${intBonus}`}</td>
              <td className={styles.background}>
                {this.state.points >= intIncrement && int < 99 ?
                  <span
                    onClick={e => this.incStat(e)}
                    data-stat="int"
                    onMouseDown={e => this.incStatPush(e)}
                    onMouseUp={e => this.incStatRelease(e)}
                    className={this.state.intPress ? styles.trianglerpress : styles.triangler}
                  >
                  </span> :
                  <span className={styles.trianglerhide}></span>
                }
              </td>
              <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{intIncrement}</td>
              <td>
                &nbsp;
              <span className={styles.underline}>Critical</span>
              </td>
              <td className={styles.textRight}>
                <span className={styles.underline}>{crit}</span>
              </td>
              <td>
                &nbsp;
              <span className={styles.underline}>Aspd</span>
              </td>
              <td className={styles.textRight}>
                <span className={styles.underline}>{aspd}</span>
                &nbsp;
            </td>
            </tr>
            <tr className={this.state.showStats ? styles.unhide : styles.hide}>
              <td>&nbsp;Dex&nbsp;</td>
              <td className={[styles.background, styles.borderudl].join(' ')}>
                <form onSubmit={e => this.preventDefault(e)}>
                  <input
                    className={styles.formlenstats}
                    data-stat="dex"
                    placeholder={dex}
                    maxLength="2"
                    type="text"
                    pattern="[0-9]*"
                    onKeyUp={e => this.statInput(e)}
                    onBlur={e => this.clearInput(e)}
                  />
                </form>
              </td>
              <td className={[styles.background, styles.borderud].join(' ')}>{dexBonus !== 0 && '+'}</td>
              <td className={[styles.textRight, styles.background, styles.borderud].join(' ')}>{dexBonus !== 0 && `${dexBonus}`}</td>
              <td className={styles.background}>
                {this.state.points >= dexIncrement && dex < 99 ?
                  <span
                    onClick={e => this.incStat(e)}
                    data-stat="dex"
                    onMouseDown={e => this.incStatPush(e)}
                    onMouseUp={e => this.incStatRelease(e)}
                    className={this.state.dexPress ? styles.trianglerpress : styles.triangler}
                  >
                  </span> :
                  <span className={styles.trianglerhide}></span>
                }
              </td>
              <td className={[styles.textRight, styles.background, styles.borderurd].join(' ')}>{dexIncrement}</td>
              <td colSpan="2">
                &nbsp;
              <span className={styles.underline}>Status Point</span>
              </td>
              <td colSpan="2" className={styles.textRight}>
                <span className={styles.underline}>{points}</span>
                &nbsp;
            </td>
            </tr>
            <tr className={this.state.showStats ? styles.unhide : styles.hide}>
              <td>&nbsp;Luk&nbsp;</td>
              <td className={[styles.background, styles.borderudl, styles.borderlast].join(' ')}>
                <form onSubmit={e => this.preventDefault(e)}>
                  <input
                    className={styles.formlenstats}
                    data-stat="luk"
                    placeholder={luk}
                    maxLength="2"
                    type="text"
                    pattern="[0-9]*"
                    onKeyUp={e => this.statInput(e)}
                    onBlur={e => this.clearInput(e)}
                  />
                </form>
              </td>
              <td className={[styles.background, styles.borderud, styles.borderlast].join(' ')}>{lukBonus !== 0 && '+'}</td>
              <td className={[styles.textRight, styles.background, styles.borderud, styles.borderlast].join(' ')}>{lukBonus !== 0 && `${lukBonus}`}</td>
              <td className={[styles.background, styles.borderlast].join(' ')}>
                {this.state.points >= lukIncrement && luk < 99 ?
                  <span
                    onClick={e => this.incStat(e)}
                    data-stat="luk"
                    onMouseDown={e => this.incStatPush(e)}
                    onMouseUp={e => this.incStatRelease(e)}
                    className={this.state.lukPress ? styles.trianglerpress : styles.triangler}
                  >
                  </span> :
                  <span className={styles.trianglerhide}></span>
                }
              </td>
              <td className={[styles.textRight, styles.background, styles.borderurd, styles.borderlast].join(' ')}>{lukIncrement}</td>
              <td>
                &nbsp;
              <span className={styles.underline}>Guild</span>
              </td>
              <td colSpan="3" className={styles.textRight}>
                <span className={styles.underline}>
                  <form onSubmit={e => this.preventDefault(e)} className={styles.guildform}>
                    <input
                      className={styles.formlenguild}
                      data-name="guild"
                      placeholder={guild}
                      maxLength="15"
                      type="text"
                      onKeyUp={e => this.nameInput(e)}
                      onBlur={e => this.clearInput(e)}
                    />
                  </form>
                </span>
                &nbsp;
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const StatusPoints = connect(mapStateToProps, mapDispatchToProps)(ConnectedStatusPoints);

export default StatusPoints;

/*
plan:
class templates
  {  
    id: 1
    basicInfo: {
      name,
      hpCurrent,
      hpMax,
      spCurrent,
      spMax,
      baseLvl,
      jobLvl,
      weightCurrent,
      weightMax,
      zeny,
    },
    char : {
      gender,
      face,
      body,
    },
    equip: {
      hat,
      ear,
      mouth,
      body,
      hand1,
      hand2,
      muffler,
      feet,
      acc1,
      acc2,
    },
    status: {
      basic: {
        guild,
        pointsLeft,
        strBase,
        strJob,
        strEquip,
        agiBase,
        agiJob,
        agiEquip,
        vitBase,
        vitJob,
        vitEquip,
        intBase,
        intJob,
        intEquip,
        dexBase,
        dexJob,
        dexEquip,
        lukBase,
        lukJob,
        lukEquip,
      },
      adv: {
        atkEquip,
        atkBonus,
        defEquip,
        defBonus,
        matkEquip,
        matkBonus,
        mdefEquip,
        mdefBonus,
        hitEquip,
        hitBonus,
        fleeEquip,
        fleeBonus,
        critEquip,
        critBonus,
        aspdBase,
        aspdEquip,
        aspdBonus,
      }
    },
    skills {
      varies by class...
    }
  }
*/