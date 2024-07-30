const filterName = [{}];
export default function FiltersItemsCatch(name) {
  if (name) {
    filterName.length = 0;
    filterName.push(name);
  }

  return filterName[0];
}
