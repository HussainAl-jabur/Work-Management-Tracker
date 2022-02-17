import React from 'react';

function UserProfile(props) {
    const data = Object.entries(props.data);
    console.log(data);
    return(
        <div className="User">
<div class="uk-card uk-card-default uk-width-1-2@m">
    <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
                <img class="uk-border-circle" width="40" height="40" src={data[1][1]}></img>
            </div>
            <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom">{data[3][1]}</h3>
                <p class="uk-text-meta uk-margin-remove-top">{data[2][1]} </p>
            </div>
        </div>
    </div>
</div>
</div>


    );
}

export default UserProfile;
