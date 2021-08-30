export default function addSeprator(data) {
  if (data) {
    return data.toLocaleString();
  } else {
    return data;
  }
}
const convertNumbers2English = string => {
  return string
    .replace(/[\u0660-\u0669]/g, function (c) {
      return c.charCodeAt(0) - 0x0660;
    })
    .replace(/[\u06f0-\u06f9]/g, function (c) {
      return c.charCodeAt(0) - 0x06f0;
    });
};
export const convertToSearchFormat = input => {
  let searchFilter = "$$";
  input.map(item => {
    if (item.type === "dateName") {
      item.name = "date";
      item.value = convertNumbers2English(item.value);
    }
    if (item.type === "dateName" || item.type === "date") {
      item.value = convertNumbers2English(item.value);
    }
    searchFilter = `${searchFilter},$$e.${item.name}$$${item.value}$$${item.opr}$$`;
    return searchFilter;
  });
  return `${searchFilter},$$`;
};
export const mapFieldsToSearchFields = (fields, values) => {
  const searchModel = [];
  fields.map(item => {
    if (values[item.id]) {
      const obj = {};
      obj.value = values[item.id];
      obj.name = item.id;
      obj.opr = item.opr;
      obj.type = item.type;
      searchModel.push(obj);
    }

    return searchModel;
  });
  return searchModel;
};
