// ==UserScript==
// @name         VK MediaSession Fix
// @name:ru      VK MediaSession Fix
// @namespace    https://github.com/your-username/vk-mediasession-fix
// @version      1.3.0
// @description  Adds MediaSession support for VK music (vk.com / vk.ru). Makes system media controls (Quick Media Controls, Taskbar Music Lounge, etc.) work with VK.
// @description:ru Добавляет поддержку MediaSession для музыки ВКонтакте. Позволяет системным мини-плеерам видеть и управлять музыкой VK.
// @author       You
// @match        *://vk.com/*
// @match        *://vk.ru/*
// @match        *://*.vk.com/*
// @match        *://*.vk.ru/*
// @grant        none
// @run-at       document-idle
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    console.log('[VK-MS] Script started');

    function decodeHtml(str) {
        if (!str) return '';
        const ta = document.createElement('textarea');
        ta.innerHTML = str;
        return ta.value;
    }

    function update() {
        try {
            if (typeof getAudioPlayer !== 'function') return;

            const player = getAudioPlayer();
            if (!player || !player._currentAudio) {
                if (navigator.mediaSession) {
                    navigator.mediaSession.playbackState = 'none';
                    navigator.mediaSession.metadata = null;
                }
                return;
            }

            const audio = player._currentAudio;

            let title  = decodeHtml(audio[3] || audio.title || 'Unknown');
            let artist = decodeHtml(audio[4] || audio.artist || 'VK');

            let artwork = [];
            if (audio[14]) {
                artwork = String(audio[14])
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean)
                    .map(src => ({
                        src,
                        sizes: '300x300',
                        type: 'image/jpeg'
                    }));
            }

            if (!navigator.mediaSession) {
                console.warn('[VK-MS] MediaSession API is not available');
                return;
            }

            navigator.mediaSession.metadata = new MediaMetadata({
                title,
                artist,
                album: 'VK',
                artwork
            });

            const isPlaying = player.isPlaying ? player.isPlaying() : !!player._isPlaying;
            navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';

            // Action handlers
            navigator.mediaSession.setActionHandler('play', () => {
                try { player.play(); } catch (e) {}
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                try { player.pause(); } catch (e) {}
            });
            navigator.mediaSession.setActionHandler('previoustrack', () => {
                try { player.playPrev(); } catch (e) {}
            });
            navigator.mediaSession.setActionHandler('nexttrack', () => {
                try { player.playNext(); } catch (e) {}
            });

            // Optional: position state (if available)
            try {
                if (navigator.mediaSession.setPositionState && audio[15]) {
                    const duration = Number(audio[15]) || 0;
                    const position = player._listenedTime || 0;
                    if (duration > 0) {
                        navigator.mediaSession.setPositionState({
                            duration,
                            playbackRate: 1,
                            position: Math.min(position, duration)
                        });
                    }
                }
            } catch (e) {}

            console.log('[VK-MS]', title, '—', artist);
        } catch (e) {
            console.error('[VK-MS] Error:', e);
        }
    }

    // Wait for VK player
    const waitForPlayer = setInterval(() => {
        if (typeof getAudioPlayer === 'function') {
            clearInterval(waitForPlayer);
            console.log('[VK-MS] Player found');

            try {
                const player = getAudioPlayer();
                if (player && Array.isArray(player.subscribers)) {
                    ['start', 'pause', 'stop', 'curr', 'progress', 'seek'].forEach(ev => {
                        player.subscribers.push({
                            et: ev,
                            cb: update
                        });
                    });
                    console.log('[VK-MS] Subscribed to player events');
                }
            } catch (e) {
                console.warn('[VK-MS] Could not subscribe to events, using timer only');
            }

            // Fallback timer
            setInterval(update, 1200);
            update();
        }
    }, 700);
})();