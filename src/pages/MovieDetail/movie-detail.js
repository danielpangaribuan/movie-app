import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailMovie, updateRateMovies, getRateMoviesByGuest, getSimilarMovies } from "../../redux/actions/movie-action";
import { getListGenre } from '../../redux/actions/genre-action';
import { Button, Modal, Container, Spinner } from 'react-bootstrap';
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { Rating } from 'react-simple-star-rating'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import LoadingApp from '../../components/LoadingApp';
import CardApp from '../../components/CardApp';
// import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function MovieDetail () {
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [inputIsLoading, setInputIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [rating, setRating] = useState(0);
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { listGenre, data, rateList, similarMovie } = useSelector( state => {
        return {
            listGenre: state.genre.data,
            data: state.movie.detail,
            rateList: state.movie.rateList,
            similarMovie: state.movie.similarMovie
        }
    });

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 870,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false
                }
            },
            {
                breakpoint: 680,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  autoplay: true,
                  speed: 2000,
                  autoplaySpeed: 10000,
                  infinite: true,
                  dots: false,
                  arrows: false
                }
            },
            {
                breakpoint: 460,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  speed: 2000,
                  autoplaySpeed: 10000,
                  infinite: true,
                  dots: false,
                  arrows: false
                }
            },
        ]

    };

    useEffect(() => {
        const fetchData = async () => {
            setLoadingFetch(true);
            await dispatch(getListGenre());
            await dispatch(getSimilarMovies(id));
            await dispatch(getDetailMovie(id));
            setLoadingFetch(false);
        }
        fetchData();
        dispatch(getRateMoviesByGuest(localStorage.getItem("guest_session_id")));
    }, [id]);

    const handleRating = (rate) => {
        setRating(rate)
    };

    const submitRating = () => {
        const submit = async () => {
            setInputIsLoading(true);
            await dispatch(updateRateMovies(id, parseInt(Math.round(rating/10*2)/2), localStorage.getItem("guest_session_id")));
            setInputIsLoading(false);
            handleClose()
        }
        submit();
    };

    const renderRate = () => {
        let isRated = false;
        let rating;
        if ( rateList.length ) {
            let idx = rateList.findIndex( val => val.id === id );

            if ( idx >= 0 ) {
                isRated = true;
                rating = rateList[idx].rating;
            }
        }

        if ( !isRated ) {
            return (
                <Button 
                    variant='transparent' 
                    className="text-primary d-inline-flex align-items-center justify-content-center"
                    onClick={handleShow}
                >
                    <BsStar style={{ fontSize: 24, marginRight: 5 }} /> Rate
                </Button>
            )
        } else {
            return (
                <div className='rate py-2'>
                    <BsFillStarFill style={{ color: '#FFA91B', fontSize: 24, marginRight: 5 }} />
                    <div className="rate-text">
                        <span>
                            <span className='text-white'>{ rating }</span>
                            <span className='text-muted'>/ 10</span>
                        </span>
                    </div>
                </div>
            )
        }
    };

    const rendreGenre = (genres) => {
        let arr = [];

        if ( genres ) {
            for ( let i = 0; i < genres.length; i++ ) {
                let idx = listGenre.findIndex( val => val.id === genres[i] );
                arr.push(listGenre[idx].name);
            }
            return arr.join(', ')
        }
    }

    const renderSimilarMovie  = () => {
        if ( Object.keys(similarMovie).length ) {
            return similarMovie.results.map( (val, idx) => {
                return (
                    <div className='px-2' key={'div-similar-movie-' + idx}>
                        <CardApp 
                            title={val.title}
                            image={val.poster_path}
                            genre={rendreGenre(val.genre_ids)}
                            movieDetail={ () => renderMovieDetail(val.id) }
                        />
                    </div>
                )
            });
        }
    }

    const renderMovieDetail = (id) => {
        navigate(`../movie/${id}`);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    if ( !Object.keys(data).length ) return
    return (
        <div className="movie-detail">
            { loadingFetch ? <LoadingApp /> : '' }
            <div className="movie-detail-jumbotron py-5">
                <Container>
                    <div className="movie-detail-header">
                        <div className="movie-detail-header-left">
                            <h3 className="text-white">
                                { data.title }
                            </h3>
                        </div>
                        <div className="movie-detail-header-right">
                            <div className="movie-detail-header-comp">
                                <span className='text-muted'>MApp Rating</span>
                                <div className="rate p-2">
                                    <BsFillStarFill style={{ color: '#FFA91B', fontSize: 24, marginRight: 5 }} />
                                    <div className="rate-text">
                                        <span>
                                            <span className='text-white'>{ data.vote_average }</span>
                                            <span className='text-muted'>/ 10</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="movie-detail-header-comp">
                                <span className='text-muted'>Your Rate</span>
                                { renderRate() }
                            </div>
                            <div className="movie-detail-header-comp"></div>
                        </div>
                    </div>
                    <div className="image-banner">
                        <div className="image-backdrop">
                            <img 
                                src={data.backdrop_path ? "https://image.tmdb.org/t/p/original" + data.backdrop_path : '/img/img-not-found.jpeg' } 
                                onError={ (e) => e.target.src = '/img/img-not-found.jpeg' }
                                alt=''
                            />
                        </div>
                        <div className="image-poster">
                            <img 
                                src={data.backdrop_path ? "https://image.tmdb.org/t/p/original" + data.poster_path : '/img/img-not-found.jpeg' }  
                                onError={ (e) => e.target.src = '/img/img-not-found.jpeg' }
                                alt=''
                            />
                        </div>
                    </div>
                    <div className="description">
                        <div className="genre-wrapper my-4">
                            {
                                data.genres.map((val, idx) => {
                                    return <span className="genre-list" key={'genre-list-' + idx}>{ val.name }</span>
                                })
                            }
                        </div>
                        <p className='text-secondary'>
                            { data.overview.length ? data.overview : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }
                        </p>
                    </div>
                </Container>
            </div>
            <div className="movie-detail-bottom">
                <Container>
                    <div className="more-movie">
                        <h3 className='my-4' style={{ borderLeft: '4px solid #323a41', paddingLeft: 8 }}>More like this</h3>
                        <Slider {...settings}>
                            { renderSimilarMovie() }
                        </Slider>
                    </div>
                </Container>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body className='text-center bg-dark text-white'>
                    <Modal.Title className="mb-4 text-uppercase">Rate Movie</Modal.Title>
                    <div className='rate-wrapper'>
                        <Rating
                            onClick={handleRating}
                            ratingValue={rating}
                            size={50}
                            label
                            transition
                            fillColor='orange'
                            emptyColor='gray'
                            className='foo' // Will remove the inline style if applied
                        />
                    </div>
                    <div className="btn-group-wrapper mt-5 d-flex justify-content-center">
                        <Button onClick={handleClose} className='mx-1 bg-transparent border-0'>
                            Close
                        </Button>
                        <Button variant="outline-primary" onClick={ () => submitRating() }>
                            {
                                inputIsLoading ? 
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : 'Save Changes'
                            }
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MovieDetail;