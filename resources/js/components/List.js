import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const List = ({ id }) => {

    if (!id) {
        return (
            <div className="no-auth">
                <p>
                    Welcome, to continue you must have an account. Please choose from the choices below:
                </p>
                <a className="btn btn-secondary" href="login">
                    Login
                </a>
                <a className="btn btn-primary" href="register">
                    Register
                </a>
            </div>
        )
    }
    
    const [textValue, setTextValue] = useState('')
    const [listItems, setListItems] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost/api/bookmark/${id}`)
            const { data } = await response.json()
            setListItems(data)
        })()
        return () => true
    }, [])

    const handleRemove = async (itemId) => {
        const response = await fetch(`http://localhost/api/bookmark/${id}/${itemId}`, {
            method: 'delete'
        })
        const { data } = await response.json()
        setListItems(data)
    }

    const handleChange = (e) => {
        const value = e.target.value
        setTextValue(value)
        setError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (textValue === '') {
            setError('Field may not be empty')
            return
        }

        const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const regex = new RegExp(expression);

        if (!textValue.match(regex)) {
            setError('Field must be a valid URL')
            return
        }
        
        const method = e.target.method;
        const action = e.target.action;
        const response = await fetch(action, {
            method: method,
            body: JSON.stringify({
                url: textValue,
                user_id: id
            })
        })
        const { data } = await response.json()
        setListItems(data)
        setTextValue('')

    }

    return (
        <div className="container">
            <form className="mb-4 mt-3" method="post" action="http://localhost/api/bookmark" onSubmit={handleSubmit}>
                <div class="input-group has-validation input-group-lg mb-1">
                    <input type="text" value={textValue} onChange={(e) => handleChange(e)} class="form-control-lg" placeholder="ex. https://google.com" aria-label="Bookmark URL" aria-describedby="button-add" />
                    <button class="btn btn-primary" type="submits" id="button-add">
                        Add URL
                    </button>
                </div>
                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}
            </form>
            {listItems && listItems.length ? (
                <div>
                    <div className="url-list-header">
                        <span>
                            URL
                        </span>
                    </div>
                    <ul className="url-list">
                        {listItems.map(item => (
                            <li key={item.id}>
                                <a href={item.url} target="_blank">

                                    {item.url}
                                </a>
                                <button onClick={() => handleRemove(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="empty">No items available</p>
            )}
        </div>
    );
}

export default List;

if (document.getElementById('list')) {
    const element = document.getElementById('list')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<List {...props} />, document.getElementById('list'));
}
