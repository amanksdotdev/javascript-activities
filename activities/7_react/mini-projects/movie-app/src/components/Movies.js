/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
// import { getMovies } from "./getMovies";
import "./Movies.css";

import axios from "axios";

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            searchText: "",
            sort: { order: "", value: "" },
            filter: "all",
            limit: 4,
            page: 1,
        };
    }

    //for loading async api data so it doesn't block rendering
    async componentDidMount() {
        let data = await axios.get(
            "https://backend-react-movie.herokuapp.com/movies"
        );
        this.setState({ movies: data.data.movies });
    }

    onDelete = (id) => {
        let filteredMovies = this.state.movies.filter(
            (movie) => movie._id !== id
        );
        this.setState({ movies: filteredMovies });
    };

    handleChange = (e) => {
        this.setState({ searchText: e.target.value });
    };

    handleSort = (order, value) => {
        this.setState({ sort: { order, value } });
    };

    handleFilter = (e) => {
        let filter = e.target.id;
        this.setState({ filter: filter, page: 1 });
        let allGenreLi = e.target.parentNode.firstChild;
        if (filter !== "all") {
            allGenreLi.classList.remove("active");
        } else {
            allGenreLi.classList.add("active");
        }
    };

    handlePage = (e) => {
        let el = e.target;
        let pageNum = Number.parseInt(el.innerText);
        this.setState({ page: pageNum });
    };

    handlePageNextPrev = (direction, totalPage) => {
        let page = this.state.page;
        if (direction === "next" && page < totalPage) {
            this.setState({ page: page + 1 });
        } else if (direction === "prev" && page > 1) {
            this.setState({ page: page - 1 });
        }
    };

    handleLimit = (e) => {
        this.setState({ limit: e.target.value });
    };

    render() {
        //search filter
        let filteredMovies = this.state.movies;
        if (this.state.searchText !== "") {
            filteredMovies = this.state.movies.filter((movie) =>
                movie.title
                    .trim()
                    .toLowerCase()
                    .includes(this.state.searchText.trim().toLowerCase())
            );
        }

        //genre filter
        let totalGenre = [
            ...new Set(this.state.movies.map((movie) => movie.genre.name)),
        ];
        let filter = this.state.filter;
        if (filter !== "all") {
            filteredMovies = filteredMovies.filter(
                (movie) => movie.genre.name.trim().toLowerCase() === filter
            );
        }

        //sorting
        let { order, value } = this.state.sort;
        if (value === "stock") {
            if (order === "asc")
                filteredMovies.sort(
                    (a, b) => a.numberInStock - b.numberInStock
                );
            else
                filteredMovies.sort(
                    (a, b) => b.numberInStock - a.numberInStock
                );
        } else if (value === "rate") {
            if (order === "asc")
                filteredMovies.sort(
                    (a, b) => a.dailyRentalRate - b.dailyRentalRate
                );
            else
                filteredMovies.sort(
                    (a, b) => b.dailyRentalRate - a.dailyRentalRate
                );
        }

        //pagination
        let totalMovies = filteredMovies; // for page numbers
        let totalNumOfPages = Math.ceil(totalMovies.length / this.state.limit);
        let si = (this.state.page - 1) * this.state.limit;
        let ei = this.state.page * this.state.limit;
        filteredMovies = filteredMovies.slice(si, ei);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        {/* genre filter input  */}
                        <h3>Filter by Genre</h3>
                        {/* If movies list empty then render loader else load all genre */}
                        {this.state.movies.length === 0 ? (
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <div className="list-group">
                                <button
                                    className="list-group-item list-group-item-action active"
                                    id="all"
                                    onClick={this.handleFilter}
                                >
                                    All Genre
                                </button>
                                {totalGenre.map((genre) => {
                                    let clsName =
                                        this.state.filter ===
                                        genre.trim().toLowerCase()
                                            ? "list-group-item list-group-item-action active"
                                            : "list-group-item list-group-item-action";
                                    return (
                                        <button
                                            className={clsName}
                                            id={genre.trim().toLowerCase()}
                                            onClick={this.handleFilter}
                                            key={genre.trim().toLowerCase()}
                                        >
                                            {genre[0].toUpperCase() +
                                                genre.slice(1)}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                        {/* page limit input  */}
                        <div className="form-group mt-3">
                            <label htmlFor="limit">
                                <h5>Movies per page:</h5>
                            </label>
                            <select
                                value={this.state.limit}
                                className="form-control"
                                id="limit"
                                onChange={this.handleLimit}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="input-group mb-3">
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                            >
                                🔍
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                onChange={this.handleChange}
                            />
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">
                                        Stock
                                        <span>
                                            <i
                                                onClick={() =>
                                                    this.handleSort(
                                                        "asc",
                                                        "stock"
                                                    )
                                                }
                                                className="fa fa-sort-up"
                                                aria-hidden="true"
                                            ></i>
                                            <i
                                                onClick={() =>
                                                    this.handleSort(
                                                        "desc",
                                                        "stock"
                                                    )
                                                }
                                                className="fa fa-sort-down"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                    </th>
                                    <th scope="col">
                                        Rate
                                        <span>
                                            <i
                                                onClick={() =>
                                                    this.handleSort(
                                                        "asc",
                                                        "rate"
                                                    )
                                                }
                                                className="fa fa-sort-up"
                                                aria-hidden="true"
                                            ></i>
                                            <i
                                                onClick={() =>
                                                    this.handleSort(
                                                        "desc",
                                                        "rate"
                                                    )
                                                }
                                                className="fa fa-sort-down"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* if movies list empty then render loader else render movies table data */}
                                {this.state.movies.length === 0 ? (
                                    <tr
                                        className="spinner-border text-primary"
                                        role="status"
                                    >
                                        <td className="sr-only">Loading...</td>
                                    </tr>
                                ) : (
                                    filteredMovies.map((movie) => (
                                        <tr
                                            className="movie-item"
                                            key={movie._id}
                                        >
                                            <td></td>
                                            <td>{movie.title}</td>
                                            <td>{movie.genre.name}</td>
                                            <td>{movie.numberInStock}</td>
                                            <td>{movie.dailyRentalRate}</td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => {
                                                        this.onDelete(
                                                            movie._id
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {/* pagination */}
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li
                                    onClick={() =>
                                        this.handlePageNextPrev(
                                            "prev",
                                            totalNumOfPages
                                        )
                                    }
                                    className={
                                        this.state.page > 1
                                            ? "page-item"
                                            : "page-item disabled"
                                    }
                                >
                                    <a href="#" className="page-link">
                                        Previous
                                    </a>
                                </li>

                                {/* using idx as key by making an array of numbers using total num of pages*/}
                                {[...Array(totalNumOfPages + 1).keys()]
                                    .slice(1)
                                    .map((pageNum) => {
                                        let clsName =
                                            this.state.page === pageNum
                                                ? "page-item active"
                                                : "page-item";
                                        return (
                                            <li
                                                className={clsName}
                                                onClick={this.handlePage}
                                                key={pageNum}
                                            >
                                                <a
                                                    className="page-link"
                                                    href="#"
                                                >
                                                    {pageNum}
                                                </a>
                                            </li>
                                        );
                                    })}
                                <li
                                    onClick={() =>
                                        this.handlePageNextPrev(
                                            "next",
                                            totalNumOfPages
                                        )
                                    }
                                    className={
                                        this.state.page === totalNumOfPages
                                            ? "page-item disabled"
                                            : "page-item"
                                    }
                                >
                                    <a className="page-link" href="#">
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}
