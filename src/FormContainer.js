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
            fullNameError: false,
            emailError: false,
            passwordError: false,
            occupationError: false,
            stateError: false,
            disableButton: false,
            titleMessage: 'Please fill out this form to create your account:',
            congrats: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateElementByName = this.validateElementByName.bind(this);
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
        this.validateElementByName(name, value);
    }

    validateElementByName(name, value) {
        let partialState = {};
        if(name === 'fullName') {
            // names aren't very standardized, allow any value 2 characters or longer
            const pattern = /^[a-z ,.'-]+$/i;
            partialState[name+'Error'] = !(value && value.length >= 2 && pattern.test(value));
        } else if(name === 'email') {
            // use regex for validation
            const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            partialState[name+'Error'] = !(value && pattern.test(value));
        } else if(name === 'password') {
            // require a minimum length for security
            partialState[name+'Error'] = !(value && value.length > 8);
        } else if(name === 'occupation') {
            partialState[name+'Error'] = !(value && value !== '');
        } else if(name === 'state') {
            partialState[name+'Error'] = !(value && value !== '');
        }
        this.setState(partialState);
    }

    handleSubmit() {
        const elements = document.querySelectorAll("div > input, div > select");
        elements.forEach(el => {
            this.validateElementByName(el.name, el.value);
        })
        if((this.state.fullNameError && this.state.emailError && this.state.passwordError &&
            this.state.occupationError && this.state.stateError) === false && (this.state.fullName
            && this.state.email && this.state.password && this.state.occupation && this.state.state)) {
                const bodyObj = {
                    name: this.state.fullName,
                    email: this.state.email,
                    password: this.state.password,
                    occupation: this.state.occupation,
                    state: this.state.state
                }
                const reqOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(bodyObj)
                }
                this.setState({disableButton : true});
                fetch('https://frontend-take-home.fetchrewards.com/form', reqOptions)
                    .then(res => {
                        if(res.status === 200) {
                            let partialState = {};
                            partialState.congrats = true;
                            partialState.titleMessage = 'Congrats!';
                            this.setState(partialState);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({disableButton : false})
                    })
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
                            <h1>{this.state.titleMessage}</h1>
                        </div>
                    </div>
                    <div>
                        {!this.state.congrats && 
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
                                <input type="password" 
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
                            <div class="button">
                                <button disabled={this.state.disableButton} onClick={this.handleSubmit}>Sign Up</button>
                            </div>
                        </div> }
                        {this.state.congrats && 
                        <div class="form-control">
                            <h4>Your account has successfully been created. Feel free to navigate away form this page.</h4>
                        </div>
                        }
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