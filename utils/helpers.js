export const filterItems = (items, filters) => {
  return items.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const ownerMatch = item.owner
      .toLowerCase()
      .includes(filters.owner.toLowerCase());
    const quantityMatch =
      item.quantity >= filters.minQuantity &&
      item.quantity <= filters.maxQuantity;
    return nameMatch && ownerMatch && quantityMatch;
  });
};

export const sortItems = (items, sortBy, sortOrder) => {
  return [...items].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};
