const URL = 'http://127.0.0.1:8000';

export const search = async (key) => {
  try {
    const data = await fetch(`${URL}/`);
  } catch (e) {
    console.error(e);
  }
};
