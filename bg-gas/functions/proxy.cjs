const axios = require("axios");

exports.handler = async (event) => {
  const { url } = JSON.parse(event.body); 

  try {
    const response = await axios.get(url); 
    return {
      statusCode: 200,
      body: JSON.stringify(response.data), 
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message || "An error occurred" }),
    };
  }
};
