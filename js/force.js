function update (data, force) {
  const nodes = flatten(data);
  const links = d3.layout.tree().links(nodes);

  // Restart the force layout.
  force
    .nodes(nodes)
    .links(links)
    .start();

  // Update links
  let link = getLinks();
  link = link.data(links, function (d) {
    return d.target.id;
  });
  link.data(links, function (d) {
    return d.target.id;
  });
  link.exit().remove();
  link
    .enter()
    .insert('line', '.node')
    .attr('class', 'link');

  // Update nodes
  let node = getNodes();
  node = node.data(nodes, function (d) {
    return d.id;
  });
  node.exit().remove();

  addNodeEnter(node, force);
  node.select('circle').style('fill', color);
}

const addNodeEnter = (node, force) => {
  const nodeEnter = node
    .enter()
    .append('g')
    .attr('class', 'node')
    .on('click', click)
    .call(force.drag);

  nodeEnter.append('circle').attr('r', function (d) {
    return Math.sqrt(d.size) / 5 || 10;
  }); // first for oranges, the other for blue

  nodeEnter
    .append('text')
    .attr('dy', '.35em')
    .text(function (d) {
      return d.name;
    });
};

function tick () {
  const link = getLinks();
  link
    .attr('x1', function (d) {
      return d.source.x;
    })
    .attr('y1', function (d) {
      return d.source.y;
    })
    .attr('x2', function (d) {
      return d.target.x;
    })
    .attr('y2', function (d) {
      return d.target.y;
    });

  const node = getNodes();
  node.attr('transform', function (d) {
    return `translate(${d.x},${d.y})`;
  });
}

function color (d) {
  return d._children
    ? '#3182bd' // collapsed package
    : d.children
      ? '#c6dbef' // expanded package
      : '#fd8d3c'; // leaf node
}

// Toggle children on click.
function click (d) {
  if (d3.event.defaultPrevented) return; // ignore drag
  d.children
    ? ((d._children = d.children), (d.children = null))
    : ((d.children = d._children), (d._children = null));
}

// Returns a list of all nodes in data
function flatten (data) {
  const nodes = [];
  let i = 0;

  function recurse (node) {
    if (!node) return;
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }
  recurse(data);
  return nodes;
}

const init = (width, height) => {
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  return d3.layout
    .force()
    .linkDistance(90)
    .charge(-150)
    .gravity(0.03)
    .size([width, height])
    .on('tick', tick);
};
const getLinks = () => {
  const svg = d3.select('body').select('svg');
  return svg.selectAll('.link');
};

const getNodes = () => {
  const svg = d3.select('body').select('svg');
  return svg.selectAll('.node');
};
