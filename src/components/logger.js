function customLogger(message) {
    if (import.meta.env.REACT_APP_ENABLE_LOGGING === 'true') {
      console.log(message);
    }
  }
  
  console.log = customLogger;
  