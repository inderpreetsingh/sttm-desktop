const settingsJson = require('../../../main/common/constants/user-settings.json');

const { categories, settings } = settingsJson;

const filterObject = (obj, filter, filterValue) =>
  Object.keys(obj).reduce(
    (acc, val) =>
      obj[val][filter] !== filterValue
        ? acc
        : {
            ...acc,
            [val]: obj[val],
          },
    {},
  );

const settingsObjGenerator = () => {
  const settingsNewObj = {};
  Object.keys(categories).forEach(category => {
    if (categories[category].type === 'title') {
      settingsNewObj[category] = categories[category];
      settingsNewObj[category].subCatObjs = {};
      categories[category].subcategories.forEach(subCategory => {
        settingsNewObj[category].subCatObjs[subCategory] = categories[subCategory];
        settingsNewObj[category].subCatObjs[subCategory].settingObjs = {};
        settingsNewObj[category].subCatObjs[subCategory].settings.forEach(setting => {
          settingsNewObj[category].subCatObjs[subCategory].settingObjs[setting] = settings[setting];
          const subCat = settingsNewObj[category].subCatObjs[subCategory];
          if (subCat.type === 'range') {
            const { max, min, step } = subCat;
            subCat.settingObjs[setting].max = max;
            subCat.settingObjs[setting].min = min;
            subCat.settingObjs[setting].step = step;
          }
        });
      });
    }
  });
  return settingsNewObj;
};

export const settingsObj = settingsObjGenerator();

export const settingsNavObj = filterObject(categories, 'type', 'title');
