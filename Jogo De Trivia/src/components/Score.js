import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddScore } from '../redux/actions/index';

class Score extends React.Component {
  constructor() {
    super();
    this.state = {
      score: 0,
    };
  }

  componentDidUpdate(e) {
    const { correctAnswer, points } = this.props;
    if (points !== e.points && correctAnswer === points) {
      this.handleScore();
    }
  }

  handleScore = () => {
    const { stopCountdown } = this.props;
    const magicNumber10 = 10;
    const difficultValue = this.handleDifficult();
    this.setState({
      score: magicNumber10 + (stopCountdown * difficultValue),
    }, () => this.handleUserScore());
  }

  handleUserScore = () => {
    const { score } = this.state;
    const { setScore } = this.props;
    setScore(score);
  }

  handleDifficult = () => {
    const { difficult } = this.props;
    const magicNumber3 = 3;
    if (difficult === 'easy') return 1;
    if (difficult === 'medium') return 2;
    if (difficult === 'hard') return magicNumber3;
  }

  render() {
    const { score } = this.state;
    return (
      <p>{ score }</p>
    );
  }
}

const mapStateToProps = (state) => ({
  stopCountdown: state.stopCountdown,
});

const mapDispatchToProps = (dispatch) => ({
  setScore: (score) => dispatch(actionAddScore(score)),
});

Score.propTypes = {
  correctAnswer: PropTypes.string,
  points: PropTypes.string,
  stopCountdown: PropTypes.number,
  difficult: PropTypes.string,
  setScore: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Score);
