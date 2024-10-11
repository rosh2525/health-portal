// scripts.js

function changeLanguage() {
    const language = document.getElementById("language-selector").value;
    setRecognitionLanguage();
    const translations = {
        en: {
            title: "Patient Registration",
            description: "Register as a patient to receive the best care from our doctors.",
            personalInfo: "Personal Information",
            nameLabel: "Name:",
            ageLabel: "Age:",
            genderLabel: "Gender:",
            addressLabel: "Address:",
            symptomsTitle: "Describe Your Problem",
            problemDescriptionLabel: "Problem Description:",
            symptomsLabel: "Symptoms:",
            precautionsTitle: "Precautions Based on Symptoms",
            precautionsText: "Please select a symptom to view precautions.",
            doctorAppointmentTitle: "Doctor Appointment",
            doctorRecommendation: "Based on your symptoms, we recommend the following specialists:",
            submitBtn: "Submit",
            genderOptions: ["Male", "Female", "Other"]
        },
        hi: {
            title: "रोगी पंजीकरण",
            description: "हमारे डॉक्टरों से सर्वोत्तम देखभाल प्राप्त करने के लिए पंजीकरण करें।",
            personalInfo: "व्यक्तिगत जानकारी",
            nameLabel: "नाम:",
            ageLabel: "आयु:",
            genderLabel: "लिंग:",
            addressLabel: "पता:",
            symptomsTitle: "अपनी समस्या का वर्णन करें",
            problemDescriptionLabel: "समस्या विवरण:",
            symptomsLabel: "लक्षण:",
            precautionsTitle: "लक्षणों के आधार पर सावधानियां",
            precautionsText: "सावधानियां देखने के लिए कृपया एक लक्षण चुनें।",
            doctorAppointmentTitle: "डॉक्टर अपॉइंटमेंट",
            doctorRecommendation: "आपके लक्षणों के आधार पर, हम निम्नलिखित विशेषज्ञों की सिफारिश करते हैं:",
            submitBtn: "जमा करें",
            genderOptions: ["पुरुष", "महिला", "अन्य"]
        },
        ta: {
            title: "நோயாளி பதிவுசெய்தல்",
            description: "உங்களுக்கு சிறந்த சிகிச்சையளிக்க எங்களின் மருத்துவர்களிடம் பதிவு செய்யவும்.",
            personalInfo: "தனிப்பட்ட தகவல்",
            nameLabel: "பெயர்:",
            ageLabel: "வயது:",
            genderLabel: "பாலினம்:",
            addressLabel: "முகவரி:",
            symptomsTitle: "உங்கள் பிரச்சினையை விவரிக்கவும்",
            problemDescriptionLabel: "பிரச்சனை விளக்கம்:",
            symptomsLabel: "அறிகுறிகள்:",
            precautionsTitle: "அறிகுறிகள் அடிப்படையிலான முன்னெச்சரிக்கை",
            precautionsText: "முன்னெச்சரிக்கைகளை காண ஒரு அறிகுறியைத் தேர்ந்தெடுக்கவும்.",
            doctorAppointmentTitle: "மருத்துவர் நியமனம்",
            doctorRecommendation: "உங்கள் அறிகுறிகளைப் பொருத்து, நாங்கள் பின்வரும் நிபுணர்களை பரிந்துரைக்கிறோம்:",
            submitBtn: "சமர்ப்பிக்க",
            genderOptions: ["ஆண்", "பெண்", "மற்றவை"]
        }
    };

    // Update text content based on language selection
    document.getElementById("register-title").textContent = translations[language].title;
    document.getElementById("register-description").textContent = translations[language].description;
    document.getElementById("personal-info-title").textContent = translations[language].personalInfo;
    document.getElementById("name-label").textContent = translations[language].nameLabel;
    document.getElementById("age-label").textContent = translations[language].ageLabel;
    document.getElementById("gender-label").textContent = translations[language].genderLabel;
    document.getElementById("address-label").textContent = translations[language].addressLabel;
    document.getElementById("symptoms-title").textContent = translations[language].symptomsTitle;
    document.getElementById("problem-description-label").textContent = translations[language].problemDescriptionLabel;
    document.getElementById("symptoms-label").textContent = translations[language].symptomsLabel;
    document.getElementById("precautions-title").textContent = translations[language].precautionsTitle;
    document.getElementById("precautions-text").textContent = translations[language].precautionsText;
    document.getElementById("doctor-appointment-title").textContent = translations[language].doctorAppointmentTitle;
    document.getElementById("doctor-recommendation").textContent = translations[language].doctorRecommendation;
    document.getElementById("submit-btn").textContent = translations[language].submitBtn;

    // Update gender options
    const genderOptions = translations[language].genderOptions;
    document.getElementById("gender").innerHTML = `
        <option value="male">${genderOptions[0]}</option>
        <option value="female">${genderOptions[1]}</option>
        <option value="other">${genderOptions[2]}</option>
    `;
}

// Show precautions based on symptoms
document.getElementById("symptoms").addEventListener("change", function () {
    const selectedSymptom = this.value;
    const precautions = {
        fever: "Drink plenty of fluids and take rest. Avoid crowded places.",
        cough: "Cover your mouth when coughing and avoid cold drinks.",
        headache: "Stay in a dark, quiet room and take pain relievers if necessary.",
        "stomach-pain": "Eat light meals and avoid fatty or spicy foods."
    };

    document.getElementById("precautions-text").textContent = precautions[selectedSymptom] || "Select a symptom to view precautions.";
});

// Recommend doctors based on symptoms
document.getElementById("symptoms").addEventListener("change", function () {
    const doctorRecommendations = {
        fever: ["General Physician", "Infectious Disease Specialist"],
        cough: ["Pulmonologist", "Allergist"],
        headache: ["Neurologist", "General Physician"],
        "stomach-pain": ["Gastroenterologist", "General Surgeon"]
    };

    const selectedSymptom = this.value;
    const doctors = doctorRecommendations[selectedSymptom] || [];
    const doctorList = document.getElementById("doctor-list");

    // Clear current list
    doctorList.innerHTML = "";

    // Add recommended doctors
    doctors.forEach(doctor => {
        const li = document.createElement("li");
        li.textContent = doctor;
        doctorList.appendChild(li);
    });
});

let recognition;
let isRecording = false;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else {
    alert('Speech recognition not supported in this browser. Please use Google Chrome.');
}

recognition.continuous = false;
recognition.interimResults = false;

// Set recognition language based on selected language
function setRecognitionLanguage() {
    const language = document.getElementById("language-selector").value;
    switch(language) {
        case 'en':
            recognition.lang = 'en-US';
            break;
        case 'hi':
            recognition.lang = 'hi-IN';
            break;
        case 'ta':
            recognition.lang = 'ta-IN';
            break;
    }
}

function startRecording() {
    if (!isRecording) {
        setRecognitionLanguage();
        recognition.start();
        isRecording = true;
        document.getElementById("recording-status").textContent = "Recording... Please speak now.";
    }
}

// When speech recognition is successful
recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    const symptomsTextBox = document.getElementById("problem-description");

    // Append the transcribed text to the problem description textarea
    symptomsTextBox.value += ' ' + transcript;

    document.getElementById("recording-status").textContent = "Recording stopped.";
    isRecording = false;
};

// Handle errors
recognition.onerror = function(event) {
    document.getElementById("recording-status").textContent = "Error occurred: " + event.error;
    isRecording = false;
};

// Stop recording when speech ends
recognition.onend = function() {
    document.getElementById("recording-status").textContent = "Recording stopped.";
    isRecording = false;
};