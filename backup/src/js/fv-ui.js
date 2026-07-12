/* ============================================================
   FV-UI — Interactive Components (JS)
   Lightweight, zero-dependency
   ============================================================ */

const FV = (() => {
  'use strict';

  // ---- Theme ----
  function setTheme(theme) {
    document.documentElement.setAttribute('data-fv-theme', theme);
    localStorage.setItem('fv-theme', theme);
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-fv-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }
  function initTheme() {
    const saved = localStorage.getItem('fv-theme');
    if (saved) setTheme(saved);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  }

  // ---- Modal ----
  function modal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return { open() {}, close() {} };
    const open = () => overlay.classList.add('active');
    const close = () => overlay.classList.remove('active');
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelectorAll('[data-fv-close]').forEach((el) => el.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    return { open, close };
  }

  // ---- Dropdown ----
  function dropdown(el) {
    const menu = el.querySelector('.fv-dropdown__menu');
    if (!menu) return { open() {}, close() {} };
    const open = () => { closeAll(); el.classList.add('open'); };
    const close = () => el.classList.remove('open');
    el.querySelector('.fv-dropdown__trigger')?.addEventListener('click', (e) => {
      e.stopPropagation();
      el.classList.contains('open') ? close() : open();
    });
    return { open, close };
  }
  function closeAll() {
    document.querySelectorAll('.fv-dropdown.open').forEach((d) => d.classList.remove('open'));
  }
  document.addEventListener('click', closeAll);

  // ---- Toast ----
  function toast(message, type = 'accent', duration = 3000) {
    const el = document.createElement('div');
    el.className = `fv-toast fv-toast--${type}`;
    el.textContent = message;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  // ---- Tabs ----
  function tabs(container) {
    const tabBtns = container.querySelectorAll('.fv-tab');
    const panels = container.querySelectorAll('.fv-tab-panel');
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-fv-tab');
        tabBtns.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector(`[data-fv-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // ---- Auto-init ----
  function init() {
    initTheme();
    document.querySelectorAll('.fv-dropdown').forEach(dropdown);
    document.querySelectorAll('.fv-tabs').forEach(tabs);
    document.querySelectorAll('[data-fv-toggle-theme]').forEach((el) => {
      el.addEventListener('click', toggleTheme);
    });
    document.querySelectorAll('[data-fv-modal]').forEach((el) => {
      const m = modal(el.getAttribute('data-fv-modal'));
      el.addEventListener('click', m.open);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { setTheme, toggleTheme, modal, dropdown, toast, tabs, init };
})();

if (typeof window !== 'undefined') window.FV = FV;
