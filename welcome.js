// Welcome Screen with Voice
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        showWelcome();
    }, 100);
});



function showWelcome() {
    const overlay = document.createElement('div');
    overlay.className = 'welcome-overlay';
    overlay.innerHTML = `
        <div class="welcome-content" onclick="startVoice()">
            <div class="welcome-logo">
                <img src="png 2.png" alt="Priothy">
            </div>
            <h1 class="welcome-title">প্রিয়থিতে স্বাগতম</h1>
            <p class="welcome-subtitle">আপনার প্রিমিয়াম শপিং গন্তব্য</p>
            <div class="welcome-instructions">
                <div class="instruction-item">
                    <i class="fas fa-shopping-bag"></i>
                    <p>আমাদের এক্সক্লুসিভ কালেকশন ব্রাউজ করুন</p>
                </div>
                <div class="instruction-item">
                    <i class="fas fa-heart"></i>
                    <p>আপনার পছন্দের আইটেম উইশলিস্টে যোগ করুন</p>
                </div>
                <div class="instruction-item">
                    <i class="fas fa-truck"></i>
                    <p>দ্রুত ফ্রি ডেলিভারি উপভোগ করুন</p>
                </div>
            </div>
            <button class="welcome-btn" onclick="closeWelcome()">
                <span>শপিং শুরু করুন</span>
                <i class="fas fa-arrow-right"></i>
            </button>
            <button class="sound-toggle" onclick="toggleSound()">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.add('active');
        setTimeout(() => {
            startVoice();
        }, 800);
    }, 100);
}

function startVoice() {
    speakWelcome();
}

function speakWelcome() {
    if (window.speechSynthesis) {
        speechSynthesis.cancel();
        
        const text = "Welcome to Priothy, your premium shopping destination. Browse our exclusive collections, add your favorites to the wishlist, and enjoy fast free delivery. Click start shopping to begin your journey.";
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-US';
        speech.rate = 0.9;
        speech.pitch = 1;
        speech.volume = 1;
        
        setTimeout(() => {
            speechSynthesis.speak(speech);
        }, 500);
    }
}

function closeWelcome() {
    speechSynthesis.cancel();
    const overlay = document.querySelector('.welcome-overlay');
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 500);
}

function toggleSound() {
    const btn = document.querySelector('.sound-toggle i');
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        btn.className = 'fas fa-volume-mute';
    } else {
        speakWelcome();
        btn.className = 'fas fa-volume-up';
    }
}
