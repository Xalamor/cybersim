export const CATEGORIES = ["Фишинг", "Пароли", "Wi-Fi", "Соцсети"];

export const SITUATIONS = [
  // ---------- ФИШИНГ ----------
  {
    id: "phish-bank",
    category: "Фишинг",
    difficulty: 1,
    title: "Письмо от банка",
    scenario:
      "Пришло письмо: «Срочно подтвердите данные, иначе счёт будет заблокирован».",
    options: [
      {
        id: "a",
        text: "Перейти по ссылке и ввести данные карты.",
        impact: { total: -2, categories: { Фишинг: -2 } },
        feedback: "Классический фишинг: давление временем и ссылка.",
      },
      {
        id: "b",
        text: "Зайти в банк через официальный сайт или приложение.",
        impact: { total: +2, categories: { Фишинг: +2 } },
        feedback: "Правильно: никаких ссылок из писем.",
      },
      {
        id: "c",
        text: "Ответить на письмо и уточнить, что случилось.",
        impact: { total: -1, categories: { Фишинг: -1 } },
        feedback: "Мошенники часто отвечают и усиливают давление.",
      },
    ],
    bestOptionId: "b",
    tip: "Никогда не переходи по ссылкам из срочных писем.",
  },

  {
    id: "phish-prize",
    category: "Фишинг",
    difficulty: 1,
    title: "Ты выиграл приз",
    scenario:
      "Сообщение: «Вы выиграли смартфон! Перейдите по ссылке для получения».",
    options: [
      {
        id: "a",
        text: "Перейти по ссылке — вдруг правда.",
        impact: { total: -2, categories: { Фишинг: -2 } },
        feedback: "Бесплатный сыр — классическая уловка.",
      },
      {
        id: "b",
        text: "Удалить сообщение.",
        impact: { total: +2, categories: { Фишинг: +2 } },
        feedback: "Правильно: ты ничего не выигрывал.",
      },
      {
        id: "c",
        text: "Переслать друзьям — вдруг им тоже повезёт.",
        impact: { total: -1, categories: { Фишинг: -1 } },
        feedback: "Так распространяются мошеннические схемы.",
      },
    ],
    bestOptionId: "b",
    tip: "Если ты не участвовал — ты не выигрывал.",
  },

  // ---------- WI-FI ----------
  {
    id: "wifi-cafe",
    category: "Wi-Fi",
    difficulty: 1,
    title: "Wi-Fi в кафе",
    scenario:
      "Ты подключился к бесплатному Wi-Fi и хочешь зайти в онлайн-банк.",
    options: [
      {
        id: "a",
        text: "Зайти как обычно.",
        impact: { total: -2, categories: { "Wi-Fi": -2 } },
        feedback: "Публичные сети небезопасны.",
      },
      {
        id: "b",
        text: "Использовать мобильный интернет.",
        impact: { total: +2, categories: { "Wi-Fi": +2 } },
        feedback: "Самый безопасный вариант.",
      },
      {
        id: "c",
        text: "Просто посмотреть баланс.",
        impact: { total: -1, categories: { "Wi-Fi": -1 } },
        feedback: "Даже это может быть опасно.",
      },
    ],
    bestOptionId: "b",
    tip: "Финансовые операции — только в доверенной сети.",
  },

  {
    id: "wifi-qr",
    category: "Wi-Fi",
    difficulty: 2,
    title: "QR-код Wi-Fi",
    scenario:
      "На столе QR-код: «Бесплатный Wi-Fi для клиентов».",
    options: [
      {
        id: "a",
        text: "Отсканировать и подключиться.",
        impact: { total: -2, categories: { "Wi-Fi": -2 } },
        feedback: "QR-код может вести на поддельную сеть.",
      },
      {
        id: "b",
        text: "Спросить пароль у персонала.",
        impact: { total: +2, categories: { "Wi-Fi": +2 } },
        feedback: "Правильно: уточнять у источника.",
      },
      {
        id: "c",
        text: "Использовать мобильный интернет.",
        impact: { total: +1, categories: { "Wi-Fi": +1 } },
        feedback: "Безопасная альтернатива.",
      },
    ],
    bestOptionId: "b",
    tip: "QR-коды — не всегда безопасны.",
  },

  // ---------- ПАРОЛИ ----------
  {
    id: "pw-reuse",
    category: "Пароли",
    difficulty: 1,
    title: "Один пароль",
    scenario:
      "Ты используешь один пароль для всех сервисов.",
    options: [
      {
        id: "a",
        text: "Оставить — так проще.",
        impact: { total: -2, categories: { Пароли: -2 } },
        feedback: "Один взлом — и всё потеряно.",
      },
      {
        id: "b",
        text: "Сделать разные пароли.",
        impact: { total: +2, categories: { Пароли: +2 } },
        feedback: "Правильная стратегия.",
      },
      {
        id: "c",
        text: "Записать пароли в заметки.",
        impact: { total: -1, categories: { Пароли: -1 } },
        feedback: "Небезопасно без защиты.",
      },
    ],
    bestOptionId: "b",
    tip: "Уникальный пароль для каждого сервиса.",
  },

  {
    id: "pw-manager",
    category: "Пароли",
    difficulty: 2,
    title: "Менеджер паролей",
    scenario:
      "Сервис предлагает использовать менеджер паролей.",
    options: [
      {
        id: "a",
        text: "Не доверять и хранить всё в голове.",
        impact: { total: -1, categories: { Пароли: -1 } },
        feedback: "Человеческая память ненадёжна.",
      },
      {
        id: "b",
        text: "Использовать менеджер паролей.",
        impact: { total: +2, categories: { Пароли: +2 } },
        feedback: "Лучшее решение.",
      },
      {
        id: "c",
        text: "Скриншотить пароли.",
        impact: { total: -2, categories: { Пароли: -2 } },
        feedback: "Очень плохая идея.",
      },
    ],
    bestOptionId: "b",
    tip: "Менеджер паролей — стандарт безопасности.",
  },

  // ---------- СОЦСЕТИ ----------
  {
    id: "social-friend",
    category: "Соцсети",
    difficulty: 1,
    title: "Новый друг",
    scenario:
      "Неизвестный человек добавляется в друзья.",
    options: [
      {
        id: "a",
        text: "Принять — вдруг знакомый.",
        impact: { total: -1, categories: { Соцсети: -1 } },
        feedback: "Фейковые аккаунты — частое явление.",
      },
      {
        id: "b",
        text: "Посмотреть профиль и общих друзей.",
        impact: { total: +2, categories: { Соцсети: +2 } },
        feedback: "Правильный подход.",
      },
      {
        id: "c",
        text: "Сразу написать личные данные.",
        impact: { total: -2, categories: { Соцсети: -2 } },
        feedback: "Опасно делиться личной информацией.",
      },
    ],
    bestOptionId: "b",
    tip: "Проверяй аккаунты перед общением.",
  },

  {
    id: "social-geo",
    category: "Соцсети",
    difficulty: 2,
    title: "Геолокация",
    scenario:
      "Ты хочешь выложить сторис с включённой геолокацией.",
    options: [
      {
        id: "a",
        text: "Выложить — это же удобно.",
        impact: { total: -1, categories: { Соцсети: -1 } },
        feedback: "Ты раскрываешь своё местоположение.",
      },
      {
        id: "b",
        text: "Выключить геолокацию.",
        impact: { total: +2, categories: { Соцсети: +2 } },
        feedback: "Безопасный вариант.",
      },
      {
        id: "c",
        text: "Ограничить доступ к сторис.",
        impact: { total: +1, categories: { Соцсети: +1 } },
        feedback: "Частично снижает риск.",
      },
    ],
    bestOptionId: "b",
    tip: "Геолокация — это личная информация.",
  },

  // ---------- ДОП ----------
  {
    id: "updates",
    category: "Wi-Fi",
    difficulty: 1,
    title: "Обновление системы",
    scenario:
      "Телефон предлагает обновление.",
    options: [
      {
        id: "a",
        text: "Отложить навсегда.",
        impact: { total: -2, categories: { "Wi-Fi": -1 } },
        feedback: "Обновления закрывают уязвимости.",
      },
      {
        id: "b",
        text: "Установить при Wi-Fi и зарядке.",
        impact: { total: +2, categories: { "Wi-Fi": +1 } },
        feedback: "Правильный выбор.",
      },
      {
        id: "c",
        text: "Скачать с неофициального сайта.",
        impact: { total: -2, categories: { "Wi-Fi": -2 } },
        feedback: "Риск вредоносного ПО.",
      },
    ],
    bestOptionId: "b",
    tip: "Обновления = безопасность.",
  },

  {
    id: "app-perms",
    category: "Соцсети",
    difficulty: 2,
    title: "Разрешения приложения",
    scenario:
      "Игра просит доступ к контактам и микрофону.",
    options: [
      {
        id: "a",
        text: "Разрешить всё.",
        impact: { total: -2, categories: { Соцсети: -2 } },
        feedback: "Лишние разрешения — лишний риск.",
      },
      {
        id: "b",
        text: "Отказать и проверить, работает ли игра.",
        impact: { total: +2, categories: { Соцсети: +2 } },
        feedback: "Принцип минимальных прав.",
      },
      {
        id: "c",
        text: "Разрешить и забыть.",
        impact: { total: -1, categories: { Соцсети: -1 } },
        feedback: "Разрешения нужно контролировать.",
      },
    ],
    bestOptionId: "b",
    tip: "Давай приложению только нужные доступы.",
  },
];
