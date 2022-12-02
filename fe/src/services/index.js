const URL = 'http://127.0.0.1:8000';

export const getPlaceById = async (id) => {
  try {
    const place = await fetch(`${URL}/get-place/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    const nearest = await fetch(`${URL}/get-nearest-place/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });

    return { place: place, nearest: nearest };
  } catch (e) {
    console.log(e);
  }
};

export const getNearestById = async (id) => {
  try {
    const data = await fetch(`${URL}/get-nearest-place/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getNearestByLatLong = async (lat, long) => {
  try {
    const data = await fetch(`${URL}/get-user-nearest-place/lat=${lat}&long=${long}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const search = async (q) => {
  try {
    const data = await fetch(`${URL}/search-place/${q}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    return data;
  } catch (e) {
    console.log(e);
  }
};
