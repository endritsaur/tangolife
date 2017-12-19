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
            iteration: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    render() {
        return(
            <div>
                <h1>Tango LIFE</h1>
                <h4>Iterations: {this.state.iteration}</h4>
                <Grid
                    gridFull = {this.state.gridFull}
                    rows = {this.rows}
                    cols = {this.cols}
                    selectBox = {this.selectBox}
                />
            </div>
        );
    }
}

class Grid extends React.Component {
    render() {
        const width = this.props.cols * 14;
        var rowsArray = []
        var boxClass = "";

        for(var i = 0; i < this.props.rows; i++) {
            for(var j = 0; j < this.props.cols; j++) {
                let boxId = i + "_" + j;

                boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
                rowsArray.push(
                    <Box 
                        boxClass = {boxClass}
                        key = {boxId}
                        boxId = {boxId}
                        row = {i}
                        col = {j}
                        selectBox = {this.props.selectBox}
                    />
                )
            }
        }

        return(
            <div className="">Content</div>
        );
    }
}

class Box extends React.Component {
    render() {
        return(
            <div
                className = {this.props.boxClass}
            />
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
