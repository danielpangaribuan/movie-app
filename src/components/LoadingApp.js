import Spinner from 'react-bootstrap/Spinner';

function LoadingApp () {
    return (
        <div className="loading-wrapper"
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10,
                background: '#000000e8'
            }}
        >
            <div className="loading-spinner"
                style={{
                    borderRadius: '50%',
                    height: 'fit-content',
                    position: 'relative',
                    background: '#1f1f1f',
                    boxShadow: 'inset 0px 0px 0px 2px rgb(63 63 63)'
                }}>
                <Spinner
                    variant="warning"
                    animation="border" 
                    role="status"
                    style={{
                        '--bs-spinner-width': '8rem',
                        '--bs-spinner-height': '8rem',
                        '--bs-spinner-border-width': '0.125rem',
                        '--bs-spinner-vertical-align': '-1.125em'
                    }}
                />
                <h4 className="text-warning d-flex justify-content-center align-items-center text-center" style={{ position: 'absolute', inset: 0 }}>
                    Loading
                </h4>
            </div>
        </div>
    )
}

export default LoadingApp;