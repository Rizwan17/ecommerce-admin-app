const baseUrl = process.env.API || "https://flipkart-rest-server.herokuapp.com";

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
