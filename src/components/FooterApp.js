import Container from 'react-bootstrap/Container';

function FooterApp () {
    return (
        <div className="footer-wrapper bg-dark">
            <Container>
                <div className="d-flex justify-content-center align-items-center" style={{ height: 50 }}>
                    <span className='text-muted'>&copy; Copyright: <strong className="text-white">Daniel Parlindungan</strong></span>
                </div>
            </Container>
        </div>
    )
}

export default FooterApp;