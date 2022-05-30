import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import md5 from 'crypto-js/md5';

const HeaderStyle = styled.header`{
  width: 100%;
  height: 150px;
  background: #093545;
  box-shadow: 1px 2px 10px rgb(108 183 15 / 40%), 0px 30px 40px rgb(44 94 72 / 81%);
  display:flex;
  align-items: center;

  color:white;
}`;
const HeaderGroup = styled.div`{
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: white;
  display:flex;
  justify-content: space-evenly;
  align-items: center;align-content: center;
}`;
class HeaderFeedback extends Component {
  constructor() {
    super();
    this.state = {
      gravatarImg: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      gravatarImg: url,
    });
  }

  render() {
    const { name, score } = this.props;
    const { gravatarImg } = this.state;
    return (
      <HeaderStyle>
        <HeaderGroup>
          <span>
            <img
              src={ gravatarImg }
              alt="Trivia"
              data-testid="header-profile-picture"
            />
          </span>
          <span data-testid="header-player-name">{name}</span>
          <span>  </span>
          <span data-testid="header-score">{score}</span>
        </HeaderGroup>
      </HeaderStyle>
    );
  }
}

HeaderFeedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(HeaderFeedback);
