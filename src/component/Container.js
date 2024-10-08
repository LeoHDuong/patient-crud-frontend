import React from 'react';

function Container({ children }) {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    {children} {/* This will render any content passed as children */}
                </div>
            </div>
        </div>
    );
}

export default Container;
