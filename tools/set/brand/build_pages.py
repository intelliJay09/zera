"""Writes the HTML for every printed or on-screen surface in the set. Rendered to PNG by Playwright."""
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pages')
os.makedirs(OUT, exist_ok=True)

FONTS = '<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Marcellus&family=JetBrains+Mono&display=swap" rel="stylesheet">'
GREEN, CREAM, BRASS, INK = '#22352B', '#EEE5D6', '#B8955A', '#171a18'

def page(name, w, h, css, body):
    html = f'''<!doctype html><html><head><meta charset="utf-8"><title>{name}</title>{FONTS}<style>
html,body{{margin:0;width:{w}px;height:{h}px;overflow:hidden}}*{{box-sizing:border-box}}{css}</style></head><body>{body}</body></html>'''
    open(os.path.join(OUT, f'{name}.html'), 'w').write(html)
    return name, w, h

PAGES = []

# ---------------------------------------------------------------- booking tablet, 23:14, the night before
stylists = ['Adwoa', 'Nana Ama', 'Esi']
blocks = {  # (start hour, length h, client, service, new?)
    'Adwoa': [(9, 4, 'Akua B.', 'Knotless braids'), (13.5, 1.5, 'Dzifa O.', 'Silk press'), (15.5, 2.5, 'Maame S.', 'Locs retwist')],
    'Nana Ama': [(9, 1, 'Efua K.', 'Gel manicure'), (10, 1.5, 'Akosua M.', 'Silk press', True), (12, 1, 'Yaa D.', 'Pedicure'), (14, 1.5, 'Abena T.', 'Facial', True), (16, 1, 'Lamisi A.', 'Gel manicure')],
    'Esi': [(9.5, 1.5, 'Naa K.', 'Facial'), (11.5, 3, 'Selasi G.', 'Bridal trial', True), (15, 1, 'Ama P.', 'Brow shaping'), (16.5, 1.5, 'Kukua E.', 'Hydrafacial')],
}
H0, H1, ROWH = 9, 19, 118
cols = ''
for s in stylists:
    items = ''
    for b in blocks[s]:
        start, ln, client, svc = b[:4]; new = len(b) > 4
        top = (start - H0) * ROWH + 4; hh = ln * ROWH - 8
        items += f'<div class="bk{" new" if new else ""}" style="top:{top}px;height:{hh}px"><b>{client}</b><span>{svc}</span>{"<em>Booked overnight</em>" if new else ""}</div>'
    cols += f'<div class="col"><div class="ch">{s}</div><div class="cb">{items}</div></div>'
hours = ''.join(f'<div class="hr" style="top:{(h - H0) * ROWH}px">{h:02d}:00</div>' for h in range(H0, H1 + 1))
PAGES.append(page('tablet', 2388, 1668, f'''
body{{background:#f6f2ea;font-family:Lato,sans-serif;color:{INK}}}
.top{{height:150px;background:{GREEN};color:{CREAM};display:flex;align-items:center;justify-content:space-between;padding:0 70px}}
.wm{{font-family:Marcellus,serif;font-size:54px;letter-spacing:.16em}}
.st{{font-size:34px;opacity:.75}} .st b{{font-size:44px;opacity:1;margin-left:24px}}
.sub{{display:flex;justify-content:space-between;align-items:baseline;padding:44px 70px 22px}}
.sub h1{{font-size:64px;margin:0;font-weight:700}} .sub p{{margin:0;font-size:34px;color:#6a6a62}} .sub p b{{color:{GREEN}}}
.grid{{position:relative;margin:0 70px;display:grid;grid-template-columns:150px 1fr 1fr 1fr;gap:22px}}
.hours{{position:relative;height:{(H1 - H0) * ROWH}px}} .hr{{position:absolute;font-size:26px;color:#9a978e;transform:translateY(-14px)}}
.ch{{font-size:34px;font-weight:700;padding-bottom:16px;border-bottom:3px solid #e4ddcf;margin-bottom:6px}}
.cb{{position:relative;height:{(H1 - H0) * ROWH}px;background:repeating-linear-gradient(#fff 0,#fff {ROWH - 2}px,#ebe5d9 {ROWH - 2}px,#ebe5d9 {ROWH}px)}}
.bk{{position:absolute;left:8px;right:8px;background:#e6ece6;border-left:10px solid {GREEN};border-radius:12px;padding:16px 22px;overflow:hidden}}
.bk b{{display:block;font-size:32px}} .bk span{{font-size:28px;color:#555}}
.bk.new{{background:#f3e7cf;border-left-color:{BRASS}}} .bk em{{display:block;font-style:normal;font-size:24px;color:#8a6a32;margin-top:6px;font-weight:700;letter-spacing:.04em}}
.toast{{position:absolute;right:90px;bottom:70px;width:980px;background:{INK};color:#fff;border-radius:28px;padding:34px 42px;box-shadow:0 30px 80px rgba(0,0,0,.35)}}
.toast small{{font-size:26px;color:{BRASS};letter-spacing:.14em;font-weight:700}} .toast p{{font-size:38px;line-height:1.3;margin:12px 0 0}}
''', f'''<div class="top"><div class="wm">SIKA &amp; SHEA</div><div class="st">Bookings<b>23:14</b></div></div>
<div class="sub"><h1>Friday 17 October</h1><p>Booked since closing: <b>3</b></p></div>
<div class="grid"><div class="hours">{hours}</div>{cols}</div>
<div class="toast"><small>NEW BOOKING · 23:14</small><p>Selasi G. booked a bridal trial with Esi, Friday 11:30. Deposit of GHS 300 paid.</p></div>'''))

