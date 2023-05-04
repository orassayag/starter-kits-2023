import CustomError from '../custom/error.custom.js';

export default class DataUtils {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Sort the data.
    *
    * This function gets the data collection and a comparer function and returns the sorted data.
    * @param data - The data to sort.
    * @param comparator - The function to compare and sort by.
    * @return {array<object>}
    */
  static sortData(data, comparator) {
    const sortArray = data.map((el, index) => [el, index]);
    sortArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (!order) {
        return a[1] - b[1];
      }
      return order;
    });
    return sortArray.map((el) => el[0]);
  }

  /**
    * Compare order.
    *
    * This function gets 2 objects and the sort by identifier column and return the lead
    * number to sort by after comparing between the 2 values.
    * @param a - The first object to compare.
    * @param b - The second object to compare.
    * @param sortBy - The sort by identifier column.
    * @return {array<object>}
    */
  static compareOrder(a, b, sortBy) {
    if (b[sortBy] < a[sortBy]) {
      return -1;
    }
    if (b[sortBy] > a[sortBy]) {
      return 1;
    }
    return 0;
  }

  /**
    * Compare order.
    *
    * This function gets the sort order and the sort by identifier column and return the
    * relevant function to perform the comparison.
    * @param sortOrder - The sort order, asc or desc.
    * @param sortBy - The sort by identifier column.
    * @return {function}
    */
  static comparatorFormat(sortOrder, sortBy) {
    return sortOrder === 'desc'
      ? (a, b) => this.compareOrder(a, b, sortBy)
      : (a, b) => -this.compareOrder(a, b, sortBy);
  }

  /**
    * Prepare the data.
    *
    * This function gets all the relevant parameters and return the relevant data according
    * to these parameters.
    * @param data - The sort order, asc or desc.
    * @param pageNumber - The page number. The default is 1.
    * @param pageSize - The number of items to return per page. The default is 10.
    * @param sortBy - The sort by identifier column. The default is firstName.
    * @param sortOrder - The sort order, asc or desc. The default is asc.
    * @return {array<object>}
    */
  static prepareData({
    data,
    pageNumber = 1,
    pageSize = 10,
    sortBy = 'firstName',
    sortOrder = 'asc',
  }) {
    const indexPageNumber = pageNumber - 1;
    return this.sortData(data, this.comparatorFormat(sortOrder, sortBy))
      .slice(indexPageNumber * pageSize, indexPageNumber * pageSize + pageSize);
  }

  /**
    * Select properties.
    *
    * This function gets a list of properties and return a function that filters the object
    * by these properties.
    * @param properties - The properties to filter the object.
    * @return {function}
    */
  static selectProperties(properties) {
    return (obj) => {
      const newObj = {};
      properties.forEach((name) => {
        newObj[name] = obj[name];
      });
      return newObj;
    };
  }
}
