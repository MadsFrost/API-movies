import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SSL_OP_SINGLE_DH_USE } from 'constants';
import { whileStatement } from '@babel/types';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class MoviesList extends React.Component {
    state = {
        moviesList: ['tt0816692'],
        searchTerm: ''
    };

    search = event => {
        event.preventDefault();
        axios
            .get(
                `https://www.omdbapi.com/?apikey=756abb2f&s=${
                    this.state.searchTerm
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                if (!res.Search) {
                    this.setState({ moviesList: [] });
                    return;
                }

                const moviesList = res.Search.map(movie => movie.imdbID);
               
                this.setState({
                    moviesList
                });
            });
    };

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    render() {
        const { moviesList } = this.state;

        
        return (
            <div>
                <form onSubmit={this.search}>
                    <input
                        placeholder="Søk på en film.."
                        onChange={this.handleChange} id="inputField" onKeyPress={event => {
                            if (event.key === 'Enter') {
                              this.search(event)
                            }
                          }}
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon={faSearch} size="2x"/>
                    </button>
                </form>
                <div className="flexCards">
                {moviesList.length > 0 ? (
                    moviesList.map(movie => (
                        <MovieCard movieID={movie} key={movie} />
                    ))
                ) : (
                    <p>
                        Couldn't find what you were looking for. Try writing complete words or have more letters in your answer.
                    </p>
                )}
                </div>
            </div>
        );
    }
}

class MovieCard extends React.Component {
    state = {
        movieData: {}
    };

    componentDidMount() {
        axios
            .get(
                `https://www.omdbapi.com/?apikey=756abb2f&i=${
                    this.props.movieID
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                this.setState({ movieData: res });
            });
    }

    render() {
        const {
            Title,
            Released,
            Genre,
            Plot,
            Poster,
            imdbRating,
            Metascore,
            imdbVotes,
            Type
        } = this.state.movieData;

        if (!Poster || Poster === 'N/A') {
            return null;
        }

        /*<span className="imdbRating">{Ratings[1].Value}</span>);*/ 

        return (
        <div>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <div
                            className="bg-image"
                            style={{ backgroundImage: `url(${Poster})`, borderRadius: 22 }}
                        />
                    </div>
                    <div className="flip-card-back movie-card-container" style={{ backgroundImage: `url(${Poster})`}}>
                        <div>
                            <h1>{Title}</h1>
                            <small>Released: {Released}, {(Type).toUpperCase()}</small>
                        </div>
                        <div className="plot-tit"><h3>{(Type).capitalize()} Plot</h3></div>
                        <p> {Plot && Plot.substr(0, 350)}</p>
                        <div className="tags-container">
                            {Genre && Genre.split(', ').map(g => <span>{g}</span>)}
                        </div>
                        <div className="plot-tit"><h3>Ratings (1-10)</h3></div>
                        <h4 className="imdbBox"><img className="imdbLogo" src="https://i.pinimg.com/originals/cd/04/3a/cd043a4f42be9ff1cd0bced009304afa.png" width="47" height="25"/> <span className="imdbRating">{imdbRating}</span><span className="secondarytxt">from {imdbVotes} reviews</span></h4>
                            {isNaN(Metascore) ? (
                                 <p>{null}</p>
                                                                ) : (
                                                                    <>
                                <h4 className="imdbBox"><img className="imdbLogo" src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Metacritic_M.png" width="25" height="25"/><span className="imdbRating"><p class="metaFixP">{((parseFloat(Metascore)/10).toFixed(1))}</p><span className="secondarytxt" className="MetaFix">from critiques</span></span></h4>
                                <h4 className="imdbBox"><span className="metaRating"><span className="imdbRating">{((parseFloat(imdbRating)+parseFloat(Metascore/10))/2).toFixed(1)}</span></span><span style={{marginLeft: 5}}>Average</span></h4> 
                                </>
                                )}
                    </div>
                    </div></div>
        </div>
        );
    }
}

export default MoviesList;
