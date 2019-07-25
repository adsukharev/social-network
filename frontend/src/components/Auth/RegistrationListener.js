export default function sendRegistrationData() {
    const name = document.getElementById('nameform').value;
    const email = document.getElementById('emailform').value;
    const password = document.getElementById('passwordform').value;
    const password2 = document.getElementById('passwordform2').value;
    if (name && email && password && password2) {
        const registerData = {
            fn: name,
            email,
            ph: password,
        };
        const postParams = Object.keys(registerData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(registerData[key])}`).join('&');
        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:5000/sign_up';
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
