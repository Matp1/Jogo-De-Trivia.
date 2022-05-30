import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderGame from '../components/HeaderGame';
import { fetchGetRequest, fetchGetQuestion, actionAddScore,
  actionAddAssertions } from '../redux/actions';

const BtnNext = styled.button`{padding:10px 15px;border:none;border-radius:5px;
  transition:all 0.2s;margin:50px }`;
const DivBtn = styled.div`{width:100%;justify-content: center;display:flex;}`;
const CtgQuestion = styled.p`{font-weight:400;font-size:25px;line-height:150px;
  color:white;text-align:center;width:100%;}`;
const Questions = styled.p`{font-weight:100;font-size:20px;line-height:50px;
  text-align:center;width:100%;color:white;}`;
const GameBg = styled.div`{display:flex;flex-direction:column;width:100%;
  height: 980px;background: #093545;}`;
const Timer = styled.div`{width:100%;justify-content:center;display:flex;color:white;
  margin:60px}`;
const Answer = styled.div`{width:60%%;justify-content: center;display:flex;color:white;}`;
const BtnQt = styled.button`{width: 40%;padding:10px 15px;border:none;border-radius:5px;
  border: 2px solid black;transition:all 0.2s;}`;
const GroupQuestionsDiv = styled.div`{margin:100px;display:flex;flex-direction:column;
  align-items:center;}`;
