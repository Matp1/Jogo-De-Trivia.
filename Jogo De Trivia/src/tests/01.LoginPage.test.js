import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from '../tests/helpers/renderWithRouterAndRedux';
import App from "../../src/App";

const VALID_EMAIL = 'acbde@email.com'
const VALID_NAME = 'abc'
const INVALID_EMAIL = 'acbdeemail.com'
const INVALID_NAME = '    '

describe("1 - Crie a página inicial de login com os seguintes campos e características:", () => {
  it("A rota para esta página deve ser '/'", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe("/");
  });

  it('Verifica se existe um input para nome e email', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByPlaceholderText('insira seu nome');
    expect(inputName).toBeInTheDocument();

    const inputEmail = screen.getByPlaceholderText('insira seu email');
    expect(inputEmail).toBeInTheDocument();
  });

  it('Verifica se existe os botões de acesso na página inicial', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByText(/Play/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    const buttonConfig = screen.getByText(/Configurações/i); 
    expect(buttonConfig).toBeInTheDocument();
  });

  it('Verifica botão desativado:', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText('insira seu nome');
    const inputEmail = screen.getByPlaceholderText('insira seu email');
    const button = screen.getByText(/Play/i);
    expect(button).toBeDisabled();

    userEvent.type(inputName, VALID_NAME);
    userEvent.type(inputEmail, VALID_EMAIL);
    expect(button).not.toBeDisabled();

    userEvent.type(inputName, INVALID_NAME);
    userEvent.type(inputEmail, INVALID_EMAIL);
    expect(button).toBeDisabled();
  });

  it('Verifica se o email é válido', () => {
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const button = screen.getByText(/Play/i);

    userEvent.type(name, VALID_NAME);
    userEvent.type(email, VALID_EMAIL);
    userEvent.click(button);

    expect(VALID_EMAIL).toBeInTheDocument;
  });

  it('A rota deve ser mudada para \'/game\' após o clique no botão.', async () => {

    const token = { 
        "response_code":0,
        "response_message":"Token Generated Successfully!",
        "token":"26e2101b945ce93288f38a02fad247b8cd8d2f97bd85efb70ef6b74fd5b5dc66"
    };

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(token),
      }));

    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByText(/Play/i);
    const inputName = screen.getByPlaceholderText('insira seu nome');
    const inputEmail = screen.getByPlaceholderText('insira seu email');
    expect(button).toBeDisabled();

    userEvent.type(inputName, VALID_NAME);
    userEvent.type(inputEmail, VALID_EMAIL);
    expect(button).toBeEnabled();      

    userEvent.click(button);
    await waitFor(() => {
        const { pathname } = history.location;
        expect(pathname).toBe('/game')
    });       
});

it('A rota deve ser mudada para \'/configuracao\' após o clique no botão.', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonConfig = screen.getByText(/Configurações/i);
    expect(buttonConfig).toBeInTheDocument();
    
    userEvent.click(buttonConfig);
    expect(history.location.pathname).toBe('/configuracao');
});
});