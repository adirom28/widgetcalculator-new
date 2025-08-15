import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";


import Snackbar from '@material-ui/core/Snackbar';
import {CircularProgress, Grid} from '@material-ui/core';
import './style.css'

import {SnackbarContentWrapper} from '../CommonCustomComponents/SnackBar';

import {isObjectInvalid} from '../utils';
import httpHelper from '../httpHelper';
import DetailsTable from './DetailsTable';
import Header from './Header';
import {setNewShipData} from "../store/reducers/action";
import ModalAddNewCarTable from "./ModalAddNewCarTable";
import EditNewCarTable from "./EditTable";


const defaultDistanceData = {
    distanceText: '',
    durationText: '',
    distance: null
};

const invaliDistanceData = {
    distanceText: '---',
    durationText: '---',
    distance: null
};

const defaultPrices = {
    cashDiscountPrice: '',
    regularPrice: ''
};

const invalidPrices = {
    cashDiscountPrice: '---',
    regularPrice: '---'
};

const PRICE_TYPE = {
    1: 'CashDiscountPrice',
    2: 'RegularPrice',
    'CashDiscountPrice': 1,
    'RegularPrice': 2
};

class ResultScreen extends React.Component {
    _distanceRequest = null;
    _priceRequest = null;

    constructor(props) {
        super(props);

        this.changePriceType = this.changePriceType.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNewCarChange = this.handleNewCarChange.bind(this);
        this.handleClose = this.handleClose.bind(this);

        const data = this.props.data;

        this.state = {
            selectedPriceType: PRICE_TYPE.CashDiscountPrice,
            loading: true,
            openSnackbar: false,
            openAddNewCarTable: true,
            disabledBooking: true,
            open: false,
            errorMessage: "Server error. Can not calculate data.",
            modalRadio: "modalRadio",
            place: [],

            data: {
                ...defaultDistanceData,
                ...defaultPrices,
                ...data,
                cars: [
                    {
                        vehicleYear: this.props.data.vehicleYear,
                        vehicleMaker: this.props.data.vehicleMaker,
                        vehicleModel: this.props.data.vehicleModel,
                        running: this.props.data.running,
                    }
                ],
            },

        };
    }


    componentDidMount() {

        Promise.all([
            this.calculateDistanceData(this._getReqParamsToCalculateDistance()),
            this.calculatePrices(this._getReqDataToCalculatePrice())
        ]).then(() => {
            this.setState({loading: false});
        }).then(() => {
             //setTimeout(() => this.sendEmails());
        });
    }

    componentWillUnmount() {
        [this._distanceRequest, this._priceRequest].forEach(req => {
            req && req.cancelTokenSource.cancel();
        });
    }

    handleClickOpen = () => {

        if (this.state.data.cars.length >= 10) {

            this.setState({openSnackbar: true});
            this.setState({errorMessage: "You can't choose more than 10 cars."});

        } else {
            this.setState({open: true});
        }
    };

    handleClose = () => {
        this.setState({open: false});
    };


    _isEqualByKeys(oldData, newData, comparedKeys) {
        let isEqual = true;
        const length = comparedKeys.length;

        for (let i = 0; i < length; i++) {
            const key = comparedKeys[i];
            if (oldData[key] !== newData[key]) {
                isEqual = false;
                break;
            }
        }

        return isEqual;
    }

    _isEqualCars(oldCars, newCars) {
        if (oldCars.length !== newCars.length) {
            return false;
        }

        for (let i = 0; i < newCars.length; i++) {
            if (!this._isEqualByKeys(oldCars[i], newCars[i],
                ['vehicleModel', 'vehicleYear', 'vehicleMaker', "running"])) {
                return false;
            }
        }

        return true;
    }


    _isValidPlaces(data) {
        return data.placeFromId && data.placeToId;
    }

    handleDistanceChange(oldData, newData) {
        const reqParams = this._getReqParamsToCalculateDistance(newData);

        if (this._isValidPlaces(newData)) {
            if (!this._isEqualCars(oldData.cars, newData)) {
                this.calculateDistanceData(reqParams);
            }
            return;
        }

        this.setState({
            data: {...this.state.data, ...invaliDistanceData},
            disabledBooking: true,
        });
    }

    handlePriceChange(oldData, newData) {
        const reqData = this._getReqDataToCalculatePrice(newData);

        if (!isObjectInvalid(reqData)) {
            this.calculatePrices(reqData);
            return;
        }

        this.setState({
            data: {...this.state.data, ...invalidPrices},
            disabledBooking: true,
        });
    }

    calculateDistanceData(reqParams) {
        if (this._distanceRequest) {
            this._distanceRequest.cancelTokenSource.cancel();
        }

        this.setState({
            disabledBooking: true
        });

        this._distanceRequest = httpHelper.get('calc/distance', reqParams);

        return this._distanceRequest.response
            .then(distanceData => {
                this._distanceRequest = null;

                distanceData.distance = distanceData.distance.toFixed().valueOf();

                this.setState({
                    data: {...this.state.data, ...distanceData},
                    disabledBooking: false
                });
            })
            .catch(() => {
                this.setState({
                    data: {...this.state.data, ...invaliDistanceData},
                    openSnackbar: true
                });
            });
    }

