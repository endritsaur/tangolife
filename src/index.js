import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar } from 'react-bootstrap';

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

    start = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    }

    pause = () => {
        clearInterval(this.intervalId);
    }

    slow = () => {
        this.speed = 1000;
        this.start();
	}

	fast = () => {
        this.speed = 100;
        this.start();
    }
    
    clear = () => {
        var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
        
        this.setState({
            gridFull: grid,
            iteration: 0
        });
    }
    
    gridSize = (cols, rows) => {
        this.cols = cols;
        this.rows = rows;
        
        this.clear();
	}

    play = () => {
        let gridCopy = this.state.gridFull;
        let gridCopy2 = cloneArray(this.state.gridFull);

        for(var i = 0; i < this.rows; i++) {
            for(var j = 0; j < this.cols; j++) {
                let count = 0;

                if (i > 0)
                    if (gridCopy[i - 1][j])
                        count++;

                if (i > 0 && j > 0)
                    if (gridCopy[i - 1][j - 1])
                        count++;

                if (i > 0 && j < this.cols - 1)
                    if (gridCopy[i - 1][j + 1])
                        count++;

                if (j < this.cols - 1)
                    if (gridCopy[i][j + 1])
                        count++;

                if (j > 0)
                    if (gridCopy[i][j - 1])
                        count++;

                if (i < this.rows - 1)
                    if (gridCopy[i + 1][j])
                        count++;

                if (i < this.rows - 1 && j > 0)
                    if (gridCopy[i + 1][j - 1])
                        count++;

                if (i < this.rows - 1 && this.cols - 1)
                    if (gridCopy[i + 1][j + 1])
                        count++;

                if (gridCopy[i][j] && (count < 2 || count > 3))
                    gridCopy2[i][j] = false;

                if (!gridCopy[i][j] && count === 3) gridCopy2[i][j] = true;
            }
        }

        this.setState({
            gridFull: gridCopy2,
            iteration: this.state.iteration + 1
        });
    }

    componentDidMount() {
        this.fill();
        this.start();
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
                <Buttons
                    start = {this.start}
                    pause = {this.pause}
                    slow = {this.slow}
                    fast = {this.fast}
                    clear = {this.clear}
                    fill = {this.fill}
                    gridSize = {this.gridSize}
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

class Buttons extends React.Component {
    render() {
        return (
            <div className = "center">
                <ButtonToolbar>
                    <button className = "btn btn-default" onClick = {this.props.start}>Start</button>
                    <button className = "btn btn-default" onClick = {this.props.pause}>Pause</button>
                    <button className = "btn btn-default" onClick = {this.props.clear}>Clear</button>
                    <button className = "btn btn-default" onClick = {this.props.slow}>Slow</button>
                    <button className = "btn btn-default" onClick = {this.props.fast}>Fast</button>
                    <button className = "btn btn-default" onClick = {this.props.fill}>Fill</button>
                </ButtonToolbar>
            </div>
        )
    }
}

function cloneArray(arr) {
    return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));
