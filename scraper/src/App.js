import React from 'react';
import logo from './Reddit-logo.svg';
import './App.css';
import {render} from "react-dom";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {apiResponse: []};
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.json())
            .then(res => this.setState({apiResponse: res}));
    }

    componentWillMount() {
        this.callAPI();
    }

    render() {
        const { apiResponse } = this.state;
        return (
            <div className="App">
                <div className="App-header">
                    <a href="https://www.reddit.com/"><img src={logo} id="image" alt="Reddit" width="400em"/></a>

                    <div className="content">
                        {(
                            apiResponse.map(naslov => {
                                const {id, title, link} = naslov;
                                if(title != ""){
                                    return (
                                        <a href={link}>
                                            <div className="okvir" key={id}>
                                                <div id="id" className="inner"><p>{id}</p></div>
                                                <div id="titleCard" className="inner"><p>{title}</p></div>
                                            </div>
                                        </a>
                                    );
                                }
                            })
                        )}
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
