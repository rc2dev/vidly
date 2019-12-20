import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Input from './common/input';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearchChange = ({ target: input }) => {
    this.setState({
      selectedGenre: null,
      currentPage: 1,
      searchQuery: input.value
    });
  };

  getFilteredData = () => {
    const { movies: allMovies, selectedGenre, searchQuery } = this.state;

    if (selectedGenre && selectedGenre._id)
      return allMovies.filter(m => m.genre._id === selectedGenre._id);
    if (searchQuery)
      return allMovies.filter(m => m.title.toLowerCase().includes(searchQuery));
    return allMovies;
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn } = this.state;

    const filtered = this.getFilteredData();
    const ordered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(ordered, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      genres,
      selectedGenre
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary mb-4">
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <Input
            name="search"
            placeholder="Search..."
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
