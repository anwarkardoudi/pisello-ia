const sendButton = document.getElementById('send-button');
const input = document.getElementById('message-input');
const chat = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');



// Carica i suoni
const sendSound = new Audio('send.mp3');
const receiveSound = new Audio('receive.wav');

function addMessage(text, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
  messageElement.textContent = text;
  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;

  // Suoni
  if (sender === 'user') sendSound.play();
  else receiveSound.play();
}

function handleSend() {
  const message = input.value.trim();
  if (message === '') return;

  addMessage(message, 'user');
  input.value = '';

  // Mostra "sta scrivendo..."
  typingIndicator.classList.remove('hidden');

  // Simula la risposta dell’IA
  setTimeout(() => {
    typingIndicator.classList.add('hidden');

    const fakeResponses = [
      "Sto pensando...",
      "Interessante, dimmi di più.",
      "Non sono ancora molto intelligente 😅",
      "Hai qualche altra domanda?",
      "Sono solo una demo, ma ci sto provando!"
    ];
    const randomResponse = fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
    addMessage(randomResponse, 'ai');
  }, 1200); // Puoi aumentare o diminuire il ritardo
}


sendButton.addEventListener('click', handleSend);
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') handleSend();
});

// Funzione per simulare la risposta dell'IA
// Funzione per simulare la risposta dell'IA con l'icona
function sendMessage() {
  const userMessage = document.getElementById("message-input").value;
  const chatMessages = document.getElementById("chat-messages");

  // Aggiungi il messaggio dell'utente alla chat
  const userMessageDiv = document.createElement("div");
  userMessageDiv.classList.add("user-message");
  userMessageDiv.textContent = userMessage;
  chatMessages.appendChild(userMessageDiv);

  // Mostra l'indicatore che l'IA sta scrivendo
  const typingIndicator = document.getElementById("typing-indicator");
  typingIndicator.style.display = "block";

  // Simula una risposta dell'IA dopo 2 secondi
  setTimeout(() => {
    // Nascondi l'indicatore e mostra la risposta dell'IA
    typingIndicator.style.display = "none";
    
    // Aggiungi la bolla di risposta dell'IA con l'icona
    const aiMessageDiv = document.createElement("div");
    aiMessageDiv.classList.add("ai-message");
    
    // Crea l'elemento icona
    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-robot");  // Icona del robot (puoi scegliere un'altra icona se vuoi)
    
    // Crea il messaggio dell'IA
    const messageText = document.createElement("span");
    messageText.textContent = "Risposta dell'IA";
    
    // Aggiungi l'icona e il testo alla bolla dell'IA
    aiMessageDiv.appendChild(icon);
    aiMessageDiv.appendChild(messageText);
    
    chatMessages.appendChild(aiMessageDiv);
  }, 2000);
}


// Aggiungi l'evento di invio al tasto invio
document.getElementById("send-button").addEventListener("click", sendMessage);



// Aggiungi un evento al clic sull'icona del pannello
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const icon = document.getElementById('sidebar-icon');

sidebarToggle.addEventListener('click', function() {
  // Aggiungi o rimuovi la classe "open" per l'animazione dell'icona
  sidebarToggle.classList.toggle('open');
  
  // Controlla se il pannello è già aperto
  if (sidebar.style.left === '0px') {
    // Se è aperto, lo ritira
    sidebar.style.left = '-250px';
  } else {
    // Se è chiuso, lo espande
    sidebar.style.left = '0px';
  }
});
const openaiApiKey = 'YOUR_OPENAI_API_KEY';  // Inserisci qui la tua API key

async function getAIResponse(userMessage) {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',  // Usa il modello GPT-3 più avanzato (è gratuito fino a un certo limite)
            prompt: userMessage,
            max_tokens: 150,
            temperature: 0.7,  // Regola la "creatività" delle risposte (tra 0 e 1)
        }),
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}
document.querySelector('button').addEventListener('click', async function () {
  const userMessage = document.querySelector('input').value;
  if (userMessage) {
      // Mostra il messaggio dell'utente nella chat
      const userMessageElement = document.createElement('div');
      userMessageElement.classList.add('user-message');
      userMessageElement.textContent = userMessage;
      document.querySelector('.chat-box').appendChild(userMessageElement);

      // Pulisce la casella di input
      document.querySelector('input').value = '';

      // Aggiungi la risposta dell'IA
      const aiResponse = await getAIResponse(userMessage);
      
      const aiMessageElement = document.createElement('div');
      aiMessageElement.classList.add('ai-message');
      aiMessageElement.textContent = aiResponse;
      document.querySelector('.chat-box').appendChild(aiMessageElement);
  }
});
