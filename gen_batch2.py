#!/usr/bin/env python3
"""Generate 25 component demo sections for index.html"""
import os

out_path = r"D:\finversion\temp-sections-batch2.html"

def section(sid, icon, name, desc, preview, code):
    return f'''<section class="docs-section" id="{sid}">
  <div class="docs-section__head"><h2><i class="bi bi-{icon}"></i> {name}</h2><span>{desc}</span></div>
  <div class="component-block">
    <div class="component-block__head"><h3>Default</h3><button class="view-code-btn" onclick="toggleCode(this)"><i class="bi bi-code-slash"></i> Kode</button></div>
    <div class="component-block__preview">
      {preview}
    </div>
    <div class="component-block__code"><div class="code-panel">
      <div class="code-panel__header"><div class="code-panel__tabs"><button class="code-tab active" onclick="switchTab(this,'html')"><i class="bi bi-filetype-html"></i> HTML</button></div><button class="code-copy-btn" onclick="copyCodeBlock(this)"><i class="bi bi-clipboard"></i> Copy</button></div>
      <pre class="code-block" data-lang="html">{code}</pre>
    </div></div>
  </div>
</section>'''

def enc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

sections = []

# 1. sec-navbar
sections.append(section("sec-navbar", "menu-app", "Navbar", "Navbar responsive dengan logo",
    '<nav class="fv-navbar" style="background:#1e293b;padding:0.75rem 1.5rem;border-radius:8px;">\n        <div style="display:flex;align-items:center;justify-content:space-between;max-width:1200px;margin:0 auto;">\n          <a href="#" style="display:flex;align-items:center;gap:0.5rem;color:#fff;text-decoration:none;font-weight:700;font-size:1.15rem;">\n            <i class="bi bi-hexagon-fill" style="color:#6366f1;"></i> FinVersion\n          </a>\n          <div style="display:flex;align-items:center;gap:1.5rem;" class="fv-navbar__links">\n            <a href="#" style="color:#cbd5e1;text-decoration:none;font-size:0.9rem;">Beranda</a>\n            <a href="#" style="color:#fff;text-decoration:none;font-size:0.9rem;">Komponen</a>\n            <a href="#" style="color:#cbd5e1;text-decoration:none;font-size:0.9rem;">Dokumentasi</a>\n            <a href="#" style="color:#cbd5e1;text-decoration:none;font-size:0.9rem;">Blog</a>\n          </div>\n          <button style="background:#6366f1;color:#fff;border:none;padding:0.45rem 1rem;border-radius:6px;font-size:0.85rem;cursor:pointer;">Masuk</button>\n        </div>\n      </nav>',
    enc('''<nav class="fv-navbar" style="background:#1e293b;padding:0.75rem 1.5rem;border-radius:8px;">
  <div style="display:flex;align-items:center;justify-content:space-between;max-width:1200px;margin:0 auto;">
    <a href="#" style="display:flex;align-items:center;gap:0.5rem;color:#fff;text-decoration:none;font-weight:700;font-size:1.15rem;">
      <i class="bi bi-hexagon-fill" style="color:#6366f1;"></i> FinVersion
    </a>
    <div style="display:flex;align-items:center;gap:1.5rem;" class="fv-navbar__links">
      <a href="#" style="color:#cbd5e1;text-decoration:none;font-size:0.9rem;">Beranda</a>
      <a href="#" style="color:#fff;text-decoration:none;font-size:0.9rem;">Komponen</a>
      <a href="#" style="color:#cbd5e1;text-decoration:none;font-size:0.9rem;">Dokumentasi</a>
      <a href="#" style="color:#cbd5e1;text-decoration:none;font-size:0.9rem;">Blog</a>
    </div>
    <button style="background:#6366f1;color:#fff;border:none;padding:0.45rem 1rem;border-radius:6px;font-size:0.85rem;cursor:pointer;">Masuk</button>
  </div>
</nav>''')))

# 2. sec-topbar
sections.append(section("sec-topbar", "window-top", "Top Bar", "Top bar dengan breadcrumbs",
    '<div class="fv-topbar" style="background:#f8fafc;border:1px solid #e2e8f0;padding:0.5rem 1.25rem;border-radius:8px;display:flex;align-items:center;justify-content:space-between;">\n        <nav style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;color:#64748b;">\n          <a href="#" style="color:#6366f1;text-decoration:none;">Beranda</a>\n          <i class="bi bi-chevron-right" style="font-size:0.65rem;"></i>\n          <a href="#" style="color:#6366f1;text-decoration:none;">Komponen</a>\n          <i class="bi bi-chevron-right" style="font-size:0.65rem;"></i>\n          <span style="color:#1e293b;font-weight:500;">Navigation</span>\n        </nav>\n        <div style="display:flex;align-items:center;gap:0.75rem;">\n          <button style="background:none;border:1px solid #e2e8f0;border-radius:6px;padding:0.3rem 0.6rem;cursor:pointer;color:#64748b;font-size:0.8rem;"><i class="bi bi-question-circle"></i></button>\n          <div style="width:28px;height:28px;background:#6366f1;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.75rem;font-weight:600;">A</div>\n        </div>\n      </div>',
    enc('''<div class="fv-topbar" style="background:#f8fafc;border:1px solid #e2e8f0;padding:0.5rem 1.25rem;border-radius:8px;display:flex;align-items:center;justify-content:space-between;">
  <nav style="display:flex;align-items:center;gap:0.4rem;font-size:0.82rem;color:#64748b;">
    <a href="#" style="color:#6366f1;text-decoration:none;">Beranda</a>
    <i class="bi bi-chevron-right" style="font-size:0.65rem;"></i>
    <a href="#" style="color:#6366f1;text-decoration:none;">Komponen</a>
    <i class="bi bi-chevron-right" style="font-size:0.65rem;"></i>
    <span style="color:#1e293b;font-weight:500;">Navigation</span>
  </nav>
  <div style="display:flex;align-items:center;gap:0.75rem;">
    <button style="background:none;border:1px solid #e2e8f0;border-radius:6px;padding:0.3rem 0.6rem;cursor:pointer;color:#64748b;font-size:0.8rem;"><i class="bi bi-question-circle"></i></button>
    <div style="width:28px;height:28px;background:#6366f1;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.75rem;font-weight:600;">A</div>
  </div>
</div>''')))

