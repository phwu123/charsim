import React, { Component } from 'react';
import styles from './StatusPoints.css';
import { connect } from 'react-redux';
import * as action from './actions';
import store from './store';
import StatusChange from './StatusChange.jsx';

const mapStateToProps = (state) => {
  return { 
    all: state.status.basic,
    adv: state.status.adv,
    str: state.status.basic.strBase,
    agi: state.status.basic.agiBase,
    vit: state.status.basic.vitBase,
    int: state.status.basic.intBase,
    dex: state.status.basic.dexBase,
    luk: state.status.basic.lukBase,
    guild: state.status.basic.guild,
    points: state.status.basic.pointsLeft,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    incstr: (num) => dispatch(action.incstr(num)),
    incagi: (num) => dispatch(action.incagi(num)),
    incvit: (num) => dispatch(action.incvit(num)),
    incint: (num) => dispatch(action.incint(num)),
    incdex: (num) => dispatch(action.incdex(num)),
    incluk: (num) => dispatch(action.incluk(num)),
    guildName: (name) => dispatch(action.guildName(name)),
    setPoints: (increment) => dispatch(action.setPoints(increment)),
    resetStats: () => dispatch(action.resetStats()),
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
    this.incStat = this.incStat.bind(this);
    this.incStatPush = this.incStatPush.bind(this);
    this.incStatRelease = this.incStatRelease.bind(this);
    this.statInput = this.statInput.bind(this);
  }

  componentDidMount() {
  //  console.log(store.getState())
  }

  clickCloseStats() {
    this.setState({ showStats: !this.state.showStats });
  }

  validateStats() {
    let pointsLeft = 1325
    for (let stats in this.props.all) {
      if (stats[3] === 'B') {
        const stat = this.props.all[stats];
        let count = 1;
        let increment = 2;
        while (count < stat && pointsLeft >= increment) {
          increment = Math.floor((count - 1) / 10) + 2;
          pointsLeft -= increment
          count += 1;
        }
      }
    }
    this.props.setPoints(pointsLeft);
  }

  maxAllowed(type) {
    let points = this.props.points;
    let stat = this.props.all[`${type}Base`]
    let increment = Math.floor((stat - 1) / 10) + 2;
    while (points >= increment && stat < 99) {
      increment = Math.floor((stat - 1) / 10) + 2;
      points -= increment;
      stat += 1;
    }
    return stat;
  }

  statInput(e) {
    const stat = e.target.dataset.stat;
    const value = e.target.validity.valid && e.target.value > 0 ? Number(e.target.value) : 1;
    const maxStat = this.maxAllowed(stat);
    this.setState(
      { [`${stat}Input`]: value}, () => {
        const input = this.state[`${stat}Input`];
        if (input > maxStat) {
          this.props[`inc${stat}`](maxStat);
        } else {
          this.props[`inc${stat}`](input);
        }
        setTimeout(() => {
          this.validateStats();
        }, 0);
      }
    );
  }

  incStat(e) {
    const statType = e.target.dataset.stat;
    const props = this.props;
    const stat = props[`${statType}`];
    const increment = Math.floor((stat - 1) / 10) + 2;
    props[`inc${statType}`](stat + 1);
    props.setPoints(props.points - increment);
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
    this.props.resetStats();
  }

  tooltipOn(e) {
    this.setState({ tooltip: true });
  }

  tooltipOff(e) {
    this.setState({ tooltip: false });
  }

  nameInput(e) {
    this.setState({ guild: e.target.value }, () => {
      this.props.guildName(this.state.guild);
    });
  }

  render() {
    const { guild, str, agi, vit, int, dex, luk } = this.props;
    const { atkBonus, defSoftBonus, defHardBase, defHardBonus, matkBonus, mdefSoftBonus, mdefHardBase, mdefHardBonus, hitBonus, fleeBonus, critBonus, aspdBase, aspdBonus } = this.props.adv;
    //formulas mostly based on https://irowiki.org/classic/Stats

    const levelBase = 99;
    const atkBase = Math.floor((levelBase / 4) + str + dex / 5 + luk / 5) + Math.floor(str / 10) * 2 - 1;
    const defBase = Math.floor(vit / 2 + Math.max(vit * 0.3, vit * vit / 150 - 1));
    const matkBase = int + Math.floor(int / 7) * Math.floor(int / 7);
    const mdefBase = Math.floor(int + vit / 5 + dex / 5 + levelBase / 4);
    const hitBase = 175 + levelBase + dex + Math.floor(luk / 3);
    const critBase = luk * 0.3 + 1;
    const fleeBase = 100 + levelBase + agi + Math.floor(luk / 5);
    //aspd formula? => https://www.novaragnarok.com/wiki/Attack_Speed
    const aspdEquip = 5 + 3;
    const aspdStatBonus = Math.sqrt(dex * dex / 5 + agi * agi / 2) / 4;

    const atk = atkBase + atkBonus;
    const defSoft = defBase + defSoftBonus;
    const defHard = defHardBase + defHardBonus;
    const matkMin = matkBase + matkBonus;
    const matkMax = int + Math.floor(int / 5) * Math.floor(int / 5) + matkBonus;
    const mdefSoft = mdefBase + mdefSoftBonus;
    const mdefHard = mdefHardBase + mdefHardBonus;
    const hit = hitBase + hitBonus;
    const crit = Math.floor(critBase) + critBonus;
    const flee = fleeBase + fleeBonus;
    const perfectDodge = Math.floor(luk / 10) + 1;

    const aspd = Math.floor(aspdBase - aspdEquip + aspdStatBonus + (aspdStatBonus * agi / 200));

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
              <StatusChange 
                statInput={this.statInput}
                clearInput={this.clearInput}
                incStat={this.incStat}
                incStatPush={this.incStatPush}
                incStatRelease={this.incStatRelease}
                preventDefault={this.preventDefault} 
                strPress={this.state.strPress} 
                stat="str"
              />
              <td className={styles.borderu}>
                &nbsp;
                <span className={styles.underline}>Atk</span>
              </td>
              <td className={styles.borderu}>
                <span className={styles.underline}>{atk} + {atkBonus}</span>
              </td>
              <td className={styles.borderu}>
                &nbsp;
              <span className={styles.underline}>Def</span>
              </td>
              <td className={[styles.textRight, styles.borderu].join(' ')}>
                <span className={styles.underline}>{defSoft} + {defHard}</span>
                &nbsp;
            </td>
            </tr>
            <tr className={this.state.showStats ? styles.unhide : styles.hide}>
              <td>&nbsp;Agi&nbsp;</td>
              <StatusChange 
                statInput={this.statInput}
                clearInput={this.clearInput}
                incStat={this.incStat}
                incStatPush={this.incStatPush}
                incStatRelease={this.incStatRelease}
                preventDefault={this.preventDefault} 
                agiPress={this.state.agiPress} 
                stat="agi"
              />
              <td>
                &nbsp;
              <span className={styles.underline}>Matk</span>
              </td>
              <td className={styles.textRight}>
                <span className={styles.underline}>{matkMin} ~ {matkMax}</span>
              </td>
              <td>
                &nbsp;
              <span className={styles.underline}>Mdef</span>
              </td>
              <td className={styles.textRight}>
                <span className={styles.underline}>{mdefSoft} + {mdefHard}</span>
                &nbsp;
            </td>
            </tr>
            <tr className={this.state.showStats ? styles.unhide : styles.hide}>
              <td>&nbsp;Vit&nbsp;</td>
              <StatusChange 
                statInput={this.statInput}
                clearInput={this.clearInput}
                incStat={this.incStat}
                incStatPush={this.incStatPush}
                incStatRelease={this.incStatRelease}
                preventDefault={this.preventDefault} 
                vitPress={this.state.vitPress} 
                stat="vit"
              />
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
              <StatusChange 
                statInput={this.statInput}
                clearInput={this.clearInput}
                incStat={this.incStat}
                incStatPush={this.incStatPush}
                incStatRelease={this.incStatRelease}
                preventDefault={this.preventDefault} 
                intPress={this.state.intPress} 
                stat="int"
              />
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
              <StatusChange 
                statInput={this.statInput}
                clearInput={this.clearInput}
                incStat={this.incStat}
                incStatPush={this.incStatPush}
                incStatRelease={this.incStatRelease}
                preventDefault={this.preventDefault} 
                dexPress={this.state.dexPress} 
                stat="dex"
              />
              <td colSpan="2">
                &nbsp;
              <span className={styles.underline}>Status Point</span>
              </td>
              <td colSpan="2" className={styles.textRight}>
                <span className={styles.underline}>{this.props.points}</span>
                &nbsp;
            </td>
            </tr>
            <tr className={this.state.showStats ? styles.unhide : styles.hide}>
              <td>&nbsp;Luk&nbsp;</td>
              <StatusChange 
                statInput={this.statInput}
                clearInput={this.clearInput}
                incStat={this.incStat}
                incStatPush={this.incStatPush}
                incStatRelease={this.incStatRelease}
                preventDefault={this.preventDefault} 
                lukPress={this.state.lukPress} 
                stat="luk"
              />
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