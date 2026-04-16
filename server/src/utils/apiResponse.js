function apiResponse(message, data = null) {
  return {
    success: true,
    message,
    data,
  };
}

module.exports = apiResponse;
