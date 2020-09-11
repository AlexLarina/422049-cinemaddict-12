const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const updateItem = (items, update) => {
  const updateIndex = items.findIndex((item) => item.id === update.id);

  if (updateIndex === -1) {
    return items;
  }

  return [
    ...items.slice(0, updateIndex),
    update,
    ...items.slice(updateIndex + 1)
  ];
};

export {capitalize, updateItem};
