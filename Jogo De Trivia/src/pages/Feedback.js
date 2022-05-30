import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';

const FeedbackBg = styled.div`{display: flex; flex-direction:column;width:100%;
  height: 980px;background: #093545;}`;
const FeedbackH1 = styled.h1`
{    font-family: 'Lexend Deca';
font-weight: 100;
font-size: 50px;
line-height: 250px;
text-align: center;
color: #FFFFFF;
}`;
const FeedbackText = styled.p`{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding:10px;
}`;
const FeedbackAcertos = styled.div`{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
  padding:10px;
}`;
const FeedbackMain = styled.main`{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color:white;
}`;
const FeedbackBtn = styled.button`{
  width: 300px;
  height: 45px;
  margin:25px;
}`;
class Feedback extends Component {
  messageToShow = () => {
    const { score, assertions } = this.props;
    const THREE = 3;
    const answers = (
      <FeedbackText>
        <FeedbackAcertos>
          Você acertou&nbsp;
          <span data-testid="feedback-total-question">{assertions}</span>
          &nbsp;Pergunta(as)!
        </FeedbackAcertos>
        <br />
        <FeedbackAcertos>
          Um total de&nbsp;
          <span data-testid="feedback-total-score">{score}</span>
          &nbsp;pontos!
        </FeedbackAcertos>
      </FeedbackText>
    );
    if (Number(assertions) < THREE) {
      return (
        <div>
          <div>
            <FeedbackH1 data-testid="feedback-text">Could be better...</FeedbackH1>
          </div>
          <FeedbackText>
            {answers}
          </FeedbackText>
        </div>
      );
    }

    return (
      <div>
        <div>
          <FeedbackH1 data-testid="feedback-text">Well Done!</FeedbackH1>
        </div>
        <FeedbackText>
          {answers}
        </FeedbackText>
      </div>
    );
  }

  playAgain = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/');
  }

  viewRanking = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const messageToShow = this.messageToShow();
    return (
      <FeedbackBg>
        <HeaderFeedback />
        <FeedbackMain>
          <FeedbackText>
            {messageToShow}
          </FeedbackText>
          <div>
            <FeedbackBtn
              type="submit"
              data-testid="btn-play-again"
              onClick={ this.playAgain }
            >
              Jogar Novamente
            </FeedbackBtn>
            <FeedbackBtn
              type="submit"
              data-testid="btn-ranking"
              onClick={ this.viewRanking }
            >
              Ver Ranking
            </FeedbackBtn>
          </div>
        </FeedbackMain>
      </FeedbackBg>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

// export default Feedback;
export default connect(mapStateToProps, null)(Feedback);
