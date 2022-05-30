import React from 'react';
import styled from 'styled-components';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//  O header deve conter as informações sobre a pessoa jogadora, como a imagem do Gravatar, o nome e o placar

const HeaderStyle = styled.header`{
  width: 100%;
  height: 150px;
  background: #093545;
  box-shadow: 1px 2px 10px rgb(108 183 15 / 40%),inset 0px -20px 40px rgb(44 94 72 / 81%);
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

class HeaderGame extends React.Component {
  render() {
    const { player: { name, email, score } } = this.props;
    return (
      <HeaderStyle>
        <HeaderGroup>
          <span>
            <img
              src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
              data-testid="header-profile-picture"
              alt="foto do usuário"
            />
          </span>
          <span data-testid="header-player-name">{`Player: ${name}`}</span>
          <span>  </span>
          <span data-testid="header-score">{`Score: ${score}`}</span>
        </HeaderGroup>
      </HeaderStyle>
    );
  }
}

HeaderGame.propTypes = {
  player: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(HeaderGame);
