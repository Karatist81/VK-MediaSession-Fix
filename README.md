# VK MediaSession Fix

Userscript that adds proper **MediaSession** support for VK music (vk.com / vk.ru).

Without it, most system media players (Quick Media Controls, Taskbar Music Lounge, Windows media controls, etc.) simply don't see music playing from VK.

## Features
- Track title + artist
- Album art (when available)
- Play / Pause / Next / Previous
- Works on both `vk.com` and `vk.ru`

## Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/)
   - or [Violentmonkey](https://violentmonkey.github.io/) (recommended for Firefox)

2. Install the script from https://greasyfork.org/ru/scripts/600397-vk-mediasession-fix

3. Refresh the VK page and play any track.

## Notes

- **Yandex Browser** has very poor MediaSession → SMTC support. Use Chrome, Edge or Firefox instead.
- The script relies on VK’s internal player API (`getAudioPlayer`). If VK changes the player significantly, the script may break.

## History

Based on the old [vkaintegra](https://github.com/Sasha-Sorokin/vkaintegra) script (2019), completely rewritten for the current VK player (2026).

---

### Русская версия

Скрипт, который добавляет нормальную поддержку **MediaSession** для музыки ВКонтакте.

Без него большинство системных мини-плееров (Quick Media Controls, Taskbar Music Lounge и т.д.) просто не видят музыку из ВК.

## Возможности
- Название трека + артист
- Обложка (если есть)
- Play / Pause / Next / Previous
- Работает на `vk.com` и `vk.ru`

## Установка

1. Поставь менеджер скриптов:
   - [Tampermonkey](https://www.tampermonkey.net/)
   - или [Violentmonkey](https://violentmonkey.github.io/) (лучше для Firefox)

2. Установи скрипт по https://greasyfork.org/ru/scripts/600397-vk-mediasession-fix

3. Обнови страницу ВК и включи любой трек.

## Важно

- В **Яндекс Браузере** поддержка MediaSession очень слабая. Лучше использовать Chrome, Edge или Firefox.
- Скрипт использует внутренний API плеера ВК. Если ВК сильно поменяет плеер — может перестать работать.

## История

Основан на старом скрипте [vkaintegra](https://github.com/Sasha-Sorokin/vkaintegra) (2019), полностью переписан под актуальный ВК 2026 года.
