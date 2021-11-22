export function serialize(obj) {
  let queryString = "";
  console.log(queryString);
  for (let key in obj) {
    queryString += `&${key}=${obj[key]}`;
    console.log(queryString);
  }
  return queryString;
}
