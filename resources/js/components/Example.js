import React from 'react';
import ReactDOM from 'react-dom';

function Example({ user }) {

    const userData = user ? JSON.parse(user) : false
    return (
        <div className="container">
            {userData && userData.name && (
                <p>
                    Welcome back, {userData.name}
                </p>
            )}
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    const element = document.getElementById('example')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<Example {...props} />, document.getElementById('example'));
}