    _getReqParamsToCalculateDistance(data = this.state.data) {
        return {
            placeFromId: data.placeFromId,
            placeToId: data.placeToId
        }
    }

    _getReqDataToCalculatePrice(data = this.state.data) {


        return {
            cars:
                this.state.data.cars.map((car, i) => {
                    return {
                        modelId: car.vehicleModel.id,
                        runningType: car.running
                    }
                }),
            placeFromId: data.placeFromId,
            placeToId: data.placeToId,
            openEnclosed: data.transportType,
        };
    }

    calculatePrices(reqData) {
        if (this._priceRequest) {
            this._priceRequest.cancelTokenSource.cancel();
        }

        this.setState({
            data: {...this.state.data, ...defaultPrices},
            disabledBooking: true
        });

        let newReqData = {
            ...reqData,
            email: this.state.data.email,
            phone: this.state.data.phone,
            shipDate: this.state.data.shipDate
        }

        this._priceRequest = httpHelper.post('calc/price', newReqData);

        return this._priceRequest.response
            .then(prices => {
                this._priceRequest = null;

                this.setState({
                    data: {...this.state.data, ...prices},
                    disabledBooking: false
                });

            })
            .catch(() => {
                this.setState({
                    data: {...this.state.data, ...invalidPrices},
                    openSnackbar: true
                });
            });
    }

    /* sendEmails(data = this.state.data) {
         const emailTemplateData = {
             cashDiscountPrice: data.cashDiscountPrice.toFixed(2).valueOf(),
             regularPrice: data.regularPrice.toFixed(2).valueOf(),
             shipDate: data.shipDate.toLocaleDateString('en-US'),
             distanceText: data.distanceText,
             durationText: data.durationText,
             clientEmail: data.email,
             clientPhone: data.phone,
             placeFrom: data.placeFrom,
             placeTo: data.placeTo,
             transportRunning: data.running,
             transportType: data.transportType,
             vehicleMaker: data.vehicleMaker,
             vehicleModel: data.vehicleModel.model,
             vehicleYear: data.vehicleYear,
             vehicleCategory: data.vehicleModel.category
         };

         return httpHelper.post('email/notify', emailTemplateData);
     }*/

    changePriceType(selectedPriceType) {
        if (selectedPriceType !== this.state.selectedPriceType) {
            this.setState({selectedPriceType})
        }
    }

    handleChange(formValue) {
        const oldData = this.state.data;
        const newData = {...oldData, ...formValue};
        this.setState({data: newData});

        setTimeout(() => {
            this.handlePriceChange(oldData, newData);
            this.handleDistanceChange(oldData, newData);
        });
    }

    handleCarChange = (formValue, index) => {

        const oldData = this.state.data;
        const newData = {...oldData};
        newData.cars[index] = {...newData.cars[index], ...formValue}
        this.setState({data: newData});

        if (this.state.data.cars[index].vehicleModel != null && this.state.data.cars[index].running != null) {
            setTimeout(() => {
                this.handlePriceChange(oldData, newData);
                this.handleDistanceChange(oldData, newData);
            });
        }
    };

    handleNewCarChange(newCar) {
        let typeRadio = {running: newCar.modalRadio};
        delete newCar.modalRadio;
        newCar = {...newCar, ...typeRadio}

        let newData = {...this.state.data};
        newData.cars.push(newCar);
        this.setState({date: newData});
        setTimeout(() => {
            this.handlePriceChange(this.state.data, newData);
        })
    }

    handleCloseSnackbar = () => {
        this.setState({openSnackbar: false});
    };


    book = () => {

        /*if (!getZipCode(this.state.data.placeFrom) || !getZipCode(this.state.data.placeTo)) {
            axios.get(
                `${properties.apiUrl}/places/postal-codes?placeFromId=${this.state.data.placeFromId}&placeToId=${this.state.data.placeToId} `,
            ).then((res) => {
                    console.log(res.data)
                    this.setState({
                        place: res.data,
                    });
                }
            ).catch((error) => {
                console.log(error)
            });
        }*/

        const data = {
            ...this.state.data,
            //zipCodeFrom: this.state.place.length > 1 ? this.state.place[0] : "",
            //zipCodeTo: this.state.place.length > 1 ? this.state.place[1] : "",
            selectedPriceType: this.state.selectedPriceType,
            sumRegularPrice: this.state.sumRegularPrice,
            sumDiscountPrice: this.state.sumDiscountPrice,
        };

        localStorage.setItem('shipData', JSON.stringify(data));
        this.props.setNewShipData(data);
    };


