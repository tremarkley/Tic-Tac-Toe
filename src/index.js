import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className = "square" onClick = {props.onClick}>
            {props.value}
        </button>
    );
}

function PlayAgainControl(props) {
        return (
            <div>
                <span>
                    <p>"Play Again?"</p>
                    <button onClick = {props.onYesClick}>
                        "Yes"
                    </button>
                    <button onClick = {props.onNoClick}>
                        "No"
                    </button>
                </span>
            </div>
        );
}
  
  class Board extends React.Component {
      constructor() {
          super();
          this.state = {
              squares: Array(9).fill(null),
              xIsNext: true,
              isPlayAgain: null,
              turnsPlayed: 0,
          };
      }

    handleClick(i) {
        const squares = this.state.squares.slice();
        const turnsPlayed = this.state.turnsPlayed + 1;
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            turnsPlayed: turnsPlayed,
        });
    }

    handleYesClick() {
        const squares = Array(9).fill(null);
        const isPlayAgain = true;
        const xIsNext = true;
        const turnsPlayed = 0;
        this.setState({
            isPlayAgain: isPlayAgain,
            squares: squares,
            xIsNext: xIsNext,
            turnsPlayed: turnsPlayed,
        })
    }

    handleNoClick() {
        const isPlayAgain = false;
        this.setState({
            isPlayAgain: isPlayAgain,
        })
    }

    renderSquare(i) {
      return ( 
        <Square 
            value={this.state.squares[i]}
            onClick = {() => this.handleClick(i)} 
        />
      );
    }

    renderPlayAgainControl() {
        return (
            <PlayAgainControl
                onYesClick = {() => this.handleYesClick()}
                onNoClick = {() => this.handleNoClick()}
            />
        );
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        const isPlayAgain = this.state.isPlayAgain
        let status;
        var playAgain;
        if (winner)
        {
            status = winner + ' Player wins!';
            playAgain = this.renderPlayAgainControl();
        }
        else if (this.state.turnsPlayed === 9)
        {
            status = "Tie Game!";
            playAgain = this.renderPlayAgainControl();
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        if (isPlayAgain === false)
        {
            alert("You have to Play Again");
        }

      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <div>
              {playAgain}
            </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
      const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8], 
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[b] === squares[a] && squares[a] === squares[c])
          {
              return squares[a];
          }
      }
      return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  