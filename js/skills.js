const SKILLS = [
  { label: 'Python',      icon: '🐍' },
  { label: 'Pandas',      icon: '🐼' },
  { label: 'NumPy',       icon: '🔢' },
  { label: 'Scikit-learn',icon: '🤖' },
  { label: 'Matplotlib',  icon: '📊' },
  { label: 'Seaborn',     icon: '🎨' },
  { label: 'PostgreSQL',  icon: '🐘' },
  { label: 'MySQL',       icon: '🗄️' },
];

function renderSkills() {
  const row = document.getElementById('skillsRow');
  if (!row) return;
  row.innerHTML = SKILLS.map(s =>
    `<span class="skill-chip"><span class="skill-chip-icon">${s.icon}</span>${s.label}</span>`
  ).join('');
}