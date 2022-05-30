import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ConfigBackground = styled.div`{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 980px;
  background: #093545;
}`;

const LoginConfig = styled.form`{
  display: flex;
  flex-direction: column;
  align-items: center;
}`;
const ConfigH1 = styled.h1`
{
  font-family: 'Lexend Deca';
  font-weight: 100;
  font-size: 70px;
  line-height: 200px;
  text-align: center;
  color: #FFFFFF;
}`;
const SelectCategory = styled.div`{
  height: 75px;
  margin:30px;
  text-align: center;
  color:white;
}`;
const BtnSalvar = styled.button`{padding:10px 15px;border:none;border-radius:5px;
  transition:all 0.2s;}`;

export default class Config extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <ConfigBackground>
        <ConfigH1 data-testid="settings-title">Configurações</ConfigH1>
        <LoginConfig>
          <SelectCategory>
            Categoria
            <select label="select1" id="select1">
              <option defaultValue="Todas">Todas</option>
            </select>
          </SelectCategory>
          <SelectCategory>
            Dificuldade
            <select label="select2" id="select2">
              <option defaultValue="Normal">Normal</option>
            </select>
          </SelectCategory>
          <SelectCategory>
            Tipo
            <select label="select3" id="select3">
              <option defaultValue="Todos">Todos</option>
            </select>
          </SelectCategory>
          <BtnSalvar
            type="button"
            onClick={ this.handleClick }
          >
            Salvar
          </BtnSalvar>
        </LoginConfig>
      </ConfigBackground>
    );
  }
}

Config.propTypes = {
  history: PropTypes.shape,
}.isRequired;