# 3. sec-bottom-nav
sections.append(section("sec-bottom-nav", "phone", "Bottom Navigation", "Bottom navigation mobile",
    '<div style="max-width:375px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#fff;">\n        <div style="height:200px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">Konten halaman</div>\n        <nav class="fv-bottom-nav" style="display:flex;align-items:center;justify-content:space-around;background:#fff;border-top:1px solid #e2e8f0;padding:0.5rem 0 0.35rem;">\n          <a href="#" style="display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;color:#6366f1;font-size:0.65rem;"><i class="bi bi-house-door-fill" style="font-size:1.1rem;"></i> Beranda</a>\n          <a href="#" style="display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;color:#94a3b8;font-size:0.65rem;"><i class="bi bi-search" style="font-size:1.1rem;"></i> Cari</a>\n          <a href="#" style="display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;color:#94a3b8;font-size:0.65rem;"><i class="bi bi-plus-circle" style="font-size:1.1rem;"></i> Buat</a>\n          <a href="#" style="display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;color:#94a3b8;font-size:0.65rem;"><i class="bi bi-bell" style="font-size:1.1rem;"></i> Notif</a>\n          <a href="#" style="display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;color:#94a3b8;font-size:0.65rem;"><i class="bi bi-person" style="font-size:1.1rem;"></i> Profil</a>\n        </nav>\n      </div>',
    enc('''<nav class="fv-bottom-nav" style="display:flex;align-items:center;justify-content:space-around;background:#fff;border-top:1px solid #e2e8f0;padding:0.5rem 0 0.35rem;">
  <a href="#" style="display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;color:#6366f1;font-size:0.65rem;">
    <i class="bi bi-house-door-fill" style="font-size:1.1rem;"></i> Beranda
  </a>
  <a href="#" style="display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;color:#94a3b8;font-size:0.65rem;">
    <i class="bi bi-search" style="font-size:1.1rem;"></i> Cari
  </a>
  <a href="#" style="display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;color:#94a3b8;font-size:0.65rem;">
    <i class="bi bi-plus-circle" style="font-size:1.1rem;"></i> Buat
  </a>
  <a href="#" style="display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;color:#94a3b8;font-size:0.65rem;">
    <i class="bi bi-bell" style="font-size:1.1rem;"></i> Notif
  </a>
  <a href="#" style="display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;color:#94a3b8;font-size:0.65rem;">
    <i class="bi bi-person" style="font-size:1.1rem;"></i> Profil
  </a>
</nav>''')))

# 4. sec-mega-menu
mega_preview = '''<div class="fv-mega-menu" style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:1.5rem;max-width:720px;">
        <h4 style="margin:0 0 1rem;font-size:0.9rem;color:#64748b;font-weight:500;">Produk &amp; Layanan</h4>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
          <a href="#" style="padding:0.75rem;border-radius:8px;text-decoration:none;display:flex;gap:0.6rem;align-items:flex-start;"><i class="bi bi-speedometer2" style="font-size:1.25rem;color:#6366f1;margin-top:2px;"></i><div><div style="font-weight:600;color:#1e293b;font-size:0.85rem;">Dashboard</div><div style="color:#94a3b8;font-size:0.75rem;">Analitik &amp; laporan real-time</div></div></a>
          <a href="#" style="padding:0.75rem;border-radius:8px;text-decoration:none;display:flex;gap:0.6rem;align-items:flex-start;"><i class="bi bi-wallet2" style="font-size:1.25rem;color:#6366f1;margin-top:2px;"></i><div><div style="font-weight:600;color:#1e293b;font-size:0.85rem;">Keuangan</div><div style="color:#94a3b8;font-size:0.75rem;">Kelola transaksi &amp; laporan</div></div></a>
          <a href="#" style="padding:0.75rem;border-radius:8px;text-decoration:none;display:flex;gap:0.6rem;align-items:flex-start;"><i class="bi bi-people" style="font-size:1.25rem;color:#6366f1;margin-top:2px;"></i><div><div style="font-weight:600;color:#1e293b;font-size:0.85rem;">CRM</div><div style="color:#94a3b8;font-size:0.75rem;">Manajemen pelanggan</div></div></a>
          <a href="#" style="padding:0.75rem;border-radius:8px;text-decoration:none;display:flex;gap:0.6rem;align-items:flex-start;"><i class="bi bi-box-seam" style="font-size:1.25rem;color:#6366f1;margin-top:2px;"></i><div><div style="font-weight:600;color:#1e293b;font-size:0.85rem;">Inventori</div><div style="color:#94a3b8;font-size:0.75rem;">Stok &amp; gudang</div></div></a>
          <a href="#" style="padding:0.75rem;border-radius:8px;text-decoration:none;display:flex;gap:0.6rem;align-items:flex-start;"><i class="bi bi-file-earmark-bar-graph" style="font-size:1.25rem;color:#6366f1;margin-top:2px;"></i><div><div style="font-weight:600;color:#1e293b;font-size:0.85rem;">Laporan</div><div style="color:#94a3b8;font-size:0.75rem;">Export &amp; visualisasi data</div></div></a>
          <a href="#" style="padding:0.75rem;border-radius:8px;text-decoration:none;display:flex;gap:0.6rem;align-items:flex-start;"><i class="bi bi-gear" style="font-size:1.25rem;color:#6366f1;margin-top:2px;"></i><div><div style="font-weight:600;color:#1e293b;font-size:0.85rem;">Pengaturan</div><div style="color:#94a3b8;font-size:0.75rem;">Konfigurasi sistem</div></div></a>
        </div>
      </div>'''
sections.append(section("sec-mega-menu", "grid", "Mega Menu", "Mega menu dropdown", mega_preview, enc(mega_preview)))