class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: {},
      shuffledAnswers: [],
      currentQtI: 0,
      off: true,
      questionBtnOff: false,
      correctStyle: {},
      wrongStyle: {},
      nextBtn: false,
      score: 0,
      assertions: 0,
      countdown: 30,
      stopCount: 0,
      timer: true,
    };
    const TIME = 1000; this.timer = setInterval(this.tick.bind(this), TIME);
  }

  componentDidMount() { this.fetchGetQuestion(); }

  componentWillUnmount() { clearInterval(this.timer); }

  fetchGetQuestion = async () => {
    const { history } = this.props; fetchGetRequest();
    const getQuestion = await fetchGetQuestion();
    const code = 3; if (getQuestion.response_code === code) {
      localStorage.removeItem('token'); history.push('/');
    } const questions = getQuestion.results; const currentQtI = 0;
    const currentQt = questions[currentQtI]; const NUMBER = 0.5;
    const allAnswers = [...currentQt.incorrect_answers, currentQt.correct_answer,
    ]; const shuffledAnswers = allAnswers.sort(() => Math.random() - NUMBER);
    this.setState({ questions, shuffledAnswers });
  }

  checkAnswer = (e) => {
    e.preventDefault(); clearInterval(this.timer); const { target } = e;
    const { questions, currentQtI, countdown } = this.state; const stopCount = countdown;
    const correctAnswer = questions[currentQtI].correct_answer;
    const dificult = questions[currentQtI].difficulty;
    if (target.value === correctAnswer) {
      this.handleScore(stopCount, dificult);
    } this.setState({ nextBtn: true,
      off: false,
      questionBtnOff: true,
      correctStyle: { border: '3px solid rgb(6, 240, 15' },
      wrongStyle: { border: '3px solid red' },
      stopCount,
      countdown: 0,
      timer: false });
  }

  handleScore = () => {
    const magicNumber10 = 10; const { score, questions, currentQtI, assertions,
      stopCount } = this.state;
    const difficulty = this.handleDifficult(questions[currentQtI].difficulty);
    this.setState({ score: score + (magicNumber10 + (stopCount * difficulty)),
      assertions: assertions + 1 }, () => this.handleUserScore());
  }

  handleUserScore = () => {
    const { score, assertions } = this.state;
    const { setScore, setAssertions } = this.props;
    setScore(score); setAssertions(assertions);
  }

  handleDifficult = (difficult) => {
    const magicNumber3 = 3;
    if (difficult === 'easy') return 1; if (difficult === 'medium') return 2;
    if (difficult === 'hard') return magicNumber3;
  }

  shuffledAnswers = () => {
    const { questions, currentQtI } = this.state; const currentQt = questions[currentQtI];
    const NUMBER = 0.5;
    const allAnswers = [...currentQt.incorrect_answers, currentQt.correct_answer];
    const shuffledAnswers = allAnswers.sort(() => Math.random() - NUMBER);
    this.setState({
      shuffledAnswers,
    });
  }

  nxt = (e) => {
    e.preventDefault();
    const TIME = 1000; this.timer = setInterval(this.tick.bind(this), TIME);
    const { questions, currentQtI } = this.state;
    const { history } = this.props; if (currentQtI < questions.length - 1) {
      this.setState({ currentQtI: currentQtI + 1,
        off: true,
        questionBtnOff: false,
        correctStyle: {},
        wrongStyle: {},
        countdown: 30,
        timer: true }, () => this.shuffledAnswers());
    } else {
      const oldRank = JSON.parse(localStorage.getItem('ranking')) || [];
      const { name, score, gravatarEmail } = this.props;
      const newRank = [...oldRank, { name, score, gravatarEmail }];
      localStorage.setItem('ranking', JSON.stringify(newRank)); history.push('/feedback');
    }
  }

  tick() {
    const { countdown } = this.state; if (countdown === 0) {
      this.transition();
    } else { this.setState({ countdown: countdown - 1 }); }
  }

  transition() {
    clearInterval(this.timer); this.setState({ off: false,
      questionBtnOff: true,
      correctStyle: { border: '3px solid rgb(6, 240, 15' },
      wrongStyle: { border: '3px solid red' } });
  }

  renderQuestions = () => {
    const { questions, currentQtI, questionBtnOff, correctStyle, wrongStyle,
      shuffledAnswers } = this.state;
    const currentQt = questions[currentQtI];
    const correctAnswer = currentQt.correct_answer;
    return (
      <div>
        <CtgQuestion data-testid="question-category">{currentQt.category}</CtgQuestion>
        <Questions data-testid="question-text">{currentQt.question}</Questions>
        <Answer data-testid="answer-options">
          {
            shuffledAnswers.map((answer, index) => (
              (answer !== correctAnswer)
                ? (
                  <BtnQt
                    type="submit"
                    key={ index }
                    value={ answer }
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ this.checkAnswer }
                    disabled={ questionBtnOff }
                    style={ wrongStyle }
                  >
                    {answer}
                  </BtnQt>
                ) : (
                  <BtnQt
                    type="submit"
                    key={ index }
                    value={ answer }
                    data-testid="correct-answer"
                    onClick={ this.checkAnswer }
                    disabled={ questionBtnOff }
                    style={ correctStyle }
                  >
                    {answer}
                  </BtnQt>
                )
            ))
          }
        </Answer>
      </div>
    );
  }

renderButton = () => {
  const { off } = this.state;
  return (
    <DivBtn>
      <BtnNext type="submit" onClick={ this.nxt } disabled={ off } data-testid="btn-next">
        Next
      </BtnNext>
    </DivBtn>
  );
}

render() {
  const { questions, timer, countdown, stopCount, nextBtn } = this.state;
  return (
    <GameBg>
      <HeaderGame />
      <GroupQuestionsDiv>
        <div>
          { questions.length > 0 ? this.renderQuestions() : <p>Carregando</p> }
          { !nextBtn ? null : (
            this.renderButton())}
        </div>
        <Timer>
          { timer ? <span>{countdown}</span> : <span>{stopCount}</span> }
        </Timer>
      </GroupQuestionsDiv>
    </GameBg>
  );
}
}
Game.propTypes = { history: PropTypes.shape({
  push: PropTypes.func.isRequired }).isRequired,
setScore: PropTypes.func.isRequired,
setAssertions: PropTypes.func.isRequired,
name: PropTypes.string.isRequired,
score: PropTypes.number.isRequired,
gravatarEmail: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({ name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});
const mapDispatchToProps = (dispatch) => ({
  setScore: (score) => dispatch(actionAddScore(score)),
  setAssertions: (assertions) => dispatch(actionAddAssertions(assertions)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);
