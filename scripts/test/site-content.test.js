// What the build lets through from the PT7 Academy database (scripts/site-content.js): run with `npm run content:test`
import test from 'node:test';
import assert from 'node:assert/strict';
import sanitizeHtml from 'sanitize-html';
import { rules } from '../site-content.js';

const clean = (html) => sanitizeHtml(html, rules.BLOG_HTML);

test('keeps what the posts use today', () => {
  const html =
    '<h2>Prices</h2><p><strong>Small</strong> <em>groups</em><sup><a href="#ref-1">1</a></sup></p>' +
    '<div class="blog-table-wrap"><table class="blog-table"><thead><tr><th>A</th></tr></thead><tbody><tr><td>B</td></tr></tbody></table></div>' +
    '<ol class="blog-refs"><li id="ref-1"><a href="https://example.org/" target="_blank" rel="noopener noreferrer">Source</a></li></ol>' +
    '<img src="/assets/images/studio.webp" alt="" width="80" height="80" loading="lazy" decoding="async" />' +
    '<p><a href="/pricing/">Pricing</a> <a href="mailto:info@pt7.nl">Mail</a></p>';
  assert.equal(clean(html), html);
});

test('drops script, handlers, styles and frames', () => {
  assert.equal(clean('<p onclick="x()" style="color:red">a</p><script>alert(1)</script><iframe src="https://x"></iframe>'), '<p>a</p>');
  assert.equal(clean('<svg><script>alert(1)</script></svg><style>p{}</style>'), '');
});

test('drops dangerous links and images from elsewhere', () => {
  assert.equal(clean('<a href="javascript:alert(1)">x</a>'), '<a>x</a>');
  assert.equal(clean('<a href="jav&#x61;script:alert(1)">x</a>'), '<a>x</a>');
  assert.equal(clean('<a href="//evil.example/">x</a>'), '<a>x</a>');
  assert.equal(clean('<a href="data:text/html,x">x</a>'), '<a>x</a>');
  assert.equal(clean('<img src="https://evil.example/x.png" />'), '');
  assert.equal(clean('<img src="/api/site-auth/logout" />'), '');
  assert.equal(clean('<img src="data:image/png;base64,AAAA" />'), '');
});

test('only known ids, classes and targets', () => {
  assert.equal(clean('<p id="pt7Config" class="blog-callout navbar">a</p>'), '<p class="blog-callout">a</p>');
  assert.equal(clean('<a href="/x/" target="_top">x</a>'), '<a href="/x/">x</a>');
});

test('slugs and image file names', () => {
  for (const ok of ['elif', 'pilates-for-men', 'reformer-2026']) assert.match(ok, rules.SLUG);
  for (const bad of ['../x', 'a/b', 'A', 'a--b', '-a', 'a"<', '']) assert.doesNotMatch(bad, rules.SLUG);
  assert.match('/assets/images/studio.webp', rules.SITE_IMAGE);
  assert.doesNotMatch('/assets/images/../x.webp', /^\/assets\/images\/[A-Za-z0-9_-][A-Za-z0-9._-]*$/);
  assert.deepEqual(rules.IMAGE_TYPES['image/png'], ['.png']);
});
