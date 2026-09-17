import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('.', import.meta.url));
const pngDir = resolve(out, 'png');
const W = 1080;
const H = 1350;
const C = { dark: '#182d2b', paper: '#f6f4ef', ink: '#1b1d1b', muted: '#69706a', orange: '#c26339', yellow: '#e8bd54', green: '#245c55', pale: '#dce6df', line: '#49635e', mint: '#b7d5ca' };
const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const text = (x, y, value, size, fill, family = 'Arial', weight = 400, anchor = 'start') => `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}px" font-weight="${weight}" text-anchor="${anchor}">${esc(value)}</text>`;
const lines = (x, y, values, size, fill, family = 'Arial', weight = 400, gap = size * 1.18) => values.map((v, i) => text(x, y + i * gap, v, size, fill, family, weight)).join('');
const rect = (x, y, w, h, fill, rx = 0, stroke = 'none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}"/>`;
const circle = (cx, cy, r, fill, stroke = 'none') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}"/>`;
const line = (x1, y1, x2, y2, stroke, width = 1, dash = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`;
const header = (num, label, dark) => `${text(96, 112, label, 18, dark ? C.yellow : C.orange, 'Consolas', 700)}${text(984, 112, `${num} / 09`, 16, dark ? '#9ab1a7' : C.muted, 'Consolas', 700, 'end')}`;
const footer = (dark, label = 'LAB / DATA LITERACY') => text(96, 1288, label, 14, dark ? '#56736c' : C.muted, 'Consolas', 700);
const svg = (content, dark) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${rect(0, 0, W, H, dark ? C.dark : C.paper)}${content}</svg>`;

function slide1() {
  return svg(`${header('01', 'LE TEST QUE LES TITRES OUBLIENT', true)}${rect(96, 174, 888, 8, C.orange)}${lines(96, 255, ['CANDIDAT A  16 %', 'CANDIDAT B  14 %'], 20, C.pale, 'Consolas', 700, 34)}${text(96, 500, '16 %', 154, '#f5f2ea', 'Georgia', 700)}${text(96, 585, 'contre', 55, C.orange, 'Georgia', 700)}${text(96, 710, '14 %', 154, '#f5f2ea', 'Georgia', 700)}${line(96, 770, 530, 770, C.orange, 2)}${lines(96, 850, ['Peut-on vraiment dire', 'que A est devant ?'], 47, C.pale, 'Georgia', 500, 54)}${line(96, 1065, 984, 1065, C.line)}${text(96, 1110, 'Échantillon : 1 000 personnes', 20, '#f5f2ea', 'Consolas', 700)}${text(984, 1110, 'DONNÉE PÉDAGOGIQUE SYNTHÉTIQUE', 16, C.yellow, 'Consolas', 700, 'end')}${footer(true)}`, true);
}
function slide2() {
  const chart = `${line(140, 690, 940, 690, '#c9d1ca', 2)}${text(140, 650, 'même axe', 18, C.muted, 'Consolas', 700)}${rect(305, 730, 520, 82, '#b7d5ca', 41)}${rect(220, 890, 520, 82, '#f0cdbd', 41)}${rect(565, 712, 58, 118, C.green, 29)}${rect(480, 872, 58, 118, C.orange, 29)}${text(594, 780, 'A', 24, '#fff', 'Consolas', 700, 'middle')}${text(509, 940, 'B', 24, '#fff', 'Consolas', 700, 'middle')}${text(660, 788, '16 %', 40, C.ink, 'Consolas', 700)}${text(770, 948, '14 %', 40, C.ink, 'Consolas', 700)}${rect(300, 820, 500, 48, C.yellow, 10)}${text(550, 851, 'Les zones peuvent se chevaucher', 20, C.ink, 'Georgia', 700, 'middle')}${text(940, 1030, 'Représentation pédagogique · intervalles non calculés ici', 17, C.muted, 'Consolas', 400, 'end')}`;
  return svg(`${header('02', 'UNE ESTIMATION, PAS UNE MESURE EXACTE', false)}${text(96, 280, 'Pas si vite.', 112, C.green, 'Georgia', 700)}${lines(96, 380, ['16 % n’est pas la valeur exacte dans toute la population.', 'C’est une estimation produite à partir de 1 000 personnes.'], 28, C.muted, 'Georgia', 400, 42)}${chart}${line(96, 1080, 984, 1080, C.orange, 5)}${lines(96, 1140, ['Un écart observé n’est pas automatiquement', 'une avance certaine.'], 29, C.ink, 'Georgia', 700, 38)}${footer(false)}`, false);
}
function slide3() {
  const values = [16.2, 15.4, 15.9, 14.9, 16.5, 15.7, 16.0, 15.2, 15.8, 16.4, 15.1, 16.1, 15.5, 16.7, 15.3, 15.6, 16.3, 14.8, 16.6];
  const positions = [760, 230, 680, 420, 900, 150, 560, 330, 820, 275, 640, 470, 950, 365, 720, 190, 515, 855, 600];
  const dots = values.map((value, i) => { const x = positions[i]; const y = 730 - (value - 15.8) * 120; const label = [1, 4, 8, 13, 17].includes(i) ? text(x, y - 30, `${String(value).replace('.', ',')} %`, 17, '#dce6df', 'Consolas', 700, 'middle') : ''; return `${circle(x, y, 8, i % 3 === 0 ? C.orange : C.mint)}${circle(x, y, 20, 'none', C.line)}${label}`; }).join('');
  return svg(`${header('03', 'LE BRUIT D’ÉCHANTILLONNAGE', true)}${lines(96, 250, ['Même population.', 'Même méthode.', 'Résultats différents.'], 62, '#f5f2ea', 'Georgia', 700, 65)}${text(96, 510, 'Si l’on recommence correctement l’enquête avec d’autres personnes,', 25, '#cbd9d1', 'Georgia')}${text(96, 548, 'le résultat bouge légèrement.', 25, '#cbd9d1', 'Georgia')}${line(96, 730, 984, 730, C.yellow, 3, '10 8')}${text(984, 710, 'cible : 15,8 %', 18, C.yellow, 'Consolas', 700, 'end')}${dots}${text(96, 900, 'EXEMPLE SYNTHÉTIQUE · 19 TIRAGES', 18, C.orange, 'Consolas', 700)}${line(96, 980, 984, 980, C.yellow, 5)}${lines(96, 1050, ['Cette variation naturelle s’appelle', 'le bruit d’échantillonnage.'], 31, '#f5f2ea', 'Georgia', 700, 42)}${footer(true)}`, true);
}
function slide4() {
  const panel = (x, title, color, points, explanation) => `${rect(x, 460, 420, 480, '#ffffff', 16, '#c8d0c8')}${text(x + 28, 515, title, 25, color, 'Consolas', 700)}${line(x + 28, 690, x + 392, 690, C.muted, 2, '8 8')}${text(x + 365, 670, 'cible', 16, C.muted, 'Consolas', 700, 'end')}${points.map(([dx, dy]) => `${circle(x + dx, dy, 10, color)}${circle(x + dx, dy, 23, 'none', color)}`).join('')}${lines(x + 28, 820, explanation, 23, C.ink, 'Georgia', 400, 31)}`;
  return svg(`${header('04', 'BRUIT ET BIAIS', false)}${lines(96, 255, ['Deux façons', 'très différentes', 'de se tromper.'], 61, C.ink, 'Georgia', 700, 63)}${panel(96, 'BRUIT', C.green, [[70, 625], [135, 750], [195, 660], [255, 720], [320, 610], [365, 770]], ['L’échantillon change.', 'Le résultat fluctue.', 'La moyenne reste centrée.'])}${panel(564, 'BIAIS', C.orange, [[110, 760], [160, 735], [210, 750], [260, 725], [310, 745], [355, 735]], ['La méthode pousse', 'systématiquement le chiffre', 'dans une direction.'])}${line(96, 1010, 984, 1010, C.orange, 5)}${lines(96, 1075, ['La marge d’erreur décrit surtout le bruit.', 'Elle ne répare pas un biais.'], 29, C.ink, 'Georgia', 700, 40)}${footer(false)}`, false);
}
function slide5() {
  const tokens = (x, y, count, palette, spacing = 34) => Array.from({ length: count }, (_, i) => { const col = i % 9; const row = Math.floor(i / 9); return `${circle(x + col * spacing, y + row * spacing, 10, palette[i % palette.length])}${circle(x + col * spacing, y + row * spacing, 18, 'none', '#55756d')}`; }).join('');
  return svg(`${header('05', 'LA SÉLECTION COMPTE', true)}${lines(96, 235, ['Plus de réponses ne compensent pas', 'un échantillon déséquilibré.'], 45, '#f5f2ea', 'Georgia', 700, 54)}${rect(96, 410, 420, 510, '#203c38', 16, C.line)}${rect(564, 410, 420, 510, '#203c38', 16, C.line)}${text(124, 470, '1 000 personnes', 27, C.yellow, 'Consolas', 700)}${text(124, 512, 'bien réparties', 25, '#f5f2ea', 'Georgia', 700)}${tokens(145, 600, 36, [C.orange, C.yellow, C.mint, '#8fb8a9'])}${text(124, 870, 'Échantillon diversifié', 21, '#cbd9d1', 'Consolas', 700)}${text(592, 470, '10 000 personnes', 27, C.orange, 'Consolas', 700)}${lines(592, 512, ['recrutées', 'dans le même groupe'], 23, '#f5f2ea', 'Georgia', 700, 28)}${tokens(610, 600, 72, [C.orange])}${text(592, 870, 'Plus grand, mais déséquilibré', 20, '#f0cdbd', 'Consolas', 700)}${line(96, 990, 984, 990, C.yellow, 5)}${lines(96, 1050, ['Plus de réponses réduisent le hasard.', 'Elles ne corrigent pas automatiquement la sélection.'], 27, '#f5f2ea', 'Georgia', 700, 38)}${lines(96, 1165, ['On peut obtenir un chiffre très stable…', 'autour de la mauvaise valeur.'], 24, C.yellow, 'Georgia', 700, 32)}${footer(true)}`, true);
}
function slide6() {
  const prompt = (x, y, title, linesText, color) => `${rect(x, y, 395, 270, '#fff', 14, '#c8d0c8')}${text(x + 24, y + 48, title, 18, color, 'Consolas', 700)}${lines(x + 24, y + 105, linesText, 22, C.ink, 'Georgia', 400, 35)}${circle(x + 335, y + 215, 18, 'none', color)}${circle(x + 335, y + 215, 6, color)}`;
  return svg(`${header('06', 'LES MOTS FONT PARTIE DE LA MESURE', false)}${lines(96, 245, ['La réponse dépend aussi', 'de la question.'], 52, C.ink, 'Georgia', 700, 58)}${text(96, 385, 'Même thème de départ. Deux mesures différentes.', 26, C.muted, 'Georgia')}${prompt(96, 465, 'QUESTION A', ['Quel sujet vous préoccupe', 'le plus ?', '', 'Pouvoir d’achat · santé', 'Sécurité · climat · autre'], C.green)}${prompt(589, 465, 'QUESTION B', ['La sécurité vous', 'préoccupe-t-elle ?', '', 'OUI', 'NON'], C.orange)}${rect(96, 815, 888, 190, '#e6eee9', 14)}${lines(130, 880, ['Ces deux questions ne mesurent pas exactement', 'la même chose.'], 30, C.ink, 'Georgia', 700, 40)}${lines(130, 960, ['Les mots, le format et les réponses proposées', 'influencent ce qui est mesuré.'], 24, C.muted, 'Georgia', 400, 32)}${text(984, 1080, 'EXEMPLE PÉDAGOGIQUE', 18, C.orange, 'Consolas', 700, 'end')}${footer(false)}`, false);
}
function slide7() {
  const observed = (x, y, label, count, color, absent = false) => `${text(x, y, label, 19, C.ink, 'Consolas', 700)}${absent ? `<rect x="${x + 112}" y="${y - 21}" width="250" height="30" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="8 6"/>${text(x + 237, y + 1, '0 réponse', 17, color, 'Consolas', 700, 'middle')}` : `${rect(x + 112, y - 21, count, 30, color, 15)}${text(x + 126, y + 1, `${count} réponses`, 16, '#fff', 'Consolas', 700)}`}`;
  const adjusted = (x, y, label, message, color, absent = false) => { const messageLines = message.split('|'); const marker = absent ? circle(x + 145, y - 7, 9, 'none', color) : circle(x + 145, y - 7, 9, color); return `${text(x, y, label, 18, C.ink, 'Consolas', 700)}${marker}${lines(x + 168, y - 7, messageLines, 15, absent ? color : C.ink, 'Georgia', 700, 19)}`; };
  const left = `${rect(96, 400, 420, 485, '#fff', 14, '#c8d0c8')}${text(124, 455, 'RÉPONSES OBSERVÉES', 22, C.orange, 'Consolas', 700)}${text(124, 500, 'Ce que l’enquête a réellement reçu', 18, C.muted, 'Georgia')}${observed(124, 575, 'Groupe A', 260, C.orange)}${observed(124, 650, 'Groupe B', 155, C.yellow)}${observed(124, 725, 'Groupe C', 120, '#8fb8a9')}${observed(124, 800, 'Groupe D', 0, C.muted, true)}`;
  const right = `${rect(564, 400, 420, 485, '#fff', 14, '#c8d0c8')}${text(592, 455, 'APRÈS REDRESSEMENT', 22, C.green, 'Consolas', 700)}${lines(592, 495, ['Le poids des réponses est ajusté', 'pour se rapprocher de la population cible.'], 16, C.muted, 'Georgia', 400, 22)}${adjusted(592, 575, 'Groupe A', 'chaque réponse|compte moins', C.orange)}${adjusted(592, 650, 'Groupe B', 'chaque réponse|compte davantage', C.yellow)}${adjusted(592, 725, 'Groupe C', 'chaque réponse|compte davantage', '#8fb8a9')}${adjusted(592, 800, 'Groupe D', 'aucune réponse|disponible', C.muted, true)}`;
  return svg(`${header('07', 'CE QUE LE REDRESSEMENT PEUT FAIRE', true)}${lines(96, 235, ['Le redressement corrige', 'certains déséquilibres.', 'Il ne crée pas les réponses manquantes.'], 46, '#f5f2ea', 'Georgia', 700, 52)}${text(96, 375, 'La répartition observée ne correspond pas à la population cible connue.', 20, '#cbd9d1', 'Georgia')}${left}${text(540, 650, '→', 58, C.yellow, 'Consolas', 700, 'middle')}${right}${rect(96, 925, 888, 115, '#203c38', 14, C.line)}${lines(124, 970, ['Le redressement ne crée pas de nouvelles réponses.', 'Il donne plus ou moins de poids à celles qui existent.'], 22, '#f5f2ea', 'Georgia', 700, 30)}${lines(96, 1110, ['Si un groupe est absent,', 'aucun calcul ne peut connaître réellement sa réponse.'], 25, C.yellow, 'Georgia', 700, 34)}${text(96, 1210, 'Le redressement corrige ce que l’on connaît. Il ne supprime pas tous les biais.', 22, '#f5f2ea', 'Georgia', 700)}${footer(true)}`, true);
}
function slide8() {
  const itemLines = [['Qui a réalisé', 'l’enquête ?'], ['Qui l’a commandée ?'], ['Quelle population', 'cherche-t-on à mesurer ?'], ['Qui a réellement', 'été interrogé ?'], ['Quand le terrain', 'a-t-il eu lieu ?'], ['Comment la question', 'était-elle formulée ?'], ['Comment l’échantillon', 'a-t-il été constitué ?'], ['Quels redressements', 'ont été appliqués ?']];
  const list = itemLines.map((item, i) => { const col = i < 4 ? 0 : 1; const row = i % 4; const x = 96 + col * 460; const y = 410 + row * 105; return `${circle(x + 18, y - 8, 18, C.orange)}${text(x + 18, y - 2, String(i + 1), 16, '#fff', 'Consolas', 700, 'middle')}${lines(x + 52, y - 10, item, 21, C.ink, 'Georgia', 400, 26)}${line(x, y + 55, x + 390, y + 55, '#c8d0c8')}`; }).join('');
  return svg(`${header('08', 'LIRE LA FABRICATION DU CHIFFRE', false)}${lines(96, 245, ['Avant de partager un sondage,', 'vérifiez huit choses.'], 55, C.ink, 'Georgia', 700, 62)}${list}${line(96, 930, 984, 930, C.orange, 5)}${lines(96, 1000, ['Un chiffre devient utile quand sa fabrication', 'peut être inspectée.'], 29, C.ink, 'Georgia', 700, 40)}${footer(false)}`, false);
}
function slide9() {
  const steps = ['Changez la taille de l’échantillon.', 'Modifiez le recrutement.', 'Appliquez un redressement.', 'Répétez l’enquête 500 fois.'];
  const list = steps.map((s, i) => `${text(130, 485 + i * 43, '→', 23, C.yellow, 'Consolas', 700)}${text(170, 485 + i * 43, s, 23, '#cbd9d1', 'Georgia')}`).join('');
  return svg(`${header('09', 'LAB / DATA LITERACY', true)}${lines(96, 255, ['Et si vous fabriquiez', 'vous-même un sondage ?'], 67, '#f5f2ea', 'Georgia', 700, 70)}${list}${lines(96, 700, ['Voyez où le chiffre bouge.', 'Et surtout, pourquoi.'], 35, '#dce6df', 'Georgia', 400, 44)}${rect(96, 815, 430, 82, C.orange, 3)}${text(311, 867, 'TESTER LE LAB INTERACTIF', 25, '#fff', 'Consolas', 700, 'middle')}${text(96, 955, 'Lien dans le premier commentaire', 31, C.yellow, 'Georgia', 700)}${text(96, 1020, 'labs.badreddineek.com', 22, '#9ab1a7', 'Consolas', 700)}${text(96, 1110, 'Simulation pédagogique · données synthétiques', 16, '#9ab1a7', 'Consolas')}${text(984, 1110, 'Badreddine EL KHAMLICHI', 16, '#dce6df', 'Consolas', 700, 'end')}${footer(true)}`, true);
}

const slides = [slide1(), slide2(), slide3(), slide4(), slide5(), slide6(), slide7(), slide8(), slide9()];
await mkdir(pngDir, { recursive: true });
const pdf = await PDFDocument.create();
const previewDir = resolve(out, 'previews');
await mkdir(previewDir, { recursive: true });
const previewBuffers = [];
for (let i = 0; i < slides.length; i += 1) {
  const input = Buffer.from(slides[i]);
  const png = await sharp(input).png().toBuffer();
  await writeFile(resolve(pngDir, `slide-${i + 1}.png`), png);
  const preview = await sharp(png).resize(350, 438).png().toBuffer();
  previewBuffers.push(preview);
  await writeFile(resolve(previewDir, `slide-${i + 1}.png`), preview);
  const image = await pdf.embedPng(png);
  const page = pdf.addPage([W, H]);
  page.drawImage(image, { x: 0, y: 0, width: W, height: H });
}
await writeFile(resolve(out, 'linkedin-carousel.pdf'), await pdf.save());
const montage = await sharp({ create: { width: 3 * 350, height: 3 * 438, channels: 4, background: C.dark } }).composite(previewBuffers.map((input, i) => ({ input, left: (i % 3) * 350, top: Math.floor(i / 3) * 438 }))).png().toBuffer();
await writeFile(resolve(out, 'montage-control.png'), montage);
console.log(`Exported ${slides.length} PNG files and one PDF from SVG fallback.`);
