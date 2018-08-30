const photographerKey = {
  userNames: 'userName',
  names: 'name',
  levels: 'level',
  passwords: 'password',
  ages: 'age',
  photographerId: '_id'
};

exports.Photographers = (obj, passwordHash) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  let objConvert = {}

  keys.map((item, index) => {
    if (photographerKey[item] === 'password') {
      objConvert[photographerKey[item]] = passwordHash;
    } else {
      objConvert[photographerKey[item]] = values[index];
    }
  })

  return objConvert;
}
