import React, { Component } from "react";
import { getMovies } from "./getMovies";

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: getMovies(),
        };
    }
    render() {
        return (
            <div>
                {this.state.movies.map((movie) => (
                    <div className="movie-item" key={movie._id}>
                        <span>{movie.title}</span>
                        <span>{movie.genre.name}</span>
                        <span>{movie.numberInStock}</span>
                        <span>{movie.dailyRentalRate}</span>
                        <button>Delete</button>
                    </div>
                ))}
            </div>
        );
    }
}
