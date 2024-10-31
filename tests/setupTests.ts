import '@testing-library/jest-dom';

declare const global: any;

// Мок для глобальной функции fetch
global.fetch = jest.fn();

// Мок для window.matchMedia с полной реализацией для тестов
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // устаревший метод
  removeListener: jest.fn(), // устаревший метод
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));
