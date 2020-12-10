const baseUrl =
  location.hostname === "localhost"
    ? "http://localhost:2000"
    : "https://flipkart-rest-server.herokuapp.com";

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
