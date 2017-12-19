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

    selectBox = (row, col) => {
        let gridCopy = cloneArray(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];

        this.setState({
            gridFull: gridCopy
        });
    }

    fill = () => {
        let gridCopy = cloneArray(this.state.gridFull);

        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                if(Math.floor(Math.random() * 4) === 1)
                    gridCopy[i][j] = true;
            }
        }

        this.setState({
            gridFull: gridCopy
        });
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
        const width = this.props.cols * 16;
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
                );
            }
        }

        return(
            <div className = "grid" style = {{width: width}}>
                {rowsArray}
            </div>
        );
    }
}

class Box extends React.Component {
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    }

    render() {
        return(
            <div
                className = {this.props.boxClass}
                id = {this.props.id}
                onClick = {this.selectBox}
            />
        );
    }
}

function cloneArray(arr) {
    return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));
