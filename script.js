let currentUser = { name: "", avatar: "MSN1.png", lang: "ru" };
let currentChat = "Global Chat";

// Локализация
const texts = {
    ru: { title: "MSN Online", welcome: "Добро пожаловать", add: "Добавить имя:" },
    en: { title: "MSN Online", welcome: "Welcome", add: "Enter name:" }
};

function login() {
    const name = document.getElementById('username-input').value;
    if (name.trim() === "") return alert("Введите имя!");
    
    currentUser.name = name;
    document.getElementById('my-name').innerText = name;
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
}

function switchChat(name) {
    currentChat = name;
    document.getElementById('chat-with').innerText = name;
    document.querySelectorAll('.contact').forEach(el => el.classList.remove('active'));
    // Подсветка активного контакта (упрощенно)
    event?.target.classList.add('active');
}

function sendMessage() {
    const input = document.getElementById('msg-input');
    const text = input.value;
    if (!text) return;

    addMessage(currentUser.name, text, 'my-msg');
    input.value = "";

    // Логика MSN AI
    if (currentChat === "MSN AI") {
        setTimeout(() => {
            addMessage("MSN AI", "Привет! Я твой ретро-помощник. Чем могу помочь?", 'ai-msg');
        }, 1000);
    }
}

function addMessage(sender, text, type) {
    const container = document.getElementById('messages-container');
    const msgDiv = document.createElement('div');
    msgDiv.innerHTML = `<b>${sender}:</b> ${text}`;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function addContactPrompt() {
    const name = prompt("Введите имя нового контакта:");
    if (name) {
        const list = document.getElementById('contacts');
        const newContact = document.createElement('div');
        newContact.className = 'contact';
        newContact.innerText = name;
        newContact.onclick = () => switchChat(name);
        list.appendChild(newContact);
    }
}

function toggleSettings() {
    document.getElementById('settings-modal').classList.toggle('hidden');
}

function setAvatar(src) {
    currentUser.avatar = src;
    document.getElementById('my-avatar').src = src;
}

function saveSettings() {
    const newName = document.getElementById('new-name-input').value;
    const lang = document.getElementById('lang-select').value;
    
    if (newName) {
        currentUser.name = newName;
        document.getElementById('my-name').innerText = newName;
    }
    
    currentUser.lang = lang;
    document.getElementById('app-title').innerText = texts[lang].title;
    
    toggleSettings();
}