# ---------------------------------------------------------------- the month's report, on the laptop in the morning
bars = [2, 1, 1, 0, 0, 1, 2, 3, 2, 3, 4, 3, 2, 3, 4, 5, 6, 9, 11, 12, 10, 8, 6, 4]  # bookings by hour of day, 00..23
after = lambda h: h >= 19 or h < 9
mx = max(bars)
chart = ''.join(f'<div class="b{" a" if after(h) else ""}" style="height:{v / mx * 100:.1f}%"></div>' for h, v in enumerate(bars))
PAGES.append(page('report', 2560, 1600, f'''
body{{background:#0f0e0d;color:#f3ebe0;font-family:Lato,sans-serif}}
.bar{{height:60px;background:#171615;display:flex;align-items:center;padding:0 36px;gap:14px}} .bar i{{width:18px;height:18px;border-radius:50%;background:#3a3836}}
.w{{padding:100px 150px}}
.l{{font-family:'JetBrains Mono',monospace;font-size:26px;letter-spacing:.22em;color:#B87333}}
h1{{font-size:118px;line-height:1;margin:26px 0 0;font-weight:700;letter-spacing:-.02em}}
.s{{font-size:36px;color:rgba(243,235,224,.6);margin-top:20px}}
.g{{display:grid;grid-template-columns:repeat(4,1fr);gap:60px;margin-top:90px;border-top:1px solid rgba(243,235,224,.12);padding-top:56px}}
.k{{font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.16em;color:rgba(243,235,224,.45);line-height:1.5}}
.v{{font-size:120px;font-weight:700;margin-top:20px;letter-spacing:-.02em}} .v small{{font-size:44px;font-weight:400;color:rgba(243,235,224,.6);margin-right:12px}}
.n{{font-size:28px;color:rgba(243,235,224,.5);margin-top:10px}}
.c{{margin-top:80px}} .ct{{display:flex;justify-content:space-between;font-size:28px;color:rgba(243,235,224,.55)}} .ct b{{color:#B87333;font-weight:400}}
.ch{{display:flex;align-items:flex-end;gap:14px;height:230px;margin-top:26px}} .ch .b{{flex:1;background:#3a3633;border-radius:6px 6px 0 0}} .ch .b.a{{background:#B87333}}
.ax{{display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:20px;color:rgba(243,235,224,.35);margin-top:12px}}
.f{{position:absolute;bottom:80px;left:150px;right:150px;display:flex;justify-content:space-between;font-size:28px;color:rgba(243,235,224,.45)}} .f b{{color:#B87333}}
''', f'''<div class="bar"><i></i><i></i><i></i></div><div class="w">
<div class="l">REVENUE SYSTEM REPORT · OCTOBER</div><h1>Sika &amp; Shea</h1><div class="s">What the system caught this month, in real numbers.</div>
<div class="g">
<div><div class="k">ENQUIRIES ANSWERED<br>AFTER HOURS</div><div class="v">64</div><div class="n">None left waiting</div></div>
<div><div class="k">BOOKINGS TAKEN<br>AFTER HOURS</div><div class="v">31</div><div class="n">Deposits paid</div></div>
<div><div class="k">CLIENTS<br>BROUGHT BACK</div><div class="v">14</div><div class="n">Quiet for 6 weeks or more</div></div>
<div><div class="k">COLLECTED FROM<br>THESE BOOKINGS</div><div class="v"><small>GHS</small>22,840</div><div class="n">Paid through the system</div></div>
</div>
<div class="c"><div class="ct"><span>When the bookings came in</span><span><b>■</b> while the studio was closed</span></div><div class="ch">{chart}</div>
<div class="ax"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span></div></div>
</div><div class="f"><span>Every figure here is a booking, a payment or a message the system recorded.</span><span><b>ZERA</b></span></div>'''))

