import React from 'react';

import Typography from '@material-ui/core/Typography';

import ParamForms from '../ParamForms';
import ResultScreen from '../ResultScreen';

import { IframeContext } from '../App';
import { parse } from '../properties';

import './style.css';
import axios from "axios";
import * as properties from "../properties";

const FORM = 'FORM';
const RESULT = 'RESULT';

export default class Widget extends React.Component {
    static contextType = IframeContext;
    data = {};
    state = {
        stage: null,
        access: false,
    };

    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        const { location: { search } } = this.props

        if (search) {
            const formData = parse(search);
            if (formData.userId) {
                localStorage.setItem('userId', formData.userId);
            }

            if (formData.data) {
                this.data = JSON.parse(formData.data)
                this.data.shipDate = new Date(this.data.shipDate);

                this.setState({ stage: RESULT });

                return;
            }
        }

        this.setState({ stage: FORM });

        this.checkAccess();
    }

    checkAccess = () => {
        axios.get(
            `${properties.apiUrl}/user/check-domain`,
        ).then((res) => {
                if (res.status === 200) {
                    this.setState( {access: true});
                } else {
                    this.setState({access: false});
                }
            }
        ).catch((error) => {
            this.setState({access: false});
        });
    };

    onFormSubmit = (formData) => {
        this.data = formData;

        if (this.context) {
            window.parent.postMessage({
                queryString: '?data=' + JSON.stringify(formData)+ '&userId=' + localStorage.getItem('userId')
            }, "*");

            return;
        }

        this.setState({ stage: RESULT });
    };

    render() {
        if (this.state.access) {
            if (this.state.stage === FORM) {
                return (
                    <div className="widget-forms-content-wrapper">
                        <div className="widget-form-wrapper">
                            <div className="form">
                                <Typography variant="h6">
                                    <div className="title">
                                        <span>Instant shipping calculator</span>
                                    </div>
                                </Typography>
                                <ParamForms onSubmit={this.onFormSubmit}/>
                            </div>
                        </div>
                    </div>
                );
            }

            if (this.state.stage === RESULT) {
                return (
                    <ResultScreen data={this.data}/>
                );
            }
        }

        return '';
    }
}