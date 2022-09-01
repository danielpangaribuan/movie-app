import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Container from 'react-bootstrap/Container';

function CategoryBar (props) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <div className="categeory-bar">
            <Container>
                <h4 className="text-white">Category</h4>
                <Slider {...settings}>
                    { props.categoryData }
                </Slider>
            </Container>
        </div>
    )
}

export default CategoryBar;