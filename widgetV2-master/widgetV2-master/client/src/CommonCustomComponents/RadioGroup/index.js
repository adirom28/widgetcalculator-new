import React from 'react';

import './style.css'

export default class RadioGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue
        };
    }

    onChange = (value) => {
        this.setState({
            value
        });

        if (this.props.onChange) {
            this.props.onChange({[this.props.name]: value});
        }
    };

    render() {
        return (
            <div className="radio-group-container">
                {this.props.title &&
                    <div className="radio-group-title">
                        {this.props.title}
                    </div>
                }

                <div className="radio-container" style={{flexBasis: this.props.radioFlexBasis}}>
                    <div className="wrap-radio">
                        <input type="radio" name={this.props.name} value={this.props.values[0].value}
                               id={this.props.firstRadioId}
                               onChange={(event) => this.onChange(event.target.value)}
                               checked={this.state.value === this.props.values[0].value}
                        />
                        <label className="radio-custom"
                               htmlFor={this.props.firstRadioId}>{this.props.values[0].text}</label>
                    </div>

                    <div className="wrap-radio">
                        <input type="radio" name={this.props.name} value={this.props.values[1].value}
                               id={this.props.secondRadioId}
                               onChange={(event) => this.onChange(event.target.value)}
                               checked={this.state.value === this.props.values[1].value}
                        />
                        <label className="radio-custom"
                               htmlFor={this.props.secondRadioId}>{this.props.values[1].text}</label>
                    </div>
                </div>
            </div>
        );
    }
}