# 5. sec-command-menu
cmd_preview = '''<div class="fv-command-menu" style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.12);overflow:hidden;">
        <div style="display:flex;align-items:center;padding:0.75rem 1rem;border-bottom:1px solid #f1f5f9;gap:0.5rem;">
          <i class="bi bi-search" style="color:#94a3b8;"></i>
          <input type="text" placeholder="Ketik perintah atau cari..." style="border:none;outline:none;font-size:0.9rem;flex:1;color:#1e293b;" value="dashboard">
          <kbd style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:4px;padding:0.1rem 0.4rem;font-size:0.7rem;color:#64748b;">ESC</kbd>
        </div>
        <div style="padding:0.5rem;">
          <div style="padding:0.4rem 0.6rem;font-size:0.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Saran</div>
          <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.5rem 0.6rem;border-radius:6px;text-decoration:none;background:#eff6ff;"><i class="bi bi-speedometer2" style="color:#6366f1;"></i><span style="flex:1;font-size:0.85rem;color:#1e293b;">Buka Dashboard</span><kbd style="background:#fff;border:1px solid #e2e8f0;border-radius:4px;padding:0.1rem 0.35rem;font-size:0.65rem;color:#94a3b8;">Ctrl+D</kbd></a>
          <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.5rem 0.6rem;border-radius:6px;text-decoration:none;"><i class="bi bi-file-earmark-text" style="color:#6366f1;"></i><span style="flex:1;font-size:0.85rem;color:#1e293b;">Buka Laporan</span><kbd style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:4px;padding:0.1rem 0.35rem;font-size:0.65rem;color:#94a3b8;">Ctrl+R</kbd></a>
          <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.5rem 0.6rem;border-radius:6px;text-decoration:none;"><i class="bi bi-gear" style="color:#6366f1;"></i><span style="flex:1;font-size:0.85rem;color:#1e293b;">Pengaturan</span><kbd style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:4px;padding:0.1rem 0.35rem;font-size:0.65rem;color:#94a3b8;">Ctrl+,</kbd></a>
        </div>
        <div style="border-top:1px solid #f1f5f9;padding:0.5rem 1rem;display:flex;align-items:center;gap:0.5rem;">
          <span style="font-size:0.7rem;color:#94a3b8;"><kbd style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:3px;padding:0.05rem 0.3rem;">&#8593;</kbd> <kbd style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:3px;padding:0.05rem 0.3rem;">&#8595;</kbd> navigasi</span>
          <span style="font-size:0.7rem;color:#94a3b8;margin-left:auto;"><kbd style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:3px;padding:0.05rem 0.3rem;">&#9166;</kbd> pilih</span>
        </div>
      </div>'''
sections.append(section("sec-command-menu", "terminal", "Command Menu", "Command menu search", cmd_preview, enc(cmd_preview)))

# 6. sec-image
sections.append(section("sec-image", "image", "Image", "Image dengan lazy load",
    '<div class="fv-image" style="position:relative;max-width:480px;border-radius:10px;overflow:hidden;background:#f1f5f9;">\n        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=350&fit=crop" alt="Landscape" loading="lazy" style="width:100%;height:auto;display:block;object-fit:cover;max-height:280px;">\n        <div style="position:absolute;bottom:0;left:0;right:0;padding:0.75rem 1rem;background:linear-gradient(transparent,rgba(0,0,0,0.6));">\n          <span style="color:#fff;font-size:0.8rem;">Pemandangan alam</span>\n        </div>\n      </div>',
    enc('<div class="fv-image" style="position:relative;max-width:480px;border-radius:10px;overflow:hidden;background:#f1f5f9;">\n  <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=350&fit=crop" alt="Landscape" loading="lazy" style="width:100%;height:auto;display:block;object-fit:cover;max-height:280px;">\n  <div style="position:absolute;bottom:0;left:0;right:0;padding:0.75rem 1rem;background:linear-gradient(transparent,rgba(0,0,0,0.6));">\n    <span style="color:#fff;font-size:0.8rem;">Pemandangan alam</span>\n  </div>\n</div>')))

# 7. sec-gallery
gallery_preview = '''<div class="fv-gallery" style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;max-width:480px;">
        <div style="border-radius:8px;overflow:hidden;background:#e2e8f0;aspect-ratio:1;"><img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop" alt="" style="width:100%;height:100%;object-fit:cover;"></div>
        <div style="border-radius:8px;overflow:hidden;background:#e2e8f0;aspect-ratio:1;"><img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop" alt="" style="width:100%;height:100%;object-fit:cover;"></div>
        <div style="border-radius:8px;overflow:hidden;background:#e2e8f0;aspect-ratio:1;"><img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop" alt="" style="width:100%;height:100%;object-fit:cover;"></div>
        <div style="border-radius:8px;overflow:hidden;background:#e2e8f0;aspect-ratio:1;"><img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=200&h=200&fit=crop" alt="" style="width:100%;height:100%;object-fit:cover;"></div>
        <div style="border-radius:8px;overflow:hidden;background:#e2e8f0;aspect-ratio:1;position:relative;"><img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop" alt="" style="width:100%;height:100%;object-fit:cover;"><div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1rem;font-weight:600;">+3</div></div>
      </div>'''
sections.append(section("sec-gallery", "images", "Gallery", "Gallery grid layout", gallery_preview, enc(gallery_preview)))

