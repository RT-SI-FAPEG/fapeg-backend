const indicators = require("./indicators.json");

const grouped = indicators.reduce((acc, current) => {
  if (!acc.hasOwnProperty(current.nme_area_conhec)) {
    const data = {
      ...acc,
      [current.nme_area_conhec]: 1,
    };

    return data;
  }

  const newValue = {
    ...acc,
    [current.nme_area_conhec]: (acc[current.nme_area_conhec] += 1),
  };

  return newValue;
}, {});

const result = Object.entries(grouped)
  .sort((a, b) => b[1] - a[1])
  .splice(0, 5)
  .reduce(
    (_sortedObj, [k, v]) => ({
      ..._sortedObj,
      [k]: v,
    }),
    {}
  );

console.log(result);
