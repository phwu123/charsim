import React from 'react';
import { connect } from 'react-redux';
import styles from './StatusChange.css';

const mapStateToProps = (state) => {
  return { 
    stats: state.statBasic,
    job: state.statJob,
  };
}

const ConnectedStatusChange = (props) => {
  const { stat, stats, job, preventDefault, statInput, clearInput, incStat, incStatPush, incStatRelease } = props;
  const increment = Math.floor((stats[`${stat}Base`] - 1) / 10) + 2
  return (
    <React.Fragment>
      <td className={stat !== 'luk' ? [styles.background, styles.borderudl].join(' ') : [styles.background, styles.borderudl, styles.borderlast].join(' ')}>
        <form onSubmit={e => preventDefault(e)}>
          <input
            className={styles.formlenstats}
            data-stat={stat}
            placeholder={stats[`${stat}Base`]}
            maxLength="2"
            type="text"
            pattern="[0-9]*"
            onKeyUp={e => statInput(e)}
            onBlur={e => clearInput(e)}
          />
        </form>
      </td>
      <td className={stat !== 'luk' ? [styles.background, styles.borderud].join(' ') : [styles.background, styles.borderud, styles.borderlast].join(' ')}>{job[`${stat}Job`] !== 0 && '+'}</td>
      <td className={stat !== 'luk' ? [styles.textRight, styles.background, styles.borderud].join(' ') : [styles.textRight, styles.background, styles.borderud, styles.borderlast].join(' ')}>{job[`${stat}Job`] !== 0 && job[`${stat}Job`]}</td>
      <td className={ stat !== 'luk'? styles.background : [styles.background, styles.borderlast].join(' ')}>
        {stats.pointsLeft >= increment && stats[`${stat}Base`] < 99 ?
          <span
            onClick={e => incStat(e)}
            data-stat={stat}
            onMouseDown={e => incStatPush(e)}
            onMouseUp={e => incStatRelease(e)}
            className={props[`${stat}Press`] ? styles.trianglerpress : styles.triangler}
          >
          </span> :
          <span className={styles.trianglerhide}></span>
        }
      </td>
      <td className={stat !=='luk' ? [styles.textRight, styles.background, styles.borderurd].join(' ') : [styles.textRight, styles.background, styles.borderurd, styles.borderlast].join(' ')}>{increment}</td>
    </React.Fragment>
  )
}

const StatusChange = connect(mapStateToProps)(ConnectedStatusChange);

export default StatusChange;