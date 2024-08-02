document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    document.getElementById('reset-password-form').addEventListener('submit', handlePasswordReset);
});

const showForm = (form) => {
    document.querySelectorAll('.form').forEach(formElement => {
        formElement.classList.remove('active');
    });
    document.getElementById(`${form}-form`).classList.add('active');
    clearMessage();
};

const showMessage = (message, type) => {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
};

const clearMessage = () => {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = '';
    messageDiv.className = 'message';
    messageDiv.style.display = 'none';
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    return password.length > 3;
};

const validateName = (name) => {
    const re = /^[А-Яа-яЁё\s]+$/;
    return re.test(name);
};

const handleLogin = (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        showMessage('Успешная авторизация!', 'success');
    } else {
        showMessage('Неверный email или пароль!', 'error');
    }
};

const handleSignup = (event) => {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (validateName(name) && validateEmail(email) && validatePassword(password) && password === confirmPassword) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.email === email)) {
            showMessage('Этот email уже зарегистрирован!', 'error');
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Регистрация успешна!', 'success');
        showForm('auth');
    } else {
        showMessage('Ошибка регистрации!', 'error');
    }
};

const handlePasswordReset = (event) => {
    event.preventDefault();
    const email = document.getElementById('reset-email').value;

    if (validateEmail(email)) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email);

        if (user) {
            showMessage('Инструкции по восстановлению отправлены!', 'success');
        } else {
            showMessage('Пользователь с таким email не найден!', 'error');
        }
    } else {
        showMessage('Введите корректный email!', 'error');
    }
};
