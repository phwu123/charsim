import React from 'react';
import styles from './Face.css';

const Face = (props) => {
  return(
      <img
        className={styles.pointer} 
        src={props.img}
        data-num={props.num}
        data-type={props.type}
        onClick={e => props.selectColor(e)}
      />
  )
}

export default Face;