'use strict';

const playList = [
    { author: "LED ZEPPELIN", song: "STAIRWAY TO HEAVEN" },
    { author: "QUEEN", song: "BOHEMIAN RHAPSODY" },
    { author: "LYNYRD SKYNYRD", song: "FREE BIRD" },
    { author: "DEEP PURPLE", song: "SMOKE ON THE WATER" },
    { author: "JIMI HENDRIX", song: "ALL ALONG THE WATCHTOWER" },
    { author: "AC/DC", song: "BACK IN BLACK" },
    { author: "QUEEN", song: "WE WILL ROCK YOU" },
    { author: "METALLICA", song: "ENTER SANDMAN" }
];

let currentLightIndex = 0;

function initPlaylist() {
    const listElement = document.getElementById('playlist-list');
    if (!listElement) return;

    listElement.innerHTML = '';

    playList.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'playlist__item';
        li.innerHTML = `
            <span class="playlist__number">${index + 1}</span>
            <div class="playlist__info">
                <span class="playlist__song">${item.song}</span>
                <span class="playlist__author">${item.author}</span>
            </div>
        `;
        listElement.appendChild(li);
    });
}

function openModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        overlay.classList.add('active');
    }
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
    }
}

function nextLight() {
    const red = document.getElementById('light-red');
    const yellow = document.getElementById('light-yellow');
    const green = document.getElementById('light-green');
    if (!red || !yellow || !green) return;

    red.classList.remove('active');
    yellow.classList.remove('active');
    green.classList.remove('active');

    currentLightIndex = (currentLightIndex + 1) % 3;

    if (currentLightIndex === 0) {
        red.classList.add('active');
    } else if (currentLightIndex === 1) {
        yellow.classList.add('active');
    } else if (currentLightIndex === 2) {
        green.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initPlaylist();
});
