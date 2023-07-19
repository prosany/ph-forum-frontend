const formatName = (name?: string): string => {
  if (!name) return "Guest User";
  let sliced = name.split(" ");
  if (sliced[0].toLowerCase().includes("md")) {
    return sliced[1].substring(0, 10) + "...";
  } else {
    return sliced[0].substring(0, 10) + "...";
  }
};

export default formatName;
