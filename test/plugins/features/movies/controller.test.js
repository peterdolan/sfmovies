'use strict';

const Bluebird = require('bluebird');

const Controller      = require('../../../../lib/plugins/features/movies/controller');
const Knex            = require('../../../../lib/libraries/knex');
const Movie           = require('../../../../lib/models/movie');
const MovieFactory    = require('../../../factories/movie');
const LocationFactory = require('../../../factories/location');

const movieA = MovieFactory.build({ release_year: '1983', title: 'movieA' });
const movieB = MovieFactory.build({ release_year: '1986' });

const locationA = LocationFactory.build({ location: 'NYC', movie_id: movieA.id });

describe('movie controller', () => {

  beforeEach(() => {
    return Bluebird.all([
      Knex.raw('TRUNCATE movies CASCADE'),
      Knex.raw('TRUNCATE locations CASCADE')
    ])
    .then(() => {
      return Bluebird.all([
        Knex('movies').insert([movieA, movieB]),
        Knex('locations').insert([locationA])
      ]);
    });
  });

  describe('create', () => {

    it('creates a movie', () => {
      const payload = { title: 'WALL-E' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
      });
    });

  });

  describe('findAll', () => {

    it('queries the database by year', () => {
      const filter = { min_year: 1983, max_year: 1983 };
      return Controller.findAll(filter)
      .then((movies) => {
        expect(movies.at(0).get('release_year')).to.eql(1983);
      });
    });

    it('queries the database by years', () => {
      const filter = { min_year: 1983, max_year: 1986 };

      return Controller.findAll(filter)
      .then((movies) => {
        expect(movies.at(0).get('release_year')).to.eql(1983);
        expect(movies.at(1).get('release_year')).to.eql(1986);
      });
    });

    it('queries the database by title', () => {
      const filter = { title: 'movieA' };

      return Controller.findAll(filter)
      .then((movies) => {
        expect(movies).to.have.length(1);
        expect(movies.at(0).get('title')).to.eql('movieA');
      });
    });

    it('queries the database by location', () => {
      const filter = { location: 'NYC' };
      return Controller.findAll(filter)
      .then((movies) => {
        expect(movies).to.have.length(1);
        expect(movies.at(0).get('title')).to.eql('movieA');
      });
    });

    it('gets all with no filter', () => {
      return Controller.findAll()
      .then((movies) => {
        expect(movies).to.have.length(2);
      });
    });
  });

});
