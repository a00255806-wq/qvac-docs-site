// Fetch and render data from JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const app = document.getElementById('app');
    const site = data.site;
    const sections = data.sections;

    // Render each section
    sections.forEach(section => {
      const sectionEl = document.createElement('section');
      sectionEl.className = 'section';
      sectionEl.id = section.id;

      // Section header
      let html = `<div class="section-intro">`;
      if (section.id !== 'intro') {
        html += `<p class="eyebrow">${section.title.toUpperCase()}</p>`;
      }
      if (section.description) {
        html += `<h2>${section.title}</h2><p>${section.description}</p>`;
      } else if (section.content) {
        html += `<h2>${section.title}</h2><p>${section.content}</p>`;
      } else {
        html += `<h2>${section.title}</h2>`;
      }
      html += `</div>`;

      // Installation subsections
      if (section.subsections) {
        html += `<div class="installation">`;
        section.subsections.forEach(subsection => {
          html += `
            <div class="install-card">
              <h4>${subsection.title}</h4>
              ${subsection.content ? `<p>${subsection.content}</p>` : ''}
              ${subsection.code ? `<pre><code>${escapeHtml(subsection.code)}</code></pre>` : ''}
            </div>
          `;
        });
        html += `</div>`;
      }

      // Code example
      if (section.code) {
        html += `<pre><code>${escapeHtml(section.code)}</code></pre>`;
      }

      // Features grid
      if (section.items) {
        html += `<div class="features-grid">`;
        section.items.forEach(item => {
          html += `
            <div class="feature-item">
              <h4>${item.name}</h4>
              <p>${item.description}</p>
            </div>
          `;
        });
        html += `</div>`;
      }

      // Examples
      if (section.examples) {
        html += `<div class="examples">`;
        section.examples.forEach(example => {
          html += `
            <div class="example">
              <h4>${example.title}</h4>
              <div class="lang">${example.language}</div>
              <pre><code>${escapeHtml(example.code)}</code></pre>
            </div>
          `;
        });
        html += `</div>`;
      }

      // Resources
      if (section.links) {
        html += `<div class="resources-grid">`;
        section.links.forEach(link => {
          html += `
            <div class="resource-link">
              <h4>${link.title}</h4>
              <p>${link.description}</p>
              <a href="${link.url}" target="_blank" rel="noreferrer">Learn more →</a>
            </div>
          `;
        });
        html += `</div>`;
      }

      sectionEl.innerHTML = html;
      app.appendChild(sectionEl);
    });
  })
  .catch(error => console.error('Error loading data:', error));

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}