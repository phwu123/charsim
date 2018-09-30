import React from 'react';

const Color = (props) => {
  return(
    <li 
      className={props.color}
      onClick={(e) => { props.hideList(e); props.selectColor(e) }}
      data-type={props.type}
      data-num={props.num}
    >
      Base&ensp;
    </li>
  )
}

export default Color;