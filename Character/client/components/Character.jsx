import React, { Component } from 'react';
import styles from './Character.css';

export default class Character extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {

    return (
      <div>
        <table className={styles.table}>
          <thead >
            <tr>
        <th className={styles.title}>
            
                <span>Character</span>
        
          </th>
            </tr>
          </thead>
        </table>


        {/* // <div className={styles.grid}>
        //   <div className={styles.header}>Character Appearance</div>
        //   <div className={styles.male}>m</div>
        //   <div className={styles.female}>f</div>
        //   <div className={styles.jobType}>Class</div>
        //   <div className={styles.head1}>
        //     <img src='./images/f01.gif'></img> 
        //   </div>
        //   <div>stand</div>
        //   <div>battle</div>
        //   <div className={styles.pic}>
        //     <img src='./images/test1.png'></img>
        //   </div>
        //   <div className={styles.head2}>
        //     <img src='./images/f02.gif'></img> 
        //   </div>
        //   <div>sit</div>
        //   <div>mount</div>
        //   <div className={styles.head3}>
        //     <img src='./images/f03.gif'></img> 
        //   </div>
        //   <div className={styles.head4}>
        //     <img src='./images/f04.gif'></img> 
        //   </div>
        //   <div className={styles.name}>Name</div>
        //   <div className={styles.head5}>
        //     <img src='./images/f05.gif'></img> 
        //   </div>
        // </div> */}

      </div>
    )
  }
} 