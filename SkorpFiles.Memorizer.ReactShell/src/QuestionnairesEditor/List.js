import React from 'react';

const List = (props) => {
    return (
        <div>
            <div>Name of student {props.name}</div>
            <div>Roll number of student {props.rollNo}</div>
        </div>
    );
};

export default List;