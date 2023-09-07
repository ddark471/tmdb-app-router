import axios from "axios";

export const service = (url, requestMethod) => {
  const options = {
    method: requestMethod,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDJjOGNkZjM4M2NlZDM5OThmMzVlYTM5MTcyNWMxMiIsInN1YiI6IjYzYjZjNGMwOGVlNDljMDA3ZTM0OGFmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m596AqSxZcM2Num2MdDCznhwE-3Xw47YOWJOnBo0EGc",
    },
    baseURL: "https://api.themoviedb.org/3",
  };

  let apiResponse = axios(url, options)
    .then((res) => res)
    .catch((err) => console.error(err));

  return apiResponse;
};
