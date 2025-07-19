document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu ul");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  // Sticky Header
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  // Chatbot Toggle
  const chatbotToggle = document.querySelector(".chatbot-toggle");
  const chatbotContainer = document.querySelector(".chatbot-container");
  const closeChatbot = document.querySelector(".close-chatbot");

  chatbotToggle.addEventListener("click", function () {
    chatbotContainer.classList.toggle("active");
  });

  closeChatbot.addEventListener("click", function () {
    chatbotContainer.classList.remove("active");
  });

  // Simple Chatbot Functionality
  const chatbotMessages = document.querySelector(".chatbot-messages");
  const chatInput = document.querySelector(".chatbot-input input");
  const sendButton = document.querySelector(".send-button");
  const voiceButton = document.querySelector(".voice-button");

  // Predefined responses
  const botResponses = {
    hello: "Hello there! How can I help you with cybersecurity today?",
    hi: "Hi! What cybersecurity questions do you have?",
    services:
      "I offer cybersecurity training, penetration testing, and workshops. You can learn more in the Services section.",
    contact:
      "You can reach me via email at contact@naqashcybersec.com or through the contact form on this website.",
    courses:
      "I teach courses on ethical hacking, network security, Python programming, and more. Check the Tools section for available courses.",
    default:
      "I'm sorry, I didn't understand that. Could you rephrase your question? I can help with information about cybersecurity services, courses, or contact details.",
  };

  // Add message to chat
  function addMessage(message, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chatbot-message");
    if (isUser) {
      messageDiv.style.marginLeft = "auto";
      messageDiv.style.backgroundColor = "#e3f2fd";
    }
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Process user input
  function processInput() {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
      addMessage(userMessage, true);
      chatInput.value = "";

      // Simple response logic
      const lowerMessage = userMessage.toLowerCase();
      let response = botResponses.default;

      if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        response = botResponses.hello;
      } else if (lowerMessage.includes("service")) {
        response = botResponses.services;
      } else if (lowerMessage.includes("contact")) {
        response = botResponses.contact;
      } else if (
        lowerMessage.includes("course") ||
        lowerMessage.includes("train")
      ) {
        response = botResponses.courses;
      }

      // Simulate typing delay
      setTimeout(() => {
        addMessage(response);
      }, 800);
    }
  }

  // Event listeners for chat
  sendButton.addEventListener("click", processInput);
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processInput();
    }
  });

  // Voice recognition (basic implementation)
  voiceButton.addEventListener("click", function () {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        processInput();
      };

      recognition.onerror = function (event) {
        addMessage(
          "Sorry, I couldn't understand your voice. Please try typing your question."
        );
      };
    } else {
      addMessage(
        "Voice recognition is not supported in your browser. Please type your question."
      );
    }
  });

  // Testimonial slider navigation
  const testimonialSlider = document.querySelector(".testimonial-slider");
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  testimonialSlider.addEventListener("mousedown", dragStart);
  testimonialSlider.addEventListener("touchstart", dragStart);

  testimonialSlider.addEventListener("mouseup", dragEnd);
  testimonialSlider.addEventListener("touchend", dragEnd);

  testimonialSlider.addEventListener("mouseleave", dragEnd);

  testimonialSlider.addEventListener("mousemove", drag);
  testimonialSlider.addEventListener("touchmove", drag);

  function dragStart(e) {
    if (e.type === "touchstart") {
      startPos = e.touches[0].clientX;
    } else {
      startPos = e.clientX;
      e.preventDefault();
    }
    isDragging = true;
  }

  function drag(e) {
    if (isDragging) {
      let currentPosition;
      if (e.type === "touchmove") {
        currentPosition = e.touches[0].clientX;
      } else {
        currentPosition = e.clientX;
      }
      const diff = currentPosition - startPos;
      testimonialSlider.style.transform = `translateX(${
        currentTranslate + diff
      }px)`;
    }
  }

  function dragEnd() {
    isDragging = false;
  }

  // Animation on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".service-card, .tool-card, .project-card, .blog-post"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animation
  document
    .querySelectorAll(".service-card, .tool-card, .project-card, .blog-post")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load
});
