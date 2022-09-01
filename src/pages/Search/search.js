import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesByKeyword } from '../../redux/actions/movie-action';
import { getListGenre } from '../../redux/actions/genre-action';
import LoadingApp from "../../components/LoadingApp";
import { BsSearch } from "react-icons/bs";
import './search.css';

function Home () {
    const [isLoading, setIsLoading] = useState(false);
    const { keyword } = useParams();

    const { listMovie } = useSelector( state => {
        return {
            listMovie: state.movie.data,
        }
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            await dispatch(getListGenre());
            await dispatch(getMoviesByKeyword(keyword));

            setIsLoading(false);
        }
        fetchData();
    }, [keyword, dispatch]);

    const renderMovie = () => {
        console.log(listMovie)
        if ( isLoading ) return <LoadingApp />
        if ( Object.keys(listMovie).length ) {
            if ( listMovie.total_results ) {
                return listMovie.results.map((val, idx) => {
                    return (
                        <li className="list-searh-movie" key={'col-movie-' + idx} md="3" onClick={ () => navigate('../../movie/' + val.id) }>
                            <div className="list-search-movie-img">
                                <img 
                                    alt=""
                                    src={val.poster_path ? "https://image.tmdb.org/t/p/original" + val.poster_path : '/img/img-not-found.jpeg'} 
                                    onError={ (e) => {
                                      e.target.src = '/img/img-not-found.jpeg'
                                    }}
                                />
                            </div>
                            <div className="list-search-movie-data">
                                { val.title } <span>{ val.release_date ? '(' + val.release_date.substring(0,4) + ')' : ''}</span>
                                <br />
                                <span className="text-muted">
                                    { val.overview ? val.overview.substring(0, 100) + '...' : '' }
                                </span>
                            </div>
                        </li>
                    );
                });
            } else {
                return (
                    <div className='d-flex justify-content-center align-items-center flex-column py-5'>
                        <BsSearch style={{ fontSize: 80, transform: 'rotate(90deg)' }} />
                        <br />
                        <strong>No Result Found</strong>
                    </div>
                )
            }
        } 
    };

    return (
        <div className="search-wrapper">
            <Container>
                <div className="search py-4">
                    <h4>Search for <strong>"{ keyword }"</strong></h4>
                    <ul className="list-searh-movie-group">
                        { renderMovie() }
                    </ul>
                </div>
            </Container>
        </div>
    );
}

export default Home;