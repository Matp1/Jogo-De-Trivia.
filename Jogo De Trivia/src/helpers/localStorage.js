const token = '';

localStorage.setItem('token', JSON.stringify(token));

function getRanking() {
  if (localStorage.length > 0) {
    const storage = JSON.parse(localStorage.getItem('ranking'));
    return storage;
  }
}
export default getRanking;
