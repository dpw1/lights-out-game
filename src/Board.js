import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nRows: 10,
    nCols: 2,
    chanceLightsStartOn: 0.25
  };
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  componentDidMount() {
    this.createBoard();
  }
  createBoard() {
    let board = [];

    const { nRows: x, nCols: y, chanceLightsStartOn } = this.props;

    for (let i = 0; i < x; i++) {
      let row = [];
      for (let k = 0; k < y; k++) {
        row.push(Math.random() < chanceLightsStartOn);
      }
      board.push(row);
    }

    return board;
  }

  flipCellsAround(coord) {
    let { nCols, nRows } = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);

    function flipCell(x, y) {
      if (x >= 0 && x < nRows && y >= 0 && y < nCols) {
        board[x][y] = !board[x][y];
      }
    }

    flipCell(x, y);
    flipCell(x - 1, y);
    flipCell(x + 1, y);
    flipCell(x, y + 1);
    flipCell(x, y - 1);

    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */

  render() {
    if (this.state.hasWon) {
      return (
        <h1>
          <span className="Board--neon-orange">You </span>
          <span className="Board--neon-blue">Won!</span>
        </h1>
      );
    }
    const tableBoard = [];
    for (let y = 0; y < this.props.nCols; y++) {
      let row = [];
      for (let x = 0; x < this.props.nRows; x++) {
        let coordinates = `${x}-${y}`;
        row.push(
          <Cell
            flipCellsAround={() => this.flipCellsAround(coordinates)}
            key={coordinates}
            isLit={this.state.board[x][y]}
          />
        );
      }
      tableBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <div>
        <h2>
          <span className="Board--neon-orange">No</span>
          <span className="Board--neon-blue">Lights</span>
        </h2>
        <table className="Board">
          <tbody>{tableBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
