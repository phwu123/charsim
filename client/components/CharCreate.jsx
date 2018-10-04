import React, { Component } from 'react';
import styles from './CharCreate.css';
import Face from './Face.jsx';
import Color from './Color.jsx'

export default class CharCreate extends Component {
  constructor() {
    super();
    this.state = {
      job: ['Lord Knight', 'High Priest', 'High Wizard'],
      // job: ['Lord Knight','High Priest', 'High Wizard', 'Whitesmith', 'Assassin Cross', 'Sniper', 'Paladin', 'Champion', 'Professor', 'Creator', 'Stalker'],
      faces: [0, 1, 2],
      name: 'Name',
      hairColor: [styles.red, styles.yellow, styles.blue],
      // hairColor: [styles.red, styles.yellow, styles.blue, styles.brown],
      clothColor: [styles.base, styles.red, styles.blue],
      // clothColor: [styles.base, styles.red, styles.blue, styles.green],
      clothList: true,
      hairBar: styles.red,
      clothBar: styles.base,
      class: 'swordman21',
      gender: 'm',
      face: 0,  
      hair: 0,
      cloth: 0,
      pose: 0,
      turn: 0,
      image: '', // class, gender, face, hair, clothes, pose, turn
    }
    this.hideList = this.hideList.bind(this);
    this.selectColor = this.selectColor.bind(this);
  }

  componentDidMount() {
    
  }

  preventDefault(e) {
    e.preventDefault();
  }

  nameInput(e) {
    this.setState({ name: e.target.value });
  }

  clearInput(e) {
    e.target.value = '';
  }

  selectGender(e) {
    if (e.currentTarget.value !== this.state.gender) {
      this.setState({ gender: e.currentTarget.value });
    }
  }

  turnCharacter(e) {
    const dir = e.target.dataset.dir;
    if (dir === 'r')
      if (this.state.turn < 6)
        this.setState({ turn: this.state.turn + 2 });
      else
        this.setState({ turn: 0 });
    else
      if (this.state.turn > 0)
        this.setState({ turn: this.state.turn - 2 });
      else
        this.setState({ turn: 6 });
  }

  clickTurnOn(e) {
    this.setState({ [`click${e.target.dataset.dir}`]: true });
  }

  clickTurnOff(e) {
    this.setState({ [`click${e.target.dataset.dir}`]: false});
  }

  selectColor(e) {
    const num = e.target.dataset.num;
    const type = e.target.dataset.type;
    if (this.state[type] !== num)
      this.setState({ [type]: num });
  }

  selectClass(e) {
    const value = Number(e.target.value);
    if (value === 0)
      this.setState({ class: 'swordman21' });
    if (value === 1)
      this.setState({ class: 'acolyte21' });
    if (value === 2)
      this.setState({ class: 'mage21' });
    // if (value === 3)
    //   this.setState({ class: 'merchant21'});
    // if (value === 4)
    //   this.setState({ class: 'thief21'});
    // if (value === 5)
    //   this.setState({ class: 'archer21'});
    // if (value === 6)
    //   this.setState({ class: 'swordman22'});
    // if (value === 7)
    //   this.setState({ class: 'acolyte22'});
    // if (value === 8)
    //   this.setState({ class: 'mage22'});
    // if (value === 9)
    //   this.setState({ class: 'merchant22'});
    // if (value === 10)
    //   this.setState({ class: 'archer22'});
    // if (value === 11)
    //   this.setState({ class: 'thief22'});
  }

  colorChange(e) {
    const value = Number(e.target.value);
    const type = e.target.dataset.type;
    this.setState({ [`${type}Bar`]: this.state[`${type}Color`][value] });
  }

  toggleList(e) {
    const type = e.target.dataset.type
    this.setState({ 
      [`show${type}`]: !this.state[`show${type}`],
    }, () => {
      if (this.state.showhair)
        this.setState({ showcloth: false })
    });
  }

  hideList(e) {
    const type = e.target.dataset.type;
    this.setState({ 
      [`show${type}`]: false,
      [`${type}Bar`]: e.target.className
    }, () => {
      if (!this.state.showhair)
        this.setState({ showcloth: false })
    });
  }

  changePose() {
    if (this.state.pose < 1)
      this.setState({ pose: this.state.pose + 1 });
    else
      this.setState({ pose: 0 });
  }

