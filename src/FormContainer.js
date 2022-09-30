import React, { Component } from 'react';
import './FormContainer.css';

function ListStates(props) {
    const states = props.states;
    const listStates = states.map((state) => 
        <option key={state.abbreviation}>{state.name}</option>
    )
    return listStates;
}

function ListOccupations(props) {
    const occs = props.occupations;
    const listOccs = occs.map((occ) => 
        <option key={occ}>{occ}</option>
    )
    return listOccs;
}

export class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            occupations: [],
            states: [],
            fullName: '',
            email: '',
            password: '',
            occupation: '',
            state: '',
            entryNotValid: true,
            fullNameError: false,
            emailError: false,
            passwordError: false,
            occupationError: false,
            stateError: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let partialState = {};
        partialState[name] = target.value;
        this.setState(partialState)
        if(this.state[name+'Error']) {
            this.validateInput(event);
        }
    }

    validateInput(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        let partialState = {};
        console.log('validating: ' + name)
        if(name === 'fullName') {
            partialState[name+'Error'] = !(value && value.length > 2);
        } else if(name === 'email') {
            // use regex
            partialState[name+'Error'] = !(value && value.length > 3);
        } else if(name === 'password') {
            partialState[name+'Error'] = !(value && value.length > 8);
        } else if(name === 'occupation') {
            partialState[name+'Error'] = !(value && value !== '');
        } else if(name === 'state') {
            partialState[name+'Error'] = !(value && value !== '');
        }
        this.setState(partialState);
    }

    render() {
        return(
            <div class="half-screen">
                <div class="card" onMouseMove={this.checkValidity}>
                    <h1>This is the card with too many words to fit</h1>
                    <div class="form-control">
                        <div>
                            <label for="fullName">Full Name</label>
                            <input type="text" 
                                    id="fullName" 
                                    name="fullName"
                                    class={`${this.state.fullNameError ? 'error' : ''}`} 
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}></input>
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="text" 
                                    id="email" 
                                    name="email"
                                    class={`${this.state.emailError ? 'error' : ''}`}  
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}></input>
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input type="text" 
                                    id="password" 
                                    name="password" 
                                    class={`${this.state.passwordError ? 'error' : ''}`} 
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}></input>
                        </div>
                        <div>
                            <label for="occupation">Occupation</label>
                            <select id="occupation" 
                                    name="occupation" 
                                    class={`${this.state.occupationError ? 'error' : ''}`} 
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}>
                                <option value="">Select your occupation</option>
                                <ListOccupations occupations={this.state.occupations} />
                            </select>
                        </div>
                        <div>
                            <label for="state">State</label>
                            <select id="state" 
                                    name="state" 
                                    class={`${this.state.stateError ? 'error' : ''}`} 
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}>
                                <option value="">Select your state</option>
                                <ListStates states={this.state.states} />
                            </select>
                        </div>
                        <div>
                            <button disabled={this.state.entryNotValid}>Submit</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    componentDidMount() {
        fetch('https://frontend-take-home.fetchrewards.com/form')
            .then(res => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    occupations : result.occupations
                })
                this.setState({
                    states: result.states
                })
                console.log(this.state)
            })
            .catch(err => {
                console.log(err);
            })
    }
}