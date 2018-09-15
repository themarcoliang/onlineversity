var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US'; 
recognition.interimResults = true; 
recognition.maxAlternatives = 5; 

recognition.start(); 

recognition.onstart = function() { 
    console.log('Voice recognition activated. Try speaking into the microphone.'); 
} 

recognition.onspeechend = function() { 
    console.log('You were quiet for a while so voice recognition turned itself off.'); 
} 

recognition.onerror = function(event) { 
    if(event.error == 'no-speech') { 
        console.log('No speech was detected. Try again.'); 
    }; 
} 

recognition.onresult = function(event) { 
    var current = event.resultIndex; 
    var transcript = event.results[current][0].transcript; 
    console.log(transcript); 
}