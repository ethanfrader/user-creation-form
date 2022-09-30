import React, { Component } from 'react';
import './FormContainer.css';
import './icon.png';

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

function ErrorText(props) {
    const text = props.message;
    const show = props.show;
    return (
        <span>
            {show && <p class="error-text">{text}</p>}
        </span>
    )
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
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {
        if(this.state.fullNameError || this.state.emailError || this.state.passwordError ||
            this.state.occupationError || this.state.stateError) {
                this.setState({entryNotValid : true});
        } else {
            console.log('looks good')
        }
    }

    render() {
        return(
            <div class="half-screen">
                <div class="card" onMouseMove={this.checkValidity}>
                    <div class="title-shader">
                        <div class="title">
                            <div class="logo">
                                <img class="logo" src={require("./icon.png")}></img>
                            </div>
                            <h1>Please fill out this form to create your account:</h1>
                        </div>
                    </div>
                    <div class="form-control">
                        <div>
                            <label for="fullName">Full Name</label>
                            <input type="text" 
                                    id="fullName" 
                                    name="fullName"
                                    class={`${this.state.fullNameError ? 'error' : ''}`} 
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}></input>
                            <ErrorText message="Full name is required" show={this.state.fullNameError}/>
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="text" 
                                    id="email" 
                                    name="email"
                                    class={`${this.state.emailError ? 'error' : ''}`}  
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}></input>
                            <ErrorText message="Email is required" show={this.state.emailError}/>
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input type="text" 
                                    id="password" 
                                    name="password" 
                                    class={`${this.state.passwordError ? 'error' : ''}`} 
                                    onChange={this.handleChange}
                                    onBlur={this.validateInput}></input>
                            <ErrorText message="Password must be at least 8 characters" show={this.state.passwordError}/>
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
                            <ErrorText message="You must select an occupation" show={this.state.occupationError}/>
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
                            <ErrorText message="You must select your state" show={this.state.stateError}/>
                        </div>
                        <div>
                            <button onClick={this.handleSubmit}>Submit</button>
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
                this.setState({
                    occupations : result.occupations
                })
                this.setState({
                    states: result.states
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}