import { writeFileSync } from 'node:fs';
const colors=['#e0dffe','#ffe6e6','#e6ffe6','#e6f7ff','#fff7e6','#e8e8ff','#ffe8ff','#fff8e8','#e8fff8','#f0e8ff','#e8f0ff','#ffe8f0'];
for(let i=1;i<=12;i++){
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='600' height='400' fill='${colors[i-1]}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='40' fill='#333'>Code ${i}</text></svg>`;
  writeFileSync(`public/img/articles/${i}.svg`,svg);
}
console.log('SVG images generated'); 