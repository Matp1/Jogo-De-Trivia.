export const ADD_NAME = 'ADD_NAME';
export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_QUESTION_GAME = 'GET_QUESTION_GAME';
export const GET_REQUEST = 'GET_REQUEST';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';

export function actionAddName(name) {
  return {
    type: ADD_NAME,
    payload: name,
  };
}

export function actionAddEmail(email) {
  return {
    type: ADD_EMAIL,
    payload: email,
  };
}

export function actionAddScore(score) {
  return {
    type: ADD_SCORE,
    payload: score,
  };
}

export function actionAddAssertions(assertions) {
  return {
    type: ADD_ASSERTIONS,
    payload: assertions,
  };
}

export function getRequest(token) {
  return {
    type: GET_REQUEST,
    payload: token,
  };
}

export function actionGetQuestionGame(question) {
  return {
    type: GET_QUESTION_GAME,
    payload: question,
  };
}

export const fetchGetQuestion = async () => {
  try {
    const token = localStorage.getItem('token');
    const request = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchGetRequest = async () => {
  try {
    const request = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const response = await request.json();
    const { token } = response;
    localStorage.setItem('token', token);
  } catch (error) {
    return error;
  }
};
