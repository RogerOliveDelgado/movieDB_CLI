import dotenv from "dotenv";

dotenv.config();

const path = {
  type: "",
  popular: "",
  page: "",
};

export const getRequestOptions = (path) => {
  return {
    hostname: "api.themoviedb.org",
    port: 443,
    path: `${path}&api_key=${process.env.API_KEY}`,
    method: "GET",
  };
};
