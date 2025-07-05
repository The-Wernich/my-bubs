document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
    }
});

const messages = [
    "Hello my love 💜 - Do me a favour, tap the screen after reading each message 💞",
    "I want to start off by saying I'm the luckiest guy in the world 🌍",
    "I made this because I miss you, and I can't stop thinking about you 🤧",
    "I’ve been wondering how I could possibly make you smile today, when we’re so far apart 🤔",
    "And then this little idea came to mind 🤏✨",
    "I hope that with every click, your heart skips a little beat 💓",
    "I know this is really cheesy 🧀🫣",
    "But If being cheesy is what it takes to see you smile, then I’ll bring the whole fondue 🧀😘",
    "Did you see what I did there?, ’’fondue’’ like the cheese 🤭 (Okay I really am being cheesy now🤦‍♂️)",
    "But there’s something I really want to tell you...",
    "And it’s really important 😳",
    "Seriously, keep going — it’s really really important 🫢",
    "Okay ready?",
    "100% sure you’re ready??",
    "You’re really really ready??",
    "Okay here we go....",
    "Take a deep breath 😶‍🌫️",
    "You are so, so special to me!! 💝",
    "I keep thinking back to the night of April 3rd...",
    "And how a simple phone call had changed my entire life forever 🥺",
    "The end of that call was really the start of everything beautiful in my life. 🤧💓",
    "And I just wanted to take the time to tell you, how much I cherish you and all the little moments we have 💞",
    "You truly make me the happiest I could ever be 🌷",
    "I love you so, so much ❤️",
    "From the deepest part of my heart 🥺",
    "You mean everything to me 💘",
    "Here’s to forever with you. 🥂"
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
    $('.message').text(messages[currentPage]);
    
    isLastPage = currentPage === messages.length - 1;
    
    if (isLastPage) {
        $('.next-button').show();
        $('.bg_heart').css('cursor', 'default');
    } else {
        $('.next-button').hide();
        $('.bg_heart').css('cursor', 'pointer');
    }
}

$('.bg_heart').on('click', function() {
    if (!isLastPage) {
        currentPage++;
        showMessage();
    }
});

var love = setInterval(function() {
   var r_num = Math.floor(Math.random() * 40) + 1;
var r_size = Math.floor(Math.random() * 65) + 10;
var r_left = Math.floor(Math.random() * 100) + 1;
var r_time = Math.floor(Math.random() * 5) + 5;

// Generate soft lilac/purple shades
var r = Math.floor(Math.random() * 40) + 180; // Red: 180–220
var g = Math.floor(Math.random() * 30) + 140; // Green: 140–170 (softens tone)
var b = Math.floor(Math.random() * 40) + 180; // Blue: 180–220

$('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(" + r + "," + g + "," + b + ",1);animation:love " + r_time + "s ease'></div>");

$('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(" + (r - 10) + "," + (g + 10) + "," + (b + 10) + ",1);animation:love " + (r_time + 5) + "s ease'></div>");

    
    $('.heart').each(function() {
        var top = parseFloat($(this).css("top"));
        var width = parseFloat($(this).css("width"));
        if (top <= -100 || width >= 150) {
            $(this).remove();
        }
    });
}, 500);

showMessage();

function clearMusicState() {
    localStorage.removeItem('musicPlaying');
    localStorage.removeItem('musicCurrentTime');
}

window.onload = function() {
    clearMusicState(); 
}

function setupMusic() {
    const music = document.getElementById('backgroundMusic');
    
    if (!localStorage.getItem('initialLoad')) {
        clearMusicState();
        localStorage.setItem('initialLoad', 'true');
        music.currentTime = 0;
    }

    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

    if (isMusicPlaying) {
        music.currentTime = parseFloat(musicCurrentTime);
        music.play().catch(error => console.log('Playback failed', error));
    }

    music.addEventListener('play', () => {
        localStorage.setItem('musicPlaying', 'true');
    });

    music.addEventListener('pause', () => {
        localStorage.setItem('musicPlaying', 'false');
    });

    setInterval(() => {
        localStorage.setItem('musicCurrentTime', music.currentTime);
    }, 1000);

    document.addEventListener('click', function startMusic() {
        music.play().catch(error => {
            console.log('Autoplay prevented', error);
        });
        document.removeEventListener('click', startMusic);
    });
}

document.addEventListener('DOMContentLoaded', setupMusic);