export function saveCookie(cookie, url, host='localhost') {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    fetch(`http://${host}:3005/${url}`, {
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies
        headers: headers,
        body: JSON.stringify(cookie)
    }).then(a => console.log("googd"));
}