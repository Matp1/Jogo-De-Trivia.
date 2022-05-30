import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from '../tests/helpers/renderWithRouterAndRedux';
import Feedback from "../pages/Feedback";

describe("1 - Verificando a página de Feedback e suas informações",  () => {
  it('Verifica se existe uma imagem de perfil na tela', () => {
    renderWithRouterAndRedux(<Feedback />);
    const img = screen.getByTestId('header-profile-picture');
    expect(img).toBeInTheDocument();
  });

  it('Verifica se existe o nome do jogador na tela', () => {
    renderWithRouterAndRedux(<Feedback />);

    const userName = screen.getByTestId('header-player-name');
    expect(userName).toBeInTheDocument();
  });

  it('Verifica se existe a pontuação do jogador na tela', () => {
    renderWithRouterAndRedux(<Feedback />);

    const userScore = screen.getByTestId('header-score');
    expect(userScore).toBeInTheDocument();
  });

  it('Verifica se aparece um mensagem de Feedback', () => {
    renderWithRouterAndRedux(<Feedback />);
    const msg = screen.getByRole('heading', { level:1 });

    expect(msg).toBeInTheDocument();
  });

  it('Verifica se existe a quantidade de respostas certas na tela', () => {
    renderWithRouterAndRedux(<Feedback />);
    const correctAnswer = screen.getByTestId('feedback-total-question');
    expect(correctAnswer).toBeInTheDocument();
});

it('Verifica se a pontuação total de acordo com os acertos', () => {
    renderWithRouterAndRedux(<Feedback />);

    const scoreTotal = screen.getByTestId('feedback-total-score');
    expect(scoreTotal).toBeInTheDocument();
    });
    
    it('Verifica o botão para jogar novamente', () => {
      renderWithRouterAndRedux(<Feedback />);
  
      const btnPlayAgain = screen.getByText(/Jogar Novamente/i);
      expect(btnPlayAgain).toBeInTheDocument();
      
      userEvent.click(btnPlayAgain);
      expect(history.location.pathname).toBe('/');
      });
  it('Verifica o botão de acesso ao ranking', () => {
      renderWithRouterAndRedux(<Feedback />);
      
      const btnRanking = screen.getByText(/Ver Ranking/i);
      expect(btnRanking).toBeInTheDocument();
      
      userEvent.click(btnRanking);
      expect(history.location.pathname).toBe('/ranking');
      });
  
});