# 8. sec-video-player
sections.append(section("sec-video-player", "play-circle", "Video Player", "Video player komponen",
    '<div class="fv-video-player" style="max-width:480px;background:#000;border-radius:10px;overflow:hidden;position:relative;">\n        <video poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=340&fit=crop" style="width:100%;display:block;aspect-ratio:16/9;object-fit:cover;" preload="metadata"><source src="#" type="video/mp4"></video>\n        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;"><button style="width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;"><i class="bi bi-play-fill" style="font-size:1.5rem;color:#1e293b;margin-left:3px;"></i></button></div>\n        <div style="position:absolute;bottom:0;left:0;right:0;padding:0.5rem 0.75rem;background:linear-gradient(transparent,rgba(0,0,0,0.7));">\n          <div style="height:3px;background:rgba(255,255,255,0.3);border-radius:2px;margin-bottom:0.4rem;"><div style="width:35%;height:100%;background:#6366f1;border-radius:2px;"></div></div>\n          <div style="display:flex;align-items:center;justify-content:space-between;"><div style="display:flex;align-items:center;gap:0.5rem;"><button style="background:none;border:none;color:#fff;cursor:pointer;font-size:0.8rem;"><i class="bi bi-play-fill"></i></button><span style="color:#fff;font-size:0.7rem;">1:23 / 3:45</span></div><div style="display:flex;align-items:center;gap:0.4rem;"><button style="background:none;border:none;color:#fff;cursor:pointer;font-size:0.75rem;"><i class="bi bi-volume-up"></i></button><button style="background:none;border:none;color:#fff;cursor:pointer;font-size:0.75rem;"><i class="bi bi-fullscreen"></i></button></div></div>\n        </div>\n      </div>',
    enc('<div class="fv-video-player" style="max-width:480px;background:#000;border-radius:10px;overflow:hidden;position:relative;">\n  <video poster="..." style="width:100%;display:block;aspect-ratio:16/9;object-fit:cover;" preload="metadata">\n    <source src="#" type="video/mp4">\n  </video>\n  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">\n    <button style="width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.9);border:none;cursor:pointer;">\n      <i class="bi bi-play-fill" style="font-size:1.5rem;color:#1e293b;margin-left:3px;"></i>\n    </button>\n  </div>\n  <div style="position:absolute;bottom:0;left:0;right:0;padding:0.5rem 0.75rem;background:linear-gradient(transparent,rgba(0,0,0,0.7));">\n    <div style="height:3px;background:rgba(255,255,255,0.3);border-radius:2px;margin-bottom:0.4rem;">\n      <div style="width:35%;height:100%;background:#6366f1;border-radius:2px;"></div>\n    </div>\n    <div style="display:flex;align-items:center;justify-content:space-between;">\n      <div style="display:flex;align-items:center;gap:0.5rem;">\n        <button style="background:none;border:none;color:#fff;font-size:0.8rem;"><i class="bi bi-play-fill"></i></button>\n        <span style="color:#fff;font-size:0.7rem;">1:23 / 3:45</span>\n      </div>\n      <div style="display:flex;align-items:center;gap:0.4rem;">\n        <button style="background:none;border:none;color:#fff;font-size:0.75rem;"><i class="bi bi-volume-up"></i></button>\n        <button style="background:none;border:none;color:#fff;font-size:0.75rem;"><i class="bi bi-fullscreen"></i></button>\n      </div>\n    </div>\n  </div>\n</div>')))

# 9. sec-audio-player
sections.append(section("sec-audio-player", "music-player", "Audio Player", "Audio player komponen",
    '<div class="fv-audio-player" style="max-width:420px;background:#1e293b;border-radius:12px;padding:1rem;display:flex;align-items:center;gap:0.75rem;">\n        <div style="width:48px;height:48px;border-radius:8px;background:#6366f1;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="bi bi-music-note-beamed" style="color:#fff;font-size:1.1rem;"></i></div>\n        <div style="flex:1;min-width:0;"><div style="color:#f8fafc;font-size:0.8rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Judul Lagu - Artis</div><div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.3rem;"><span style="color:#94a3b8;font-size:0.65rem;">1:23</span><div style="flex:1;height:3px;background:#334155;border-radius:2px;"><div style="width:45%;height:100%;background:#6366f1;border-radius:2px;"></div></div><span style="color:#94a3b8;font-size:0.65rem;">3:45</span></div></div>\n        <div style="display:flex;align-items:center;gap:0.4rem;flex-shrink:0;"><button style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:0.9rem;"><i class="bi bi-skip-start-fill"></i></button><button style="width:34px;height:34px;border-radius:50%;background:#6366f1;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;"><i class="bi bi-play-fill"></i></button><button style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:0.9rem;"><i class="bi bi-skip-end-fill"></i></button></div>\n      </div>',
    enc('<div class="fv-audio-player" style="max-width:420px;background:#1e293b;border-radius:12px;padding:1rem;display:flex;align-items:center;gap:0.75rem;">\n  <div style="width:48px;height:48px;border-radius:8px;background:#6366f1;display:flex;align-items:center;justify-content:center;flex-shrink:0;">\n    <i class="bi bi-music-note-beamed" style="color:#fff;font-size:1.1rem;"></i>\n  </div>\n  <div style="flex:1;min-width:0;">\n    <div style="color:#f8fafc;font-size:0.8rem;font-weight:600;">Judul Lagu - Artis</div>\n    <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.3rem;">\n      <span style="color:#94a3b8;font-size:0.65rem;">1:23</span>\n      <div style="flex:1;height:3px;background:#334155;border-radius:2px;">\n        <div style="width:45%;height:100%;background:#6366f1;border-radius:2px;"></div>\n      </div>\n      <span style="color:#94a3b8;font-size:0.65rem;">3:45</span>\n    </div>\n  </div>\n  <div style="display:flex;align-items:center;gap:0.4rem;flex-shrink:0;">\n    <button style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:0.9rem;"><i class="bi bi-skip-start-fill"></i></button>\n    <button style="width:34px;height:34px;border-radius:50%;background:#6366f1;border:none;color:#fff;cursor:pointer;"><i class="bi bi-play-fill"></i></button>\n    <button style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:0.9rem;"><i class="bi bi-skip-end-fill"></i></button>\n  </div>\n</div>')))

# 10. sec-file-preview
fp_preview = '''<div class="fv-file-preview" style="display:flex;gap:0.75rem;flex-wrap:wrap;">
        <div style="width:140px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#fff;"><div style="height:80px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;"><i class="bi bi-filetype-pdf" style="font-size:2rem;color:#ef4444;"></i></div><div style="padding:0.5rem 0.6rem;"><div style="font-size:0.75rem;font-weight:600;color:#1e293b;">Laporan.pdf</div><div style="font-size:0.65rem;color:#94a3b8;">2.4 MB</div></div></div>
        <div style="width:140px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#fff;"><div style="height:80px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;"><i class="bi bi-filetype-xlsx" style="font-size:2rem;color:#22c55e;"></i></div><div style="padding:0.5rem 0.6rem;"><div style="font-size:0.75rem;font-weight:600;color:#1e293b;">Data.xlsx</div><div style="font-size:0.65rem;color:#94a3b8;">856 KB</div></div></div>
        <div style="width:140px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#fff;"><div style="height:80px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;"><i class="bi bi-filetype-pptx" style="font-size:2rem;color:#f59e0b;"></i></div><div style="padding:0.5rem 0.6rem;"><div style="font-size:0.75rem;font-weight:600;color:#1e293b;">Presentasi.pptx</div><div style="font-size:0.65rem;color:#94a3b8;">5.1 MB</div></div></div>
      </div>'''
sections.append(section("sec-file-preview", "file-earmark", "File Preview", "File preview card", fp_preview, enc(fp_preview)))

