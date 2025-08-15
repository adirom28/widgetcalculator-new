import Stage from "../Stage";
import React from 'react';
import './style.css'

export default function StageList(props) {
    const onStageClick = (index) => {
        if (props.onStageClick) {
            props.onStageClick(index);
        }
    }

    const getStageState = (index) => {
        if (index === props.currentStageIndex) {
            return 'current';
        }

        if (index < props.currentStageIndex) {
            return 'prev';
        }

        return 'next';
    }

    return (
        <div className="stage-list-wrapper">

            <hr />

            <div className="stage-list">
                <div className="stage-container left-stage-container">
                    <Stage label="Destination" displayNumber="1" state={getStageState(0)} onClick={() => onStageClick(0)} />
                </div>

                <div className="stage-container middle-stage-container">
                    <Stage label="Car" displayNumber="2" state={getStageState(1)} onClick={() => onStageClick(1)} />
                </div>

                <div className="stage-container right-stage-container">
                    <Stage label="Date" displayNumber="3" state={getStageState(2)} onClick={() => onStageClick(2)} />
                </div>
            </div>

        </div>
    );
}