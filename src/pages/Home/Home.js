import React, { useEffect, useState } from "react";
import "./home.css";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import CardApp from '../../components/CardApp';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getListMovie } from '../../redux/actions/movie-action';
import { getListGenre } from '../../redux/actions/genre-action';
import LoadingApp from "../../components/LoadingApp";

function Home () {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { listGenre, listMovie } = useSelector( state => {
        return {
            listGenre: state.genre.data,
            listMovie: state.movie.data,
        }
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await dispatch(getListGenre())
            await dispatch(getListMovie(page));

            setIsLoading(false);
        }
        fetchData();
    }, [page, dispatch]);

    const renderMovie = () => {
        console.log(listMovie)
        if ( isLoading ) return <LoadingApp />
        if ( Object.keys(listMovie).length ) {
            return listMovie.results.map((val, idx) => {
                return (
                    <Col key={'col-movie-' + idx} md="3">
                        <CardApp 
                            key={'movie-list-' + idx}
                            image={val.poster_path} 
                            title={val.title} 
                            movieDetail={ () => navigate('movie/' + val.id) }
                            genre={ rendreGenre(val.genre_ids) }
                            classCard='bg-transparent text-white'
                        />
                    </Col>
                );
            });
        };
    };

    const rendreGenre = (genres) => {
        let arr = [];
        for ( let i = 0; i < genres.length; i++ ) {
            let idx = listGenre.findIndex( val => val.id === genres[i] );
            arr.push(listGenre[idx].name);
        }
        return arr.join(', ')
    }

    const renderPagination = () => {
        if ( Object.keys(listMovie).length ) {
            let item = [];
            let startPage = page - 2;
            let endPage = page + 2;
            let totalPage = listMovie.total_pages;

            if ( startPage <= 0 ) {
                endPage -= (startPage - 1);
                startPage = 1;
            }

            if ( endPage > totalPage ) 
                endPage = totalPage;

            if ( startPage > 2 ) {
                item.push(<Pagination.Item key={'pagination-1'} onClick={ () => paginationHandler(1) }>1</Pagination.Item>);
                item.push(<Pagination.Ellipsis key={'ellipsis-1'} disabled />);
            }
            for ( let i = startPage; i <= endPage; i++ ) {
                if ( i === page ) 
                    item.push(<Pagination.Item key={'pagination-' + i} onClick={ () => paginationHandler(i) } active >{i}</Pagination.Item>) 
                else
                    item.push(<Pagination.Item key={'pagination-' + i} onClick={ () => paginationHandler(i) } >{i}</Pagination.Item>) 
            }
            if ( endPage < totalPage - 2 ) {
                item.push(<Pagination.Ellipsis key={'pagination-' + totalPage} disabled />);
                item.push(<Pagination.Item key={'ellipsis-2'} onClick={ () => paginationHandler(totalPage) }>{ totalPage }</Pagination.Item>)
            }
            return item;
        }
    }

    const paginationHandler = (pageNumber) => {
        setPage(pageNumber);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div className="home py-2">
            <div className="my-4">
                <Container>
                    <h4 className="text-white">Most Popular</h4>

                    <Row>
                        {
                            renderMovie()
                        }
                    </Row>
                    
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.First onClick={ () => paginationHandler(1) } disabled={ page === 1 ? true : false }  />
                            <Pagination.Prev onClick={ () => paginationHandler(page - 1) } disabled={ page === 1 ? true : false }  />
                            { renderPagination() }
                            <Pagination.Next onClick={ () => paginationHandler(page + 1) } disabled={ page === listMovie.total_pages ? true : false } />
                            <Pagination.Last onClick={ () => paginationHandler(listMovie.total_pages) } disabled={ page === listMovie.total_pages ? true : false }  />
                        </Pagination>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Home;