# 11. sec-pdf-viewer
pdf_preview = '''<div class="fv-pdf-viewer" style="max-width:480px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#f8fafc;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0.75rem;background:#fff;border-bottom:1px solid #e2e8f0;"><div style="display:flex;align-items:center;gap:0.5rem;"><i class="bi bi-file-earmark-pdf" style="color:#ef4444;"></i><span style="font-size:0.8rem;font-weight:500;color:#1e293b;">Dokumen.pdf</span><span style="font-size:0.7rem;color:#94a3b8;">(24 halaman)</span></div><div style="display:flex;align-items:center;gap:0.4rem;"><button style="background:none;border:1px solid #e2e8f0;border-radius:5px;padding:0.2rem 0.4rem;cursor:pointer;color:#64748b;font-size:0.75rem;"><i class="bi bi-zoom-in"></i></button><button style="background:none;border:1px solid #e2e8f0;border-radius:5px;padding:0.2rem 0.4rem;cursor:pointer;color:#64748b;font-size:0.75rem;"><i class="bi bi-zoom-out"></i></button><button style="background:none;border:1px solid #e2e8f0;border-radius:5px;padding:0.2rem 0.4rem;cursor:pointer;color:#64748b;font-size:0.75rem;"><i class="bi bi-download"></i></button></div></div>
        <div style="height:260px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;"><div style="text-align:center;"><i class="bi bi-file-earmark-pdf" style="font-size:3rem;color:#cbd5e1;"></i><p style="margin:0.5rem 0 0;">PDF Preview Area</p></div></div>
        <div style="display:flex;align-items:center;justify-content:center;gap:0.75rem;padding:0.4rem;background:#fff;border-top:1px solid #e2e8f0;"><button style="background:none;border:none;cursor:pointer;color:#64748b;"><i class="bi bi-chevron-left"></i></button><span style="font-size:0.75rem;color:#64748b;">Halaman 1 dari 24</span><button style="background:none;border:none;cursor:pointer;color:#64748b;"><i class="bi bi-chevron-right"></i></button></div>
      </div>'''
sections.append(section("sec-pdf-viewer", "file-earmark-pdf", "PDF Viewer", "PDF viewer embed", pdf_preview, enc(pdf_preview)))

# 12. sec-snackbar
snack_preview = '''<div class="fv-snackbar" style="display:flex;flex-direction:column;gap:0.5rem;">
        <div style="display:flex;align-items:center;gap:0.6rem;background:#1e293b;color:#fff;padding:0.7rem 1rem;border-radius:8px;font-size:0.82rem;max-width:360px;"><i class="bi bi-check-circle-fill" style="color:#22c55e;"></i><span style="flex:1;">Data berhasil disimpan</span><button style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:0.75rem;"><i class="bi bi-x"></i></button></div>
        <div style="display:flex;align-items:center;gap:0.6rem;background:#fef2f2;color:#fff;padding:0.7rem 1rem;border-radius:8px;font-size:0.82rem;max-width:360px;"><i class="bi bi-exclamation-circle-fill" style="color:#fca5a5;"></i><span style="flex:1;">Gagal mengunggah file</span><button style="background:none;border:none;color:#fca5a5;cursor:pointer;font-size:0.75rem;"><i class="bi bi-x"></i></button></div>
        <div style="display:flex;align-items:center;gap:0.6rem;background:#1e40af;color:#fff;padding:0.7rem 1rem;border-radius:8px;font-size:0.82rem;max-width:360px;"><i class="bi bi-info-circle-fill" style="color:#93c5fd;"></i><span style="flex:1;">Versi baru tersedia</span><a href="#" style="color:#93c5fd;font-size:0.8rem;font-weight:500;text-decoration:none;">Update</a><button style="background:none;border:none;color:#93c5fd;cursor:pointer;font-size:0.75rem;"><i class="bi bi-x"></i></button></div>
      </div>'''
sections.append(section("sec-snackbar", "bell", "Snackbar", "Snackbar notifikasi", snack_preview, enc(snack_preview)))

# 13. sec-notification
notif_preview = '''<div class="fv-notification" style="max-width:380px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.6rem 0.85rem;border-bottom:1px solid #f1f5f9;"><span style="font-size:0.85rem;font-weight:600;color:#1e293b;">Notifikasi</span><button style="background:none;border:none;color:#6366f1;font-size:0.75rem;cursor:pointer;">Tandai semua dibaca</button></div>
        <div style="padding:0.15rem 0;">
          <div style="display:flex;gap:0.6rem;padding:0.6rem 0.85rem;background:#eff6ff;"><div style="width:32px;height:32px;border-radius:50%;background:#6366f1;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="bi bi-person-fill" style="color:#fff;font-size:0.8rem;"></i></div><div style="flex:1;min-width:0;"><div style="font-size:0.78rem;color:#1e293b;"><strong>Andi</strong> mengundang Anda ke proyek</div><div style="font-size:0.65rem;color:#94a3b8;margin-top:2px;">2 menit lalu</div></div><div style="width:8px;height:8px;border-radius:50%;background:#6366f1;flex-shrink:0;margin-top:5px;"></div></div>
          <div style="display:flex;gap:0.6rem;padding:0.6rem 0.85rem;"><div style="width:32px;height:32px;border-radius:50%;background:#f1f5f9;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="bi bi-check-circle" style="color:#22c55e;font-size:0.8rem;"></i></div><div style="flex:1;min-width:0;"><div style="font-size:0.78rem;color:#1e293b;">Invoice #1042 telah dibayar</div><div style="font-size:0.65rem;color:#94a3b8;margin-top:2px;">1 jam lalu</div></div></div>
          <div style="display:flex;gap:0.6rem;padding:0.6rem 0.85rem;"><div style="width:32px;height:32px;border-radius:50%;background:#fef3c7;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="bi bi-exclamation-triangle" style="color:#f59e0b;font-size:0.8rem;"></i></div><div style="flex:1;min-width:0;"><div style="font-size:0.78rem;color:#1e293b;">Stok produk X hampir habis</div><div style="font-size:0.65rem;color:#94a3b8;margin-top:2px;">3 jam lalu</div></div></div>
        </div>
      </div>'''
sections.append(section("sec-notification", "bell-fill", "Notification", "Notification card", notif_preview, enc(notif_preview)))