  render() {
    return (
      <div>
      <div className={styles.grid}>
        <div className={styles.selectClass}>
          <select
            className={styles.selectJob}
            onChange={e => this.selectClass(e)}
          >
            {this.state.job.map((j, i) => (
              <option value={i} key={i}>{j}</option>
            ))}
            {/* <option value={this.state.gender === 'm' ? 11 : 12}>{this.state.gender === 'm' ? 'Minstrel' : 'Wanderer'}</option> */}
          </select>
        </div>
        <div className={styles.msign}>
          <button 
            className={styles.button}
            onClick={e => this.selectGender(e)}
            value='m'
          >
            <img src={this.state.gender === 'm' ?'https://s3-us-west-1.amazonaws.com/ph-charsim/char-misc/maleOn.png' : 'https://s3-us-west-1.amazonaws.com/ph-charsim/char-misc/male.png'} />
          </button>
        </div>
        <div className={styles.fsign}>
          <button 
            className={styles.button}
            onClick={e => this.selectGender(e)}
            value='f'
          >
            <img src={this.state.gender === 'f' ?'https://s3-us-west-1.amazonaws.com/ph-charsim/char-misc/femaleOn.png' : 'https://s3-us-west-1.amazonaws.com/ph-charsim/char-misc/female.png'} />
          </button>
        </div>
        <div className={styles.pic}>
          <img 
            src={`https://s3-us-west-1.amazonaws.com/ph-charsim/char-char/${this.state.class}${this.state.gender}${this.state.face}${this.state.hair}${this.state.cloth}${this.state.pose}${this.state.turn}.png`}
            className={styles.pointer}
          />
        </div>
        {this.state.faces.map((f, i) => (
          <div className={styles.center} key={i}>
            <Face
              img={`https://s3-us-west-1.amazonaws.com/ph-charsim/char-misc/${this.state.gender}${i}.gif`}
              num={i}
              type='face'
              selectColor={this.selectColor}
            />
          </div>
        ))}
        <div className={styles.hairDye}>
          Hair: <br/> 
          <ul className={styles.list}>
            <li 
              className={this.state.hairBar}
              onClick={(e) => this.toggleList(e)}
              data-type='hair'
            >&emsp;&emsp;&ensp;</li>
            {this.state.hairColor.map((color, i) => (
              <Color
                color={this.state.showhair ? color : styles.hide}
                key={i}
                hideList={this.hideList}
                selectColor={this.selectColor}
                type='hair'
                num={i}
              />
            ))}
          </ul>
        </div>
        <div className={styles.costumeDye}>
          Cloth: <br/>
          <ul className={styles.list}>
            <li 
              className={this.state.clothList && !this.state.showhair ? this.state.clothBar : styles.hide}
              onClick={(e) => this.toggleList(e)}
              data-type='cloth'
            >Base&ensp;</li>
            {this.state.clothColor.map((color, i) => (
              <Color
                color={this.state.showcloth ? color : styles.hide}
                key={i}
                hideList={this.hideList}
                selectColor={this.selectColor}
                type='cloth'
                num={i}
              />
            ))}
          </ul>
        
        </div>
        <div className={styles.inputName}>
          <form
            onSubmit={e => this.preventDefault(e)}
            className={styles.nameform}
          >
            <input
              className={styles.formlenname}
              placeholder={this.state.name}
              onKeyUp={e => this.nameInput(e)}
              onBlur={e => this.clearInput(e)}
              maxLength="15"
            />
          </form>
        </div>
      </div>
        <div className={styles.turn}>
          <span
            className={this.state.clickr ? styles.trianglerpress : styles.triangler}
            data-dir='r'
            onMouseDown={e => this.clickTurnOn(e)}
            onMouseUp={e => this.clickTurnOff(e)}
            onClick={e => this.turnCharacter(e)}
          >
          </span>
          <span 
            className={this.state.clickl ? styles.trianglelpress : styles.trianglel}
            data-dir='l'
            onMouseDown={e => this.clickTurnOn(e)}
            onMouseUp={e => this.clickTurnOff(e)}
            onClick={e => this.turnCharacter(e)}
          >
          </span>
        </div>
        <div 
          className={styles.changePose}
          onClick={() => this.changePose()}
        ></div>

      </div>
    )
  }
}


// ['Lord Knight','High Priest', 'High Wizard', 'Whitesmith', 'Assassin Cross', 'Sniper', 'Paladin', 'Champion', 'Professor', 'Creator', 'Stalker']

// clothColor: [styles.base, styles.red, styles.blue, styles.green],

/*
flk red 39 blue 50 green 95
fhp red 42  blue 50  green 44
fhw red 24 blue 30
mlk red 39 blue 50 green 95
mp red 14 blue 15
mw red 24 blue 30

*/