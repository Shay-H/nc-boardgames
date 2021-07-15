export const formatDateTime = (dateTime) => {
  return new Intl.DateTimeFormat("en-gb", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(Date.parse(dateTime));
};

export const parseFilters = (filterObj) => {
  return Object.keys(filterObj)
    .filter((key) => ["string", "number"].includes(typeof filterObj[key]))
    .map((key) => {
      return `${key}=${filterObj[key]}`;
    })
    .join("&");
};

export const parseCategory = (category) => {
  return category
    .replaceAll("-", " ")
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
