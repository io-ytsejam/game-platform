function sendData(data, path, req = 'POST', credentials = false) {
  let XHR = new XMLHttpRequest();


  // Define what happens on successful data submission
  XHR.addEventListener('load', function(event) {
    console.log('Data POST OK');
  });

  // Define what happens in case of errorsss
  XHR.addEventListener('error', function(event) {
    console.log(`Error occurred: ${event}`);
    throw Error(req+' data error occurred');
  });

  // Set up our request
  XHR.open(req, 'http://192.168.1.13:3005/'+path);

  if (path === "user-connected")
  XHR.withCredentials = true;

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader('Content-Type', 'application/json');

  // Finally, send our data.
  XHR.send(data);
}

export default sendData;