# 14. sec-circular-progress
cp_preview = '''<div class="fv-circular-progress" style="display:flex;gap:2rem;align-items:center;justify-content:center;flex-wrap:wrap;">
        <div style="position:relative;width:64px;height:64px;"><svg width="64" height="64" viewBox="0 0 64 64" style="transform:rotate(-90deg);"><circle cx="32" cy="32" r="28" stroke="#e2e8f0" stroke-width="5" fill="none"/><circle cx="32" cy="32" r="28" stroke="#6366f1" stroke-width="5" fill="none" stroke-dasharray="175.93" stroke-dashoffset="52.78" stroke-linecap="round"/></svg><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:600;color:#1e293b;">70%</div></div>
        <div style="position:relative;width:64px;height:64px;"><svg width="64" height="64" viewBox="0 0 64 64" style="transform:rotate(-90deg);"><circle cx="32" cy="32" r="28" stroke="#e2e8f0" stroke-width="5" fill="none"/><circle cx="32" cy="32" r="28" stroke="#22c55e" stroke-width="5" fill="none" stroke-dasharray="175.93" stroke-dashoffset="0" stroke-linecap="round"/></svg><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:600;color:#22c55e;">100%</div></div>
        <div style="position:relative;width:64px;height:64px;"><svg width="64" height="64" viewBox="0 0 64 64" style="transform:rotate(-90deg);animation:spin 1.5s linear infinite;"><circle cx="32" cy="32" r="28" stroke="#e2e8f0" stroke-width="5" fill="none"/><circle cx="32" cy="32" r="28" stroke="#6366f1" stroke-width="5" fill="none" stroke-dasharray="44 132" stroke-linecap="round"/></svg></div>
      </div>'''
sections.append(section("sec-circular-progress", "arrow-repeat", "Circular Progress", "Circular progress indicator", cp_preview, enc(cp_preview)))

# 15. sec-loading-overlay
lo_preview = '''<div class="fv-loading-overlay" style="position:relative;width:100%;max-width:400px;height:180px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#f8fafc;">
        <div style="padding:1rem;color:#94a3b8;font-size:0.8rem;">Konten halaman di belakang overlay</div>
        <div style="position:absolute;inset:0;background:rgba(255,255,255,0.8);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.6rem;"><div style="width:36px;height:36px;border:3px solid #e2e8f0;border-top-color:#6366f1;border-radius:50%;animation:spin 0.8s linear infinite;"></div><span style="font-size:0.8rem;color:#64748b;">Memuat data...</span></div>
      </div>'''
sections.append(section("sec-loading-overlay", "hourglass", "Loading Overlay", "Loading overlay", lo_preview, enc(lo_preview)))

# 16. sec-result
result_preview = '''<div class="fv-result" style="text-align:center;padding:2rem 1rem;max-width:360px;margin:0 auto;">
        <div style="width:64px;height:64px;border-radius:50%;background:#f0fdf4;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;"><i class="bi bi-check-circle-fill" style="font-size:2rem;color:#22c55e;"></i></div>
        <h3 style="margin:0 0 0.4rem;font-size:1.1rem;color:#1e293b;">Pembayaran Berhasil</h3>
        <p style="margin:0 0 1rem;font-size:0.82rem;color:#64748b;line-height:1.5;">Transaksi Anda telah diproses. Bukti pembayaran telah dikirim ke email Anda.</p>
        <div style="display:flex;gap:0.5rem;justify-content:center;"><button style="background:#6366f1;color:#fff;border:none;padding:0.5rem 1.2rem;border-radius:8px;font-size:0.82rem;cursor:pointer;">Lihat Detail</button><button style="background:#fff;color:#6366f1;border:1px solid #e2e8f0;padding:0.5rem 1.2rem;border-radius:8px;font-size:0.82rem;cursor:pointer;">Kembali</button></div>
      </div>'''
sections.append(section("sec-result", "check-circle", "Result", "Result status page", result_preview, enc(result_preview)))

# 17. sec-status-badge
sb_preview = '''<div class="fv-status-badge" style="display:flex;gap:0.6rem;flex-wrap:wrap;align-items:center;">
        <span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.25rem 0.65rem;border-radius:999px;font-size:0.75rem;font-weight:500;background:#f0fdf4;color:#16a34a;"><span style="width:7px;height:7px;border-radius:50%;background:#22c55e;"></span> Online</span>
        <span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.25rem 0.65rem;border-radius:999px;font-size:0.75rem;font-weight:500;background:#fef2f2;color:#dc2626;"><span style="width:7px;height:7px;border-radius:50%;background:#ef4444;"></span> Offline</span>
        <span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.25rem 0.65rem;border-radius:999px;font-size:0.75rem;font-weight:500;background:#fefce8;color:#ca8a04;"><span style="width:7px;height:7px;border-radius:50%;background:#eab308;"></span> Sibuk</span>
        <span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.25rem 0.65rem;border-radius:999px;font-size:0.75rem;font-weight:500;background:#f0f9ff;color:#0284c7;"><span style="width:7px;height:7px;border-radius:50%;background:#0ea5e9;"></span> Away</span>
        <span style="display:inline-flex;align-items:center;gap:0.35rem;padding:0.25rem 0.65rem;border-radius:999px;font-size:0.75rem;font-weight:500;background:#f5f3ff;color:#7c3aed;"><span style="width:7px;height:7px;border-radius:50%;background:#8b5cf6;"></span> In Meeting</span>
      </div>'''
sections.append(section("sec-status-badge", "record2", "Status Badge", "Status badge indicator", sb_preview, enc(sb_preview)))

# 18. sec-error-boundary
eb_preview = '''<div class="fv-error-boundary" style="max-width:400px;background:#fff;border:1px solid #fecaca;border-radius:10px;padding:1.5rem;text-align:center;">
        <div style="width:48px;height:48px;border-radius:50%;background:#fef2f2;display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;"><i class="bi bi-exclamation-triangle-fill" style="font-size:1.25rem;color:#ef4444;"></i></div>
        <h3 style="margin:0 0 0.4rem;font-size:1rem;color:#1e293b;">Terjadi Kesalahan</h3>
        <p style="margin:0 0 1rem;font-size:0.8rem;color:#64748b;line-height:1.5;">Komponen mengalami error yang tidak terduga. Silakan coba muat ulang halaman.</p>
        <div style="display:flex;gap:0.5rem;justify-content:center;"><button style="background:#ef4444;color:#fff;border:none;padding:0.45rem 1rem;border-radius:6px;font-size:0.8rem;cursor:pointer;"><i class="bi bi-arrow-clockwise"></i> Muat Ulang</button><button style="background:#fff;color:#64748b;border:1px solid #e2e8f0;padding:0.45rem 1rem;border-radius:6px;font-size:0.8rem;cursor:pointer;">Laporkan</button></div>
      </div>'''
