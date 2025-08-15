import React, {Fragment} from 'react';
import DestinationForm from "./DestinationForm";
import CarForm from "./CarForm";
import DetailsForm from "./DetailsForm";
import StageList from '../CommonCustomComponents/StageComponents/StageList';

import httpHelper from '../httpHelper';

import './style.css';

export default class ParamForms extends React.Component {
    requests = [];
    data = {};
    state = {
        formIndex: 0
    };

    constructor(props) {
        super(props);

        this.forms = [
            (
                <DestinationForm toNextForm={this.toNextForm}
                    setData={this.setData}
                    data={this.data}
                />
            ),
            (
                <CarForm toNextForm={this.toNextForm}
                    setData={this.setData}
                    defaultData={this.data}
                />
            ),
            (
                <DetailsForm toNextForm={this.toNextForm}
                             setData={this.setData}
                             defaultData={this.data}
                             onSubmit={this.onSubmit}
                />
            )
        ];
    }

    componentDidMount() {
        localStorage.setItem('href', window.parent.location.href);
    }

    componentWillUnmount() {
        this.requests.forEach(r => r.cancelTokenSource.cancel())
    }

    onSubmit = () => {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.data);
        }
    };

    toNextForm = () => {
        const formIndex = this.state.formIndex + 1;

        if (formIndex < this.forms.length) {
            this.setState({ formIndex })
        }
    };

    setData = (extData) => {
        Object.assign(this.data, extData);
    };

    onStageClick = index => {
        if (index < this.state.formIndex) {
            this.setState({ formIndex: index });
        }
    };

    calculateDistanceAndPrice() {
        const data = this.data;

        const distanceRequest = httpHelper.get('calc/distance', {
            placeFromId: data.placeFromId,
            placeToId: data.placeToId
        });

        this.requests.push(distanceRequest);

        const priceRequest = httpHelper.post('calc/price', {
            carModelId: data.vehicleModel.id,
            placeFromId: data.placeFromId,
            placeToId: data.placeToId,
            openEnclosed: data.transportType,
            running: data.running
        });

        this.requests.push(priceRequest);

        return Promise.all([distanceRequest.response, priceRequest.response]).then(([distanceData, prices]) => {
            distanceData.distance = distanceData.distance.toFixed().valueOf();

            this.setData({ ...distanceData, ...prices });

            this.requests = [];
        });
    }

    render() {
        return (
            <Fragment>
                <div>
                    <StageList
                        currentStageIndex={this.state.formIndex}
                        onStageClick={(index) => this.onStageClick(index)}
                    />
                </div>
                {this.forms[this.state.formIndex]}
            </Fragment>
        )
    }
}