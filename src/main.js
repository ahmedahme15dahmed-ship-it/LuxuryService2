import './style.css'
import { LuxuryAI } from './luxuryAI.js'

// Initialize the AI model
const luxuryAI = new LuxuryAI()

// Loading screen functionality
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen')
    const app = document.getElementById('app')
    
    loadingScreen.classList.add('fade-out')
    app.classList.remove('app-hidden')
    app.classList.add('app-visible')
    
    setTimeout(() => {
      loadingScreen.style.display = 'none'
    }, 500)
  }, 2000) // Show loading for 2 seconds
})

// Chat functionality
const messageInput = document.getElementById('messageInput')
const sendButton = document.getElementById('sendButton')
const messagesContainer = document.getElementById('messages')
const fileInput = document.getElementById('fileInput')
const fileUploadArea = document.getElementById('fileUploadArea')

let uploadedFiles = []

// File upload functionality
fileUploadArea.addEventListener('click', () => {
  fileInput.click()
})

fileUploadArea.addEventListener('dragover', (e) => {
  e.preventDefault()
  fileUploadArea.classList.add('drag-over')
})

fileUploadArea.addEventListener('dragleave', () => {
  fileUploadArea.classList.remove('drag-over')
})

fileUploadArea.addEventListener('drop', (e) => {
  e.preventDefault()
  fileUploadArea.classList.remove('drag-over')
  handleFiles(e.dataTransfer.files)
})

fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files)
})

function handleFiles(files) {
  Array.from(files).forEach(file => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      addMessage('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت.', false, true)
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const fileData = {
        name: file.name,
        content: e.target.result,
        type: file.type,
        size: file.size
      }
      uploadedFiles.push(fileData)
      displayUploadedFiles()
      
      // Analyze the file automatically
      analyzeFile(fileData)
    }
    reader.readAsText(file)
  })
}

function displayUploadedFiles() {
  let filesContainer = document.querySelector('.uploaded-files')
  if (!filesContainer) {
    filesContainer = document.createElement('div')
    filesContainer.className = 'uploaded-files'
    document.querySelector('.input-section').insertBefore(filesContainer, document.querySelector('.input-container'))
  }
  
  filesContainer.innerHTML = uploadedFiles.map((file, index) => `
    <div class="file-tag">
      <span>📄 ${file.name}</span>
      <span class="remove-file" onclick="removeFile(${index})">×</span>
    </div>
  `).join('')
}

function removeFile(index) {
  uploadedFiles.splice(index, 1)
  displayUploadedFiles()
}

function analyzeFile(fileData) {
  addMessage(`تم رفع الملف: ${fileData.name}`, true)
  
  setTimeout(() => {
    const analysis = luxuryAI.analyzeCode(fileData.content, fileData.name)
    addMessage(analysis, false)
  }, 1000)
}

function addMessage(content, isUser = false, isError = false) {
  const messageDiv = document.createElement('div')
  messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`
  
  const avatarHtml = isUser ? '' : `
    <div class="message-avatar">
      <div class="diamond-logo tiny">
        <svg viewBox="0 0 100 100" class="diamond-svg">
          <polygon points="50,10 80,35 50,90 20,35" fill="url(#avatarDiamondGradient)" stroke="#c0c0c0" stroke-width="2"/>
        </svg>
      </div>
    </div>
  `
  
  messageDiv.innerHTML = `
    ${avatarHtml}
    <div class="message-content ${isError ? 'error' : ''}">
      ${content}
    </div>
  `
  
  messagesContainer.appendChild(messageDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function sendMessage() {
  const message = messageInput.value.trim()
  if (!message && uploadedFiles.length === 0) return
  
  if (message) {
    addMessage(message, true)
    messageInput.value = ''
    
    // Get AI response
    setTimeout(() => {
      const response = luxuryAI.generateResponse(message, uploadedFiles)
      addMessage(response, false)
    }, 1000)
  }
}

sendButton.addEventListener('click', sendMessage)
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage()
  }
})

// Make removeFile function global
window.removeFile = removeFile