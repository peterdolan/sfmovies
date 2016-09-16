'use strict';

const Knex         = require('../../lib/libraries/knex');
const Movie        = require('../../lib/models/movie');
const MovieFactory = require('../factories/movie');

const movieA = MovieFactory.build({ release_year: 1986, title: 'movieA' });
const movieB = MovieFactory.build({ release_year: 1990 });

describe('movie model', () => {

  beforeEach(() => {
    return Knex.raw('TRUNCATE movies CASCADE')
    .then(() => {
      return Knex('movies').insert([movieA, movieB]);
    });
  });

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      const movie = Movie.forge().serialize();
      expect(movie).to.have.all.keys([
        'id',
        'title',
        'release_year',
        'object'
      ]);
    });
  });

  describe('filter', () => {

    it('correctly filters movies by release year', () => {
      const filter = { year: 1986 };

      return new Movie().filter(filter).fetchAll()
      .then((result) => {
        expect(result).to.have.length(1);
        expect(result.models[0].get('release_year')).to.eql(1986);
      });
    });

    it('correctly filters movies by release years', () => {
      const filter = { min_year: 1983, max_year: 1987 };

      return new Movie().filter(filter).fetchAll()
      .then((result) => {
        expect(result).to.have.length(1);
        expect(result.models[0].get('release_year')).to.eql(1986);
      });
    });

    it('correctly handles an empty filter', () => {
      const filter = { };

      return new Movie().filter(filter).fetchAll()
      .then((result) => {
        expect(result).to.have.length(2);
      });
    });
  });

});
