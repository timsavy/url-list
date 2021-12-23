import React from 'react';
import ReactDOM from 'react-dom';

function List({ items }) {
    
    const itemsData = items ? JSON.parse(items) : []

    const handleRemove = async (id) => {
        console.log(id)
        const response = await fetch(`http://localhost/bookmark/${id}`, {
            method: 'delete'
        })
        console.log('response', response)
    }

    return (
        <ul className="container">
            {itemsData && itemsData.length && itemsData.map(item => (
                <li key={item.id}>
                    {item.url}
                    <button onClick={() => handleRemove(item.id)}>
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default List;

if (document.getElementById('list')) {
    const element = document.getElementById('list')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<List {...props} />, document.getElementById('list'));
}
