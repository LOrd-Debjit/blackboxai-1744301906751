// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const themeToggle = document.getElementById('themeToggle');

// State
let currentTheme = 'light';
let isMusicPlaying = false;
let currentEmotion = 'neutral';

// Therapeutic responses based on keywords
const therapeuticResponses = {
    anxiety: [
        "I hear that you're feeling anxious. Let's explore what's triggering these feelings.",
        "Anxiety can be overwhelming. Would you like to try a quick breathing exercise together?",
        "It's okay to feel anxious. Can you tell me more about when these feelings started?"
    ],
    depression: [
        "I understand that you're feeling down. It's important to talk about it. What's been on your mind?",
        "Depression can be tough. Have you considered any activities that usually help you feel better?",
        "It's okay to feel this way. Let's work through it together."
    ],
    stress: [
        "I can hear that you're under stress. Let's break this down together.",
        "Stress can feel overwhelming. Would you like to try some relaxation techniques?",
        "It's normal to feel stressed. Can you tell me more about what's causing this pressure?"
    ],
    general: [
        "I'm here to listen. Can you tell me more about that?",
        "How long have you been feeling this way?",
        "Your feelings are valid. Let's explore this together.",
        "What do you think triggered these feelings?",
        "I'm here to support you. Would you like to try some coping strategies?"
    ]
};

// Function to send a message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;

    // Add user message
    appendMessage('user', message);
    messageInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Generate and show bot response after a delay
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateResponse(message);
        appendMessage('bot', response);
    }, 1500);
}

// Function to append a message to the chat
function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message ${sender === 'bot' ? 'text-white ml-4' : 'bg-blue-100 text-gray-800 ml-auto'} p-4 rounded-lg shadow-md mb-4`;

    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="flex items-center mb-2">
                <i class="fas fa-user-md ${sender === 'bot' ? 'text-white' : 'text-blue-600'} mr-2"></i>
                <span class="font-montserrat font-semibold">Dr. MindfulAI</span>
            </div>
        `;
    }

    const textP = document.createElement('p');
    textP.className = 'font-opensans';
    textP.textContent = text;
    messageDiv.appendChild(textP);

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message bot-message text-white p-4 rounded-lg shadow-md ml-4 flex items-center';
    typingDiv.innerHTML = `
        <i class="fas fa-user-md text-white mr-2"></i>
        <div class="typing-indicator flex space-x-1">
            <span class="w-2 h-2 bg-white rounded-full"></span>
            <span class="w-2 h-2 bg-white rounded-full"></span>
            <span class="w-2 h-2 bg-white rounded-full"></span>
        </div>
    `;
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Function to generate a response based on user input
function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for keywords and return appropriate response
    if (message.includes('anxiety') || message.includes('anxious') || message.includes('worried')) {
        return getRandomResponse(therapeuticResponses.anxiety);
    } else if (message.includes('depress') || message.includes('sad') || message.includes('down')) {
        return getRandomResponse(therapeuticResponses.depression);
    } else if (message.includes('stress') || message.includes('overwhelm')) {
        return getRandomResponse(therapeuticResponses.stress);
    } else {
        return getRandomResponse(therapeuticResponses.general);
    }
}

// Function to get a random response from an array
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to toggle theme
function toggleTheme() {
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    if (currentTheme === 'light') {
        body.classList.add('dark');
        body.style.backgroundColor = '#1a1a2e';
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        currentTheme = 'dark';
    } else {
        body.classList.remove('dark');
        body.style.backgroundColor = '#f3f4f6';
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        currentTheme = 'light';
    }
}

// Function to toggle background music
function toggleMusic() {
    const icon = musicToggle.querySelector('i');
    
    if (isMusicPlaying) {
        backgroundMusic.pause();
        icon.classList.remove('text-green-600');
        icon.classList.add('text-purple-600');
    } else {
        backgroundMusic.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
        icon.classList.remove('text-purple-600');
        icon.classList.add('text-green-600');
    }
    
    isMusicPlaying = !isMusicPlaying;
}

// Function to update emotion
function updateEmotion(emotion) {
    currentEmotion = emotion;
    const emotionIcons = document.querySelectorAll('.emotion-icon');
    
    emotionIcons.forEach(icon => {
        icon.classList.remove('bg-gray-100');
    });
    
    event.currentTarget.classList.add('bg-gray-100');
}

// Event Listeners
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize background music volume
backgroundMusic.volume = 0.3;
