export default function sendLoginData() {
    const email = document.getElementById('emailform').value;
    const password = document.getElementById('passwordform').value;
    if (email && password) {
        const loginData = {
            email,
            password,
        };
        const postParams = Object.keys(loginData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(loginData[key])}`).join('&');
        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:5000/sign_in';
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);
                localStorage.setItem('token', json.token);
            }
        };
        xhr.send(postParams);
    }
}