    render() {
        return (
            <div className="result-screen">
                {this.state.loading
                    ? (
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{minHeight: '100vh'}}
                        >
                            <CircularProgress size={80}/>
                        </Grid>
                    ) : (
                        <Fragment>
                            <Header/>

                            <div className="container-fluid mt-5">
                                <div className="row justify-content-center">


                                    <div className="col-12 col-lg-6 information-block order-2 order-lg-1">
                                        <div className="block-title">Information</div>

                                        <div className="w-100 bordered-block">
                                            <p>Your quote has been e-mailed to you.</p>
                                            <p>Make a selection below to continue to booking. <strong>No payment
                                                required!</strong></p>
                                        </div>

                                        <div className="option-container">
                                            <div className="option-wrapper">
                                                <div className="option-name">Service type</div>
                                                <div className="option-value">Door to door</div>
                                                <i className="fa fa-info-circle"/>
                                            </div>

                                            <div className="option-wrapper">
                                                <div className="option-name">Insurance</div>
                                                <div className="option-value">Included</div>
                                                <i className="fa fa-info-circle"/>
                                            </div>
                                        </div>


                                        <div className="prices">

                                            <div
                                                className={'price ' + (this.state.selectedPriceType === PRICE_TYPE.CashDiscountPrice ? 'discounted-price' : 'regular-price')}
                                                onClick={() => this.changePriceType(PRICE_TYPE.CashDiscountPrice)}
                                            >
                                                <div className="price-title">Discounted cash price</div>
                                                <div className="price-value">
                                                    {this.state.data.cashDiscountPrice}
                                                </div>

                                                <p className="description">Once the order is assigned to a carrier, a
                                                    partial payment will be required. The balance will be paid to the
                                                    carrier at the time of delivery.</p>

                                                {
                                                    this.state.selectedPriceType === PRICE_TYPE.CashDiscountPrice ?
                                                        <div className="selected">
                                                            <i className="fa fa-check-circle"/><span> Selected</span>
                                                        </div> : ''
                                                }
                                            </div>

                                            <div
                                                className={'price ' + (this.state.selectedPriceType === PRICE_TYPE.RegularPrice ? 'discounted-price' : 'regular-price')}
                                                onClick={() => this.changePriceType(PRICE_TYPE.RegularPrice)}
                                            >
                                                <div className="price-title">Regular price</div>
                                                <div className="price-value">
                                                    {this.state.data.regularPrice}
                                                </div>

                                                <p className="description">A full payment by credit card or debit card
                                                    will be required when the order is assigned to a carrier and a truck
                                                    is dispatched to have your vehicle picked up.</p>

                                                {
                                                    this.state.selectedPriceType === PRICE_TYPE.RegularPrice ?
                                                        <div className="selected">
                                                            <i className="fa fa-check-circle"/><span> Selected</span>
                                                        </div> : ''
                                                }
                                            </div>

                                        </div>
                                        <div className="wrap-btn">
                                            <Link to={'/booking/:id'} style={{textDecoration: 'none'}}>
                                                <button disabled={this.state.disabledBooking} onClick={this.book}
                                                        className="btn main-btn m-auto m-md-0">
                                                    <span>Continue to booking details</span>
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="additional-info">
                                            <p>Have questions?</p>
                                            <p>Email sales@allcarstransport.com or call</p><p
                                            className="phone-number">(609) 318-4008</p>
                                        </div>

                                    </div>
                                    <div className="col-10 col-md-8 col-lg-4 details-block order-1 order-lg-2">
                                        <DetailsTable data={this.state.data} onChange={this.handleChange}
                                                      onCarChange={(formValue) => {
                                                          this.handleCarChange(formValue, 0)
                                                      }}/>

                                        {
                                            this.state.data.cars.map((car, i) => {
                                                return (
                                                    (i === 0) ? " " :
                                                        <EditNewCarTable
                                                            key={i}
                                                            data={car}
                                                            id={i}
                                                            onChange={(formValue) => {
                                                                this.handleCarChange(formValue, i)
                                                            }}
                                                        />
                                                )

                                            })
                                        }

                                        <button className="btn main-btn m-md-0"
                                                onClick={this.handleClickOpen}>
                                            <span>Add more cars</span>
                                        </button>
                                    </div>
                                    {
                                        this.state.openAddNewCarTable &&
                                        <ModalAddNewCarTable
                                            nameRadio={this.state.modalRadio}
                                            open={this.state.open}
                                            handleClose={this.handleClose}
                                            onChange={this.handleNewCarChange}/>
                                    }

                                </div>
                            </div>
                        </Fragment>
                    )}

                <Snackbar
                    open={this.state.openSnackbar}
                    onClose={this.handleCloseSnackbar}
                    autoHideDuration={5000}
                >
                    <SnackbarContentWrapper
                        variant="error"
                        message={this.state.errorMessage}
                    />
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNewShipData: (data) => dispatch(setNewShipData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)

