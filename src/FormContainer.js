import React, { Component } from 'react';
import './FormContainer.css';

function ListStates(props) {
    const states = props.states;
    const listStates = states.map((state) => 
        <option key={state.name}>{state.name}</option>
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
            state: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let partialState = {};
        partialState[name] = target.value;
        this.setState(partialState)
    }

    render() {
        return(
            <div class="half-screen">
                <div class="card">
                    <h1>This is the card with too many words to fit</h1>
                    <div class="form-control">
                        <div>
                            <label for="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName" onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="text" id="email" name="email" onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input type="text" id="password" name="password" onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <label for="occupation">Occupation</label>
                            <select id="occupation" name="occupation" onChange={this.handleChange}>
                                <option value="">Select your occupation</option>
                                <ListOccupations occupations={this.state.occupations} />
                            </select>
                        </div>
                        <div>
                            <label for="state">State</label>
                            <select id="state" name="state" onChange={this.handleChange}>
                                <option value="">Select your state</option>
                                <ListStates states={this.state.states} />
                            </select>
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