const products= require('../models/product')
class apiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
  
    const limitField = ['limit', 'page', 'sort', 'fields'];
    limitField.forEach((el) => {
      delete queryObj[el];
    });

    this.query.find(queryObj);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortList = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortList);
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  page() {
    const page = this.queryString.page * 1 || 1;
    const limit = 8 * 1 ;
    const skip = (page - 1) * limit;
    
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = apiFeature;
