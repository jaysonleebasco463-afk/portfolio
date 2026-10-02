const skills = {
  'JavaScript': {
    text: 'Everyday language for interfaces and logic. Comfortable with ES6+, async code, and the DOM.',
    code: "const scores = [72, 88, 95, 64, 81];\nconst passed = scores.filter(s => s >= 75);\nconst avg = passed.reduce((a, b) => a + b) / passed.length;\nreturn `Passed: ${passed.join(', ')} | Average: ${avg.toFixed(1)}`;",
    run: () => new Function(skills['JavaScript'].code)()
  },
  'Database Querying': {
    text: 'Writing SQL to filter, join, and summarize data across related tables.',
    code: "SELECT s.name, COUNT(p.id) AS projects\nFROM students s\nJOIN projects p ON p.student_id = s.id\nGROUP BY s.name\nORDER BY projects DESC;",
    table: [['name','projects'],['Jayson','5'],['AJ','3'],['Patrick','2']]
  },
  'Web Development': {
    text: 'Semantic HTML, modern CSS, and small interactive pages that work on any screen. Try the toggle below.',
    code: "<button id=\"like\" aria-pressed=\"false\">♡ Like</button>\n<script>\n  like.onclick = () => like.setAttribute('aria-pressed',\n    like.getAttribute('aria-pressed') !== 'true');\n<\/script>",
    demo: true
  },
  'C++': {
    text: 'Strong with fundamentals: loops, functions, arrays, and object-oriented structure.',
    code: "#include <iostream>\nint fib(int n) { return n < 2 ? n : fib(n-1) + fib(n-2); }\nint main() {\n  for (int i = 0; i < 8; i++) std::cout << fib(i) << \" \";\n}",
    sim: '0 1 1 2 3 5 8 13'
  },
  'Java': {
    text: 'Object-oriented programming with classes, methods, and clean program structure.',
    code: "public class Main {\n  public static void main(String[] args) {\n    int sum = 0;\n    for (int i = 1; i <= 5; i++) sum += i * i;\n    System.out.println(\"Sum of squares: \" + sum);\n  }\n}",
    sim: 'Sum of squares: 55'
  },
  'Python': {
    text: 'Clear, readable scripts for automation, data handling, and quick problem solving.',
    code: "names = [\"Jayson\", \"AJ\", \"Patrick\"]\nfor i, n in enumerate(names, 1):\n    print(f\"{i}. {n.upper()}\")",
    sim: '1. JAYSON\n2. AJ\n3. PATRICK'
  }
};
const tabs = document.getElementById('tabs'), panel = document.getElementById('panel');
function show(name){
  [...tabs.children].forEach(t => t.setAttribute('aria-selected', t.textContent === name));
  const s = skills[name];
  panel.innerHTML = '<p></p><pre><code></code></pre><button class="run"></button><div class="out"></div>';
  panel.querySelector('p').textContent = s.text;
  panel.querySelector('code').textContent = s.code;
  const run = panel.querySelector('.run'), out = panel.querySelector('.out');
  run.textContent = s.demo ? 'Show demo' : s.table ? 'Run query' : 'Run';
  out.textContent = 'Output appears here.';
  run.onclick = () => {
    out.classList.add('live');
    if (s.run) { try { out.textContent = s.run(); } catch (e) { out.textContent = 'Error: ' + e.message; } }
    else if (s.sim) out.textContent = s.sim;
    else if (s.table) {
      out.innerHTML = '<table></table>';
      s.table.forEach((r, i) => {
        const tr = out.firstChild.insertRow();
        r.forEach(c => { const cell = document.createElement(i ? 'td' : 'th'); cell.textContent = c; tr.appendChild(cell); });
      });
    } else {
      out.innerHTML = '<button class="run" style="margin:0" aria-pressed="false"></button>';
      const b = out.firstChild, set = on => { b.textContent = on ? '♥ Liked' : '♡ Like'; b.setAttribute('aria-pressed', on); };
      set(false); b.onclick = () => set(b.getAttribute('aria-pressed') !== 'true');
    }
  };
}
Object.keys(skills).forEach(n => {
  const b = document.createElement('button');
  b.className = 'tab'; b.textContent = n; b.setAttribute('role', 'tab');
  b.onclick = () => show(n); tabs.appendChild(b);
});
show('JavaScript');

document.getElementById('theme').onclick = () => {
  const r = document.documentElement, dark = getComputedStyle(r).getPropertyValue('--bg').trim() === '#141414';
  r.setAttribute('data-theme', dark ? 'light' : 'dark');
};

// Hamburger nav toggle
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  });

  // Close menu when any nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open navigation menu');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open navigation menu');
    }
  });
}

// Scroll-reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
