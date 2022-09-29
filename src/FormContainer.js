import React, { Component } from 'react';
import './FormContainer.css';

export class FormContainer extends Component {

    render() {
        return(
            <div class="half-screen">
                <div class="card">
                    <h1>This is the card with too many words to fit</h1>
                    <div class="form-control">
                        <div>
                            <label for="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName"></input>
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="text" id="email" name="email"></input>
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input type="text" id="password" name="password"></input>
                        </div>
                        <div>
                            <label for="occupation">Occupation</label>
                            <select id="occupation" name="occupation">
                                <option>None</option>
                            </select>
                        </div>
                        <div>
                            <label for="state">State</label>
                            <select id="state" name="state">
                                <option>None</option>
                            </select>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }

    componentDidMount() {
        
    }
}