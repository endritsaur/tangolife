import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Main extends React.Component {
    constructor() {
        super();
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    render() {
        return(
            <div>
                <h1>Tango LIFE</h1>
                <Grid
                    gridFull = {this.state.gridFull}
                    rows = {this.rows}
                    cols = {this.cols}
                />
            </div>
        );
    }
}

class Grid extends React.Component {
    render() {
        const width = this.props.cols;
        var rowsArray = [];

        return(
            <div className="">Content</div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