sections.append(section("sec-error-boundary", "exclamation-triangle", "Error Boundary", "Error boundary fallback", eb_preview, enc(eb_preview)))

# 19. sec-offline-indicator
oi_preview = '''<div class="fv-offline-indicator" style="display:flex;flex-direction:column;gap:0.75rem;max-width:420px;">
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:0.6rem 1rem;display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;color:#991b1b;"><i class="bi bi-wifi-off"></i><span style="flex:1;">Anda sedang offline. Beberapa fitur mungkin tidak tersedia.</span><button style="background:#dc2626;color:#fff;border:none;padding:0.2rem 0.6rem;border-radius:5px;font-size:0.72rem;cursor:pointer;">Coba Lagi</button></div>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:0.6rem 1rem;display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;color:#166534;"><i class="bi bi-wifi"></i><span style="flex:1;">Koneksi internet tersedia kembali.</span><button style="background:none;border:none;color:#16a34a;cursor:pointer;font-size:0.75rem;"><i class="bi bi-x"></i></button></div>
      </div>'''
sections.append(section("sec-offline-indicator", "wifi-off", "Offline Indicator", "Offline indicator bar", oi_preview, enc(oi_preview)))

# 20. sec-bottom-sheet
bs_preview = '''<div class="fv-bottom-sheet" style="max-width:375px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:16px 16px 0 0;overflow:hidden;position:relative;">
        <div style="padding:0.6rem;display:flex;justify-content:center;cursor:grab;"><div style="width:32px;height:4px;background:#d1d5db;border-radius:2px;"></div></div>
        <div style="padding:0 1.25rem 1.25rem;">
          <h4 style="margin:0 0 0.75rem;font-size:0.95rem;color:#1e293b;">Pilih Aksi</h4>
          <div style="display:flex;flex-direction:column;gap:0.25rem;">
            <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.65rem 0.5rem;border-radius:8px;text-decoration:none;"><i class="bi bi-camera" style="color:#6366f1;font-size:1rem;"></i><span style="font-size:0.85rem;color:#1e293b;">Ambil Foto</span></a>
            <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.65rem 0.5rem;border-radius:8px;text-decoration:none;"><i class="bi bi-images" style="color:#6366f1;font-size:1rem;"></i><span style="font-size:0.85rem;color:#1e293b;">Pilih dari Galeri</span></a>
            <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.65rem 0.5rem;border-radius:8px;text-decoration:none;"><i class="bi bi-folder2-open" style="color:#6366f1;font-size:1rem;"></i><span style="font-size:0.85rem;color:#1e293b;">Pilih File</span></a>
          </div>
          <div style="border-top:1px solid #f1f5f9;margin:0.75rem 0;"></div>
          <button style="width:100%;padding:0.65rem;background:#f1f5f9;border:none;border-radius:8px;font-size:0.85rem;color:#64748b;cursor:pointer;font-weight:500;">Batal</button>
        </div>
      </div>'''
sections.append(section("sec-bottom-sheet", "caret-up-square", "Bottom Sheet", "Bottom sheet mobile", bs_preview, enc(bs_preview)))

# 21. sec-swipe-action
sa_preview = '''<div class="fv-swipe-action" style="max-width:400px;display:flex;flex-direction:column;gap:0.4rem;">
        <div style="position:relative;overflow:hidden;border-radius:8px;"><div style="display:flex;"><div style="flex:1;background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:0.7rem 0.85rem;display:flex;align-items:center;gap:0.6rem;"><div style="width:36px;height:36px;border-radius:8px;background:#eff6ff;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="bi bi-envelope" style="color:#6366f1;"></i></div><div style="flex:1;min-width:0;"><div style="font-size:0.82rem;font-weight:600;color:#1e293b;">Pesan baru dari Budi</div><div style="font-size:0.7rem;color:#94a3b8;">5 menit lalu</div></div><div style="width:8px;height:8px;border-radius:50%;background:#6366f1;flex-shrink:0;"></div></div><div style="display:flex;align-items:center;gap:0;"><div style="background:#22c55e;color:#fff;padding:0.7rem 0.8rem;display:flex;align-items:center;justify-content:center;border-radius:0 0 8px 0;cursor:pointer;font-size:0.75rem;"><i class="bi bi-check-lg"></i></div><div style="background:#ef4444;color:#fff;padding:0.7rem 0.8rem;display:flex;align-items:center;justify-content:center;border-radius:0 8px 0 0;cursor:pointer;font-size:0.75rem;"><i class="bi bi-trash"></i></div></div></div></div>
        <div style="position:relative;overflow:hidden;border-radius:8px;"><div style="display:flex;"><div style="flex:1;background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:0.7rem 0.85rem;display:flex;align-items:center;gap:0.6rem;"><div style="width:36px;height:36px;border-radius:8px;background:#f0fdf4;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="bi bi-check-circle" style="color:#22c55e;"></i></div><div style="flex:1;min-width:0;"><div style="font-size:0.82rem;font-weight:500;color:#1e293b;">Transaksi #1043 selesai</div><div style="font-size:0.7rem;color:#94a3b8;">1 jam lalu</div></div></div></div></div>
      </div>'''
sections.append(section("sec-swipe-action", "arrow-left-right", "Swipe Action", "Swipe action list", sa_preview, enc(sa_preview)))

