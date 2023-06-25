export function filterData(searchText, allTask) {
    const filterData = allTask.filter((task) =>
      task?.name?.toLowerCase()?.includes(searchText.toLowerCase())
    );
  
    return filterData;
  }
  