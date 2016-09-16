'use strict';

const Movies = require('../../../../lib/server');
const Knex   = require('../../../../lib/libraries/knex');
const MovieFactory = require('../../../factories/movie');

const movieA = MovieFactory.build({ release_year: '1983', title: 'movieA' });
const movieB = MovieFactory.build({ release_year: '1986' });

describe('movies integration', () => {

  beforeEach(() => {
    return Knex.raw('TRUNCATE movies CASCADE')
    .then(() => {
      return Knex('movies').insert([movieA, movieB]);
    });
  });

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('findAll', () => {

    it('Gets all movies', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET',
        filter: {}
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result).to.have.length(2);
        expect(response.result[0].object).to.eql('movie');
      });
    });

    it('Gets one titled movie', () => {
      return Movies.inject({
        url: '/movies?title=movieA',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result).to.have.length(1);
        expect(response.result[0].object).to.eql('movie');
      });
    });
  });

});
