export const onKeyDownLogin = event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const loginButton = document.querySelector('#login-btn');
        if (loginButton) {
            loginButton.click();
        }
    }
};