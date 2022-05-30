import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import getRanking from '../helpers/localStorage';

const RankingMain = styled.main`{
  display: flex;
  flex-direction: column;
  align-items: center;
  color:white;
  background: #093545;
}`;
const RankingH1 = styled.h1`
{    font-family: 'Lexend Deca';
font-weight: 100;
font-size: 50px;
line-height: 250px;
text-align: center;
color: #FFFFFF;
}`;
const RankingText = styled.li`{
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding:10px;
}`;
const RankinBtn = styled.button`{
  width: 300px;
  height: 45px;
  margin:25px;
}`;

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = getRanking();
    console.log(ranking);
    this.setState({
      ranking: ranking.sort((a, b) => b.score - a.score),
    });
  }

    clickToHome = (event) => {
      event.preventDefault();
      const { history } = this.props;
      history.push('/');
    }

    getGravatarImg = (email) => {
      console.log(email);
      const hash = md5(email).toString();
      return `https://www.gravatar.com/avatar/${hash}`;
    }

    render() {
      const { ranking } = this.state;
      return (
        <main>
          <RankingMain>
            <RankingH1 data-testid="ranking-title">Ranking</RankingH1>
            <ol>
              {ranking.length > 0 && (
                ranking.map((item, index) => (
                  <RankingText key={ index }>
                    <img
                      src={ this.getGravatarImg(item.gravatarEmail) }
                      alt={ `imagem de perfil de ${item.name}` }
                    />
                    <p
                      data-testid={ `player-name-${index}` }
                    >
                      { item.name }
                    </p>
                    <p
                      data-testid={ `player-score-${index}` }
                    >
                      { item.score }
                    </p>
                  </RankingText>
                ))
              )}
            </ol>
            <footer>
              <RankinBtn
                type="button"
                onClick={ this.clickToHome }
                data-testid="btn-go-home"
              >
                Inicio
              </RankinBtn>
            </footer>
          </RankingMain>
        </main>
      );
    }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Ranking;
