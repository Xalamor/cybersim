import { CATEGORIES } from "../data/situations.js";

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function emptyCategoryScore() {
  const obj = {};
  for (const c of CATEGORIES) obj[c] = 0;
  return obj;
}

// Преобразуем total в % “безопасности”
// Простая логика: стартуем с 50, плюсы ведут вверх, минусы вниз, ограничиваем 0..100
export function safetyPctFromTotal(total) {
  return clamp(50 + total * 10, 0, 100);
}

export function safetyLabel(pct) {
  if (pct >= 75) return { label: "Высокий", severity: "success" };
  if (pct >= 45) return { label: "Средний", severity: "warning" };
  return { label: "Низкий", severity: "error" };
}

export const STORAGE_KEY = "cybersim_best";

export function readBest() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeBest(best) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(best));
  } catch {}
}
