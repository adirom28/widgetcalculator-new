import React from 'react'
import './style.css'

export default function Stage(props) {

    const stateClass = 'state-state-' + props.state;

    return (
        <div className={'stage-wrapper ' + stateClass} onClick={props.onClick}>

            <div className="outer-circle">
                <div className="inner-circle">
                    <i className="fa-icon stage-number">{props.displayNumber}</i>
                    <i className="fa fa-check fa-icon stage-check" />
                </div>
            </div>

            <div className="stage-label">{props.label}</div>

        </div>
    );
}