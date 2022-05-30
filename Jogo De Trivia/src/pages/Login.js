import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionAddEmail, actionAddName, actionAddScore } from '../redux/actions';

const LoginDiv = styled.div`{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 980px;
  background: #093545;
}`;
const LoginForm = styled.form`{
  display: flex;
  flex-direction: column;
  align-items: center;
}`;
const LoginH1 = styled.h1`
{
  font-family: 'Lexend Deca';
  font-weight: 100;
  font-size: 70px;
  line-height: 400px;
  text-align: center;
  color: #FFFFFF;
}`;
const LoginInputName = styled.input`{
  width: 300px;
  height: 45px;
  margin:10px;
  border-radius:5px
  text-align: center;padding-left:10px;
}`;
const LoginInputEmail = styled.input`{
  width: 300px;
  height: 45px;
  margin:10px;
  border-radius:5px
  text-align: center; padding-left:10px;

}`;
const BtnPlay = styled.button`{
  width: 300px;
  height: 45px;
  margin:25px;
}`;
const BtnConfig = styled.button`{
  width: 300px;
  height: 45px;
  margin:25px;
  }`;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      btnDisabled: true,
    };
  }

  componentDidMount() {
    const { setScore } = this.props;
    setScore(0);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verify());
  }

  verify = () => {
    const { email, name } = this.state;
    const num = 1;
    const pattern = /\S+@\S+.com/;
    if (name.length >= num && pattern.test(email)) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { history, setEmail, setName } = this.props;
    const endpoint = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await endpoint.json();
    localStorage.setItem('token', data.token);
    const { email, name } = this.state;
    setEmail(email);
    setName(name);
    history.push('/game');
  }

  btnConfig = () => {
    const { history } = this.props;
    history.push('/configuracao');
  }

  render() {
    const { email, name, btnDisabled } = this.state;
    return (
      <LoginDiv>
        <LoginH1>Sign in</LoginH1>
        <LoginForm>
          <LoginInputName
            type="text"
            value={ name }
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
            placeholder="Insira seu nome"
          />
          <LoginInputEmail
            type="email"
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            placeholder="Insira seu email"
          />
          <BtnPlay
            type="button"
            data-testid="btn-play"
            disabled={ btnDisabled }
            onClick={ this.handleClick }
          >
            Play
          </BtnPlay>
          <BtnConfig
            type="button"
            onClick={ this.btnConfig }
            data-testid="btn-settings"
          >
            Configurações
          </BtnConfig>
        </LoginForm>
      </LoginDiv>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setEmail: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(actionAddEmail(email)),
  setName: (name) => dispatch(actionAddName(name)),
  setScore: (score) => dispatch(actionAddScore(score)),
});

export default connect(null, mapDispatchToProps)(Login);
