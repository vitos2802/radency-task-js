import generateIcon from './taskIcon';

const stats = db => {
  return db.reduce((acc, obj) => {
    const newObj = {
      icon: generateIcon(obj.category),
      category: obj.category,
      active: 0,
      archived: 0,
    };

    obj.archived ? (newObj.archived += 1) : (newObj.active += 1);

    const filterAcc = acc.find(obj => obj.category === newObj.category);

    if (filterAcc && filterAcc.category === obj.category) {
      obj.archived ? (filterAcc.archived += 1) : (filterAcc.active += 1);
    } else {
      acc.push(newObj);
    }

    return acc;
  }, []);
};

export default stats;