# 22. sec-pull-to-refresh
ptr_preview = '''<div class="fv-pull-to-refresh" style="max-width:375px;margin:0 auto;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        <div style="padding:1rem;text-align:center;border-bottom:1px solid #e2e8f0;"><div style="width:28px;height:28px;border:2px solid #e2e8f0;border-top-color:#6366f1;border-radius:50%;margin:0 auto;animation:spin 1s linear infinite;"></div><div style="font-size:0.75rem;color:#64748b;margin-top:0.4rem;">Menarik ke bawah untuk memperbarui...</div></div>
        <div style="padding:0.85rem;">
          <div style="font-size:0.78rem;color:#64748b;margin-bottom:0.5rem;">Terakhir diperbarui: 2 menit lalu</div>
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:0.7rem;display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem;"><div style="width:32px;height:32px;border-radius:6px;background:#eff6ff;display:flex;align-items:center;justify-content:center;"><i class="bi bi-bell" style="color:#6366f1;font-size:0.8rem;"></i></div><div style="flex:1;font-size:0.8rem;color:#1e293b;">3 notifikasi baru</div></div>
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:0.7rem;display:flex;align-items:center;gap:0.5rem;"><div style="width:32px;height:32px;border-radius:6px;background:#f0fdf4;display:flex;align-items:center;justify-content:center;"><i class="bi bi-check-circle" style="color:#22c55e;font-size:0.8rem;"></i></div><div style="flex:1;font-size:0.8rem;color:#1e293b;">Semua sinkron</div></div>
        </div>
      </div>'''
sections.append(section("sec-pull-to-refresh", "arrow-clockwise", "Pull to Refresh", "Pull to refresh", ptr_preview, enc(ptr_preview)))

# 23. sec-fab
fab_preview = '''<div class="fv-fab" style="display:flex;gap:1rem;align-items:flex-end;flex-wrap:wrap;padding:1rem;">
        <div style="position:relative;display:inline-flex;flex-direction:column;gap:0.6rem;align-items:center;">
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:0.5rem 0.75rem;display:flex;flex-direction:column;gap:0.3rem;box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-bottom:0.3rem;">
            <button style="background:none;border:none;width:32px;height:32px;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:0.9rem;"><i class="bi bi-camera"></i></button>
            <button style="background:none;border:none;width:32px;height:32px;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:0.9rem;"><i class="bi bi-pencil"></i></button>
            <button style="background:none;border:none;width:32px;height:32px;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;font-size:0.9rem;"><i class="bi bi-link-45deg"></i></button>
          </div>
          <button style="width:52px;height:52px;border-radius:50%;background:#6366f1;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(99,102,241,0.4);font-size:1.3rem;"><i class="bi bi-plus-lg"></i></button>
        </div>
        <button style="width:48px;height:48px;border-radius:50%;background:#22c55e;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(34,197,94,0.4);font-size:1.1rem;"><i class="bi bi-chat-dots"></i></button>
        <button style="width:48px;height:48px;border-radius:14px;background:#1e293b;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(30,41,59,0.3);font-size:1.1rem;"><i class="bi bi-arrow-up"></i></button>
      </div>'''
sections.append(section("sec-fab", "plus-circle", "FAB", "Floating action button", fab_preview, enc(fab_preview)))

# 24. sec-mobile-tabs
mt_preview = '''<div class="fv-mobile-tabs" style="max-width:375px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
        <div style="display:flex;border-bottom:1px solid #e2e8f0;">
          <button style="flex:1;padding:0.6rem;background:none;border:none;border-bottom:2px solid #6366f1;color:#6366f1;font-size:0.82rem;font-weight:600;cursor:pointer;">Beranda</button>
          <button style="flex:1;padding:0.6rem;background:none;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.82rem;cursor:pointer;">Produk</button>
          <button style="flex:1;padding:0.6rem;background:none;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.82rem;cursor:pointer;">Pesanan</button>
          <button style="flex:1;padding:0.6rem;background:none;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.82rem;cursor:pointer;">Profil</button>
        </div>
        <div style="padding:1rem;color:#64748b;font-size:0.82rem;text-align:center;">Konten tab aktif</div>
      </div>'''
sections.append(section("sec-mobile-tabs", "phone", "Mobile Tab Bar", "Mobile tab bar", mt_preview, enc(mt_preview)))

# 25. sec-mobile-nav
mn_preview = '''<div class="fv-mobile-nav" style="max-width:375px;margin:0 auto;background:#1e293b;border-radius:0 16px 16px 0;overflow:hidden;width:280px;">
        <div style="padding:1.25rem;border-bottom:1px solid #334155;">
          <div style="display:flex;align-items:center;gap:0.6rem;">
            <div style="width:40px;height:40px;border-radius:50%;background:#6366f1;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;">A</div>
            <div><div style="color:#f8fafc;font-size:0.9rem;font-weight:600;">Ahmad Fauzi</div><div style="color:#94a3b8;font-size:0.75rem;">ahmad@email.com</div></div>
          </div>
        </div>
        <nav style="padding:0.5rem;">
          <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0.75rem;border-radius:8px;text-decoration:none;color:#f8fafc;font-size:0.85rem;background:rgba(99,102,241,0.15);"><i class="bi bi-house-door" style="width:18px;"></i> Beranda</a>
          <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0.75rem;border-radius:8px;text-decoration:none;color:#94a3b8;font-size:0.85rem;"><i class="bi bi-speedometer2" style="width:18px;"></i> Dashboard</a>
          <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0.75rem;border-radius:8px;text-decoration:none;color:#94a3b8;font-size:0.85rem;"><i class="bi bi-wallet2" style="width:18px;"></i> Keuangan</a>
          <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0.75rem;border-radius:8px;text-decoration:none;color:#94a3b8;font-size:0.85rem;"><i class="bi bi-people" style="width:18px;"></i> Pelanggan</a>
          <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0.75rem;border-radius:8px;text-decoration:none;color:#94a3b8;font-size:0.85rem;"><i class="bi bi-gear" style="width:18px;"></i> Pengaturan</a>
        </nav>
        <div style="padding:0.5rem 0.75rem;border-top:1px solid #334155;margin-top:0.5rem;">
          <a href="#" style="display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0;border-radius:8px;text-decoration:none;color:#ef4444;font-size:0.85rem;"><i class="bi bi-box-arrow-left" style="width:18px;"></i> Keluar</a>
        </div>
      </div>'''
sections.append(section("sec-mobile-nav", "list", "Mobile Navigation Drawer", "Slide-out nav", mn_preview, enc(mn_preview)))

with open(out_path, "w", encoding="utf-8") as f:
    f.write("\n\n".join(sections))

print(f"Done! Wrote {len(sections)} sections to {out_path}")
print(f"File size: {os.path.getsize(out_path)} bytes")
