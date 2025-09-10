import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <header class="header">
      <h1>🤖 Luxury Gemini Assistant</h1>
      <p>مساعد ذكي فاخر مدعوم بتقنية Gemini</p>
    </header>
    
    <main class="main">
      <div class="chat-container">
        <div class="messages" id="messages">
          <div class="message assistant">
            <div class="message-content">
              مرحباً! أنا مساعدك الذكي الفاخر. كيف يمكنني مساعدتك اليوم؟
            </div>
          </div>
        </div>
        
        <div class="input-container">
          <input 
            type="text" 
            id="messageInput" 
            placeholder="اكتب رسالتك هنا..."
            class="message-input"
          />
          <button id="sendButton" class="send-button">
            إرسال
          </button>
        </div>
      </div>
    </main>
  </div>
`

// Add event listeners
const messageInput = document.getElementById('messageInput')
const sendButton = document.getElementById('sendButton')
const messagesContainer = document.getElementById('messages')

function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div')
  messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`
  messageDiv.innerHTML = `
    <div class="message-content">
      ${content}
    </div>
  `
  messagesContainer.appendChild(messageDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function sendMessage() {
  const message = messageInput.value.trim()
  if (!message) return
  
  addMessage(message, true)
  messageInput.value = ''
  
  // Simulate AI response
  setTimeout(() => {
    const responses = [
      'شكراً لك على رسالتك. كيف يمكنني مساعدتك أكثر؟',
      'هذا سؤال رائع! دعني أفكر في أفضل إجابة لك.',
      'أفهم ما تقصده. هل تريد المزيد من التفاصيل؟',
      'ممتاز! هل هناك شيء آخر تود معرفته؟'
    ]
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    addMessage(randomResponse)
  }, 1000)
}

sendButton.addEventListener('click', sendMessage)
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage()
  }
})