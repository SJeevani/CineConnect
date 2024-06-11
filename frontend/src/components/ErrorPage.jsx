import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
    let routingError = useRouteError();

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <div className="card text-center border-danger shadow-lg p-4">
                <div className="card-body">
                    <h1 className="display-4 text-danger fw-bold mb-4">{routingError.status}</h1>
                    <p className="lead fw-semibold">Oops! Something went wrong.</p>
                    <p className="fw-normal">{routingError.data}</p>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
