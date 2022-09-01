import React from 'react';
import Card from 'react-bootstrap/Card';

function CardApp(props) {

  return (
    <Card style={{ width: '100%', marginBottom: 20, border: 'none' }} className={props.classCard}>
        <Card.Img 
            height="460"
            variant="top" 
            src={props.image ? "https://image.tmdb.org/t/p/original" + props.image : '/img/img-not-found.jpeg'}
            style={{ cursor: 'pointer', boxShadow: '0 14px 15px -4px rgb(0 0 0 / 40%)', borderRadius: 8 }} 
            onClick={ props.movieDetail }
            onError={ (e) => {
              e.target.src = '/img/img-not-found.jpeg'
            }}
        />
        <Card.Body className='px-1 pt-3 pb-1'>
            <Card.Title onClick={ props.movieDetail } style={{ cursor: 'pointer' }}>{ props.title }</Card.Title>
            <Card.Text className="text-muted">
                { props.genre }
            </Card.Text>
        </Card.Body>
    </Card>
  );
}

export default CardApp;