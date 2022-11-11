describe('Sociogram', function () {
  const authors = [
    'Sergey Zykov',
    'Alexander Sobolev',
    'Robert Pergl',
    'Lukás Janecek',
    "Paul O'Shannessy",
    'Dave Smith',
    'Terry Coatta',
    'Pete Hunt',
    'Frank Hess',
    'Simone Huber',
    'Martin Haag',
    'Jörn Heid',
    'Zhichun Li',
    'Vaibhav Rastogi',
    'Yan Chen 0004',
    'Yinzhi Cao',
    'Adam Abrons',
    'Misko Hevery',
    'javascript%20functional'
  ];

  it('must contain d3 sociogram as an svg element', function () {
    const svg = document.querySelector('svg');
    chai.expect(svg).to.not.be.null;
  });

  it(`must contain ${authors.length} nodes`, function () {
    const textElems = document.querySelectorAll('svg>g>text');
    const l = textElems ? textElems.length : 0;
    chai.expect(l).to.equal(authors.length);
  });

  it('must contain selected authors', function () {
    const textElems = document.querySelectorAll('svg>g>text');
    const arr = Array.from(textElems).map(e => e.textContent);
    const filtered = arr.filter(a => authors.includes(a));
    let feedback = '';
    feedback +=
      filtered.length == authors.length
        ? `All ${authors.length} authors found:\n  ${authors}`
        : `Expected: ${authors}\n
     Got:      ${filtered}\n`;
    chai.assert(filtered.length == authors.length, feedback);
  });
});
