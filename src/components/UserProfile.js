import React from 'react';

function UserProfile(props) {
    const data = Object.entries(props.data);
    console.log(data);
    return(
        <div className="User">
            <img src={data[1][1]}></img>
            <h1>Username : {data[3][1]}</h1>
            <h1>Email : {data[2][1]}</h1>
        </div>
    );
}

export default UserProfile;
