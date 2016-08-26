'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',
  serialize: function () {
    return {
      id: this.get('id'),
      title: this.get('title'),
      release_year: this.get('release_year'),
      object: 'movie'
    };
  },
  filter: function (filter) {
    return this.query((qb) => {
      if (filter.year) {
        filter.max_year = filter.year;
        filter.min_year = filter.year;
      }
      if (filter.max_year) {
        qb.where('release_year', '<',  filter.max_year + 1);
      }
      if (filter.min_year) {
        qb.where('release_year', '>',  filter.min_year - 1);
      }
      if (filter.title) {
        qb.where({ title: filter.title });
      }
    });
  }
});

