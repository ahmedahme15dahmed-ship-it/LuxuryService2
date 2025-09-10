/**
 * Luxury AI - نموذج ذكاء اصطناعي مستقل
 * ملف النموذج الرئيسي للذكاء الاصطناعي
 */

export class LuxuryAI {
  constructor() {
    this.name = "Luxury AI"
    this.version = "1.0.0"
    this.capabilities = [
      'تحليل الكود',
      'اكتشاف الأخطاء',
      'تحسين الأداء',
      'شرح الخوارزميات',
      'اقتراح التحسينات',
      'توليد الكود',
      'مراجعة الكود'
    ]
    
    // قاعدة معرفة البرمجة
    this.knowledgeBase = {
      lua: {
        keywords: ['function', 'end', 'if', 'then', 'else', 'elseif', 'while', 'for', 'do', 'repeat', 'until', 'local', 'return'],
        patterns: {
          function: /function\s+(\w+)\s*\([^)]*\)/g,
          variable: /local\s+(\w+)/g,
          loop: /(for|while|repeat)\s+/g
        },
        bestPractices: [
          'استخدم local للمتغيرات المحلية',
          'تجنب المتغيرات العامة غير الضرورية',
          'استخدم أسماء وصفية للدوال والمتغيرات',
          'أضف تعليقات للكود المعقد'
        ]
      },
      javascript: {
        keywords: ['function', 'var', 'let', 'const', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export'],
        patterns: {
          function: /(function\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>)/g,
          variable: /(let|const|var)\s+(\w+)/g,
          class: /class\s+(\w+)/g
        },
        bestPractices: [
          'استخدم const و let بدلاً من var',
          'استخدم Arrow Functions عند الحاجة',
          'تجنب التلوث العام (Global Pollution)',
          'استخدم async/await للعمليات غير المتزامنة'
        ]
      },
      python: {
        keywords: ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'import', 'from', 'return', 'try', 'except'],
        patterns: {
          function: /def\s+(\w+)\s*\([^)]*\):/g,
          class: /class\s+(\w+).*:/g,
          variable: /(\w+)\s*=/g
        },
        bestPractices: [
          'اتبع PEP 8 للتنسيق',
          'استخدم أسماء وصفية',
          'أضف docstrings للدوال والكلاسات',
          'استخدم Type Hints عند الإمكان'
        ]
      }
    }
    
    // قاموس الردود الذكية
    this.responses = {
      greetings: [
        'مرحباً! كيف يمكنني مساعدتك في البرمجة اليوم؟',
        'أهلاً بك! أنا هنا لمساعدتك في تحليل وتطوير الكود.',
        'مرحباً! ما هو التحدي البرمجي الذي تواجهه؟'
      ],
      codeAnalysis: [
        'دعني أحلل هذا الكود لك...',
        'سأقوم بفحص الكود وإعطائك تقرير مفصل.',
        'ممتاز! سأحلل هذا الكود وأقدم لك اقتراحات للتحسين.'
      ],
      improvements: [
        'إليك بعض الاقتراحات لتحسين الكود:',
        'يمكن تحسين هذا الكود من خلال:',
        'لجعل الكود أكثر كفاءة، أقترح:'
      ]
    }
  }
  
  /**
   * تحليل الكود المرفوع
   */
  analyzeCode(code, filename) {
    const fileExtension = filename.split('.').pop().toLowerCase()
    const language = this.detectLanguage(fileExtension)
    
    if (!language) {
      return `تم رفع الملف ${filename} بنجاح، لكنني لا أستطيع تحليل هذا النوع من الملفات حالياً. أدعم: Lua, JavaScript, Python, HTML, CSS.`
    }
    
    const analysis = this.performCodeAnalysis(code, language)
    const suggestions = this.generateSuggestions(code, language)
    
    return `
📊 **تحليل الملف: ${filename}**

🔍 **اللغة المكتشفة:** ${this.getLanguageName(language)}

📈 **تحليل الكود:**
${analysis}

💡 **اقتراحات التحسين:**
${suggestions}

✨ **أفضل الممارسات لـ ${this.getLanguageName(language)}:**
${this.knowledgeBase[language].bestPractices.map(practice => `• ${practice}`).join('\n')}

هل تريد مني شرح أي جزء معين من الكود أو مساعدتك في تحسينه؟
    `
  }
  
  /**
   * اكتشاف لغة البرمجة
   */
  detectLanguage(extension) {
    const languageMap = {
      'lua': 'lua',
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'javascript',
      'tsx': 'javascript',
      'py': 'python',
      'html': 'html',
      'css': 'css'
    }
    
    return languageMap[extension] || null
  }
  
  /**
   * الحصول على اسم اللغة بالعربية
   */
  getLanguageName(language) {
    const names = {
      'lua': 'Lua',
      'javascript': 'JavaScript',
      'python': 'Python',
      'html': 'HTML',
      'css': 'CSS'
    }
    
    return names[language] || language
  }
  
  /**
   * تحليل مفصل للكود
   */
  performCodeAnalysis(code, language) {
    const lines = code.split('\n').length
    const chars = code.length
    
    let analysis = `• عدد الأسطر: ${lines}\n• عدد الأحرف: ${chars}\n`
    
    if (this.knowledgeBase[language]) {
      const kb = this.knowledgeBase[language]
      
      // تحليل الدوال
      const functions = code.match(kb.patterns.function) || []
      analysis += `• عدد الدوال: ${functions.length}\n`
      
      // تحليل المتغيرات
      if (kb.patterns.variable) {
        const variables = code.match(kb.patterns.variable) || []
        analysis += `• عدد المتغيرات: ${variables.length}\n`
      }
      
      // تحليل الكلمات المفتاحية
      const keywordCount = kb.keywords.filter(keyword => 
        code.includes(keyword)
      ).length
      analysis += `• الكلمات المفتاحية المستخدمة: ${keywordCount}\n`
    }
    
    return analysis
  }
  
  /**
   * توليد اقتراحات التحسين
   */
  generateSuggestions(code, language) {
    const suggestions = []
    
    // فحص طول الأسطر
    const longLines = code.split('\n').filter(line => line.length > 100)
    if (longLines.length > 0) {
      suggestions.push('• بعض الأسطر طويلة جداً، فكر في تقسيمها لتحسين القراءة')
    }
    
    // فحص التعليقات
    const commentCount = (code.match(/\/\/|\/\*|\#|--/g) || []).length
    if (commentCount < code.split('\n').length * 0.1) {
      suggestions.push('• أضف المزيد من التعليقات لتوضيح الكود')
    }
    
    // فحص خاص بكل لغة
    if (language === 'javascript') {
      if (code.includes('var ')) {
        suggestions.push('• استخدم let أو const بدلاً من var')
      }
      if (!code.includes('use strict')) {
        suggestions.push('• فكر في استخدام "use strict" لكود أكثر أماناً')
      }
    }
    
    if (language === 'lua') {
      if (!code.includes('local ')) {
        suggestions.push('• استخدم local للمتغيرات المحلية لتجنب التلوث العام')
      }
    }
    
    if (language === 'python') {
      if (!code.includes('"""') && !code.includes("'''")) {
        suggestions.push('• أضف docstrings للدوال والكلاسات')
      }
    }
    
    return suggestions.length > 0 ? suggestions.join('\n') : '• الكود يبدو جيداً! لا توجد اقتراحات عاجلة.'
  }
  
  /**
   * توليد رد ذكي
   */
  generateResponse(message, uploadedFiles = []) {
    const lowerMessage = message.toLowerCase()
    
    // ردود على التحيات
    if (lowerMessage.includes('مرحبا') || lowerMessage.includes('السلام') || lowerMessage.includes('أهلا')) {
      return this.getRandomResponse('greetings')
    }
    
    // أسئلة حول القدرات
    if (lowerMessage.includes('ماذا تستطيع') || lowerMessage.includes('قدراتك') || lowerMessage.includes('تساعدني')) {
      return `أستطيع مساعدتك في:
      
${this.capabilities.map(cap => `✨ ${cap}`).join('\n')}

يمكنك رفع ملفات الكود وسأحللها لك، أو اسألني أي سؤال حول البرمجة!`
    }
    
    // أسئلة حول لغات البرمجة
    if (lowerMessage.includes('لغات') || lowerMessage.includes('أدعم')) {
      return `أدعم حالياً هذه اللغات:
      
🔹 **Lua** - تحليل وتحسين الكود
🔹 **JavaScript** - ES6+, Node.js, React
🔹 **Python** - تحليل وأفضل الممارسات  
🔹 **HTML/CSS** - هيكلة وتصميم الويب

ارفع ملفك وسأحلله لك فوراً!`
    }
    
    // أسئلة عامة حول البرمجة
    if (lowerMessage.includes('كيف') || lowerMessage.includes('شرح') || lowerMessage.includes('تعلم')) {
      return this.generateProgrammingAdvice(message)
    }
    
    // رد افتراضي ذكي
    return `شكراً لك على سؤالك! 

${message.includes('؟') ? 'هذا سؤال ممتاز.' : 'أقدر تفاعلك معي.'} 

يمكنني مساعدتك في:
• تحليل ومراجعة الكود
• شرح المفاهيم البرمجية  
• اقتراح التحسينات والحلول
• الإجابة على أسئلة البرمجة

ارفع ملف كود أو اسألني سؤالاً محدداً وسأكون سعيداً لمساعدتك! 🚀`
  }
  
  /**
   * توليد نصائح برمجية
   */
  generateProgrammingAdvice(question) {
    const advice = [
      'البرمجة فن يحتاج للممارسة المستمرة. ابدأ بمشاريع صغيرة وتدرج للأكبر.',
      'اقرأ الكود المكتوب من مطورين آخرين لتتعلم أساليب جديدة.',
      'لا تخف من الأخطاء - هي جزء من عملية التعلم.',
      'اكتب كود نظيف وقابل للقراءة، فأنت ستعود إليه لاحقاً.',
      'استخدم أدوات التحكم في الإصدارات مثل Git من البداية.'
    ]
    
    return `💡 **نصيحة برمجية:**

${advice[Math.floor(Math.random() * advice.length)]}

هل تريد مساعدة في موضوع برمجي محدد؟ ارفع ملف كود أو اسألني سؤالاً مفصلاً!`
  }
  
  /**
   * الحصول على رد عشوائي من فئة معينة
   */
  getRandomResponse(category) {
    const responses = this.responses[category]
    return responses[Math.floor(Math.random() * responses.length)]
  }
}