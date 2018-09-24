const getInitialState = (job) => {
  let str, agi, vit, int, dex, luk;
  if (job === 'paladin') {
    str = 9;
    agi = 7;
    vit = 10;
    int = 7;
    dex = 8;
    luk = 3;
  }
  const status = {
    id: 1,
    class: job,
    status: {
      basic: {
        guild: '',
        pointsLeft: 1325,
        strBase: 1,
        strJob: str,
        agiBase: 1,
        agiJob: agi,
        vitBase: 1,
        vitJob: vit,
        intBase: 1,
        intJob: int,
        dexBase: 1,
        dexJob: dex,
        lukBase: 1,
        lukJob: luk,
      },
      adv: {
        atkBonus: 0,
        defBonus: 0,
        matkBonus: 0,
        mdefBonus: 0,
        hitBonus: 0,
        fleeBonus: 0,
        critBonus: 0,
        aspdBase: 0,
        aspdBonus: 0,
      }
    }
  }
  return status;
};

export default getInitialState;