# ---------------------------------------------------------------- product labels, screen-printed straight onto the bottle
def label(name, w, h, bg, ink, product, note, size):
    return page(name, w, h, f'''
body{{background:{bg};color:{ink};font-family:Lato,sans-serif;display:flex;align-items:center;justify-content:center}}
.c{{width:{int(w * .44)}px;text-align:center;white-space:nowrap}}
.wm{{font-family:Marcellus,serif;font-size:{int(min(h * .085, w * .036))}px;letter-spacing:.2em}}
.r{{width:{int(h * .1)}px;height:2px;background:{ink};opacity:.5;margin:{int(h * .05)}px auto}}
.p{{font-family:Marcellus,serif;font-size:{int(h * .1)}px;line-height:1.1}}
.n{{font-size:{int(h * .045)}px;letter-spacing:.14em;opacity:.7;margin-top:{int(h * .04)}px}}
.s{{font-size:{int(h * .045)}px;opacity:.6;margin-top:{int(h * .1)}px}}''',
        f'<div class="c"><div class="wm">SIKA &amp; SHEA</div><div class="r"></div><div class="p">{product}</div><div class="n">{note}</div><div class="s">{size}</div></div>')

PAGES += [
    label('label-pump-green', 2010, 1500, GREEN, CREAM, 'Moringa<br>Face Wash', 'FOR ALL SKIN', '250 ml'),
    label('label-pump-cream', 2010, 1500, CREAM, GREEN, 'Cocoa<br>Hand Wash', 'WITH SHEA BUTTER', '300 ml'),
    label('label-drop-amber', 1680, 1000, '#5a3018', CREAM, 'Baobab<br>Hair Oil', 'SCALP AND ENDS', '50 ml'),
    label('label-drop-green', 1680, 1000, GREEN, CREAM, 'Hibiscus<br>Face Oil', 'NIGHT', '30 ml'),
    label('label-jar-cream', 2640, 500, CREAM, GREEN, 'Shea Body Butter', 'WHIPPED', '200 g'),
]

# ---------------------------------------------------------------- business card and the framed price list
PAGES.append(page('card', 1050, 600, f'''body{{background:{GREEN};color:{CREAM};display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Lato}}
.wm{{font-family:Marcellus,serif;font-size:96px;letter-spacing:.2em}} .t{{font-size:30px;letter-spacing:.3em;color:{BRASS};margin-top:26px}}''',
    '<div class="wm">SIKA &amp; SHEA</div><div class="t">BEAUTY STUDIO · EAST LEGON</div>'))

menu = [('Silk press', '350'), ('Knotless braids', 'from 750'), ('Locs retwist', '400'), ('Facial', '450'), ('Hydrafacial', '650'), ('Gel manicure', '250'), ('Pedicure', '220'), ('Brow shaping', '120'), ('Bridal trial', '900')]
rows = ''.join(f'<div class="r"><span>{a}</span><i></i><b>{b}</b></div>' for a, b in menu)
PAGES.append(page('menu', 1200, 1700, f'''body{{background:{CREAM};color:{GREEN};font-family:Lato;padding:130px 120px}}
.wm{{font-family:Marcellus,serif;font-size:74px;letter-spacing:.2em;text-align:center}} .t{{text-align:center;font-size:26px;letter-spacing:.3em;color:#8a6a32;margin:22px 0 100px}}
.r{{display:flex;align-items:baseline;gap:20px;font-size:44px;margin-bottom:46px}} .r span{{font-family:Marcellus,serif}} .r i{{flex:1;border-bottom:3px dotted rgba(34,53,43,.35)}} .r b{{font-weight:400}}
.f{{text-align:center;font-size:28px;letter-spacing:.14em;margin-top:90px;opacity:.7}}''',
    f'<div class="wm">SIKA &amp; SHEA</div><div class="t">PRICES IN GHS</div>{rows}<div class="f">BOOK ONLINE ANY TIME</div>'))

import json
open(os.path.join(OUT, 'pages.json'), 'w').write(json.dumps(PAGES))
print(len(PAGES), 'pages')
