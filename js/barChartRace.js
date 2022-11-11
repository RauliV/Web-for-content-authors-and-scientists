/**
 * d3 utility for constructing the barchart race chart as svg
 */

 const initSVG = values => {
  const { width, height, svgSubtitle, svgTitle, source, svgSelector } = values;

  // Select the div where the svg will be drawn
  const svg = d3
    .select(svgSelector)
    .append('svg')
    .attr('height', height)
    .attr('width', width);

  // Create and add title instance
  svg
    .append('text')
    .attr('class', 'title')
    .attr('y', 24)
    .html(svgTitle);

  // Create and add subtitle instance
  svg
    .append('text')
    .attr('class', 'subTitle')
    .attr('y', 55)
    .html(svgSubtitle);

  // Create and add source instance
  svg
    .append('text')
    .attr('class', 'caption')
    .attr('x', width)
    .attr('y', height - 5)
    .style('text-anchor', 'end')
    .html(`Source: ${source}`);

  return svg;
};

const loadData = filepath => {
  // Fetch data from csv file
  return d3
    .csv(filepath)
    .then(data => data)
    .catch(err => console.error(err, 'error on load data'));
};

const formatData = data => {
  // convert number values from string to number
  // And colour to each element
  // Set default value for value property of element
  const formatedData = data.map(d => {
    d.value = +d.value;
    d.lastValue = +d.lastValue;
    d.value = isNaN(d.value) ? 0 : d.value;
    d.year = +d.year;
    d.colour = d3.hsl(Math.random() * 360, 0.75, 0.75);
    return d;
  });

  // const currentYearDataSet = filterData(data);
  return formatedData;
};

const filterData = values => {
  const { formattedData, year, compareCount } = values;
  // Initial elements to be drawn on start
  // filter the filter the elements with valid value
  // sort the elements in descending order by value
  // select the first TOP_N elements
  const filteredData = formattedData
    .filter(d => parseInt(d.year, 10) === parseInt(year, 10) && d.value)
    .sort((a, b) => b.value - a.value)
    .slice(0, compareCount);

  // set the rank by index
  // filterData.forEach((d, i) => (d.rank = i));

  // set the rank by index
  return filteredData.map((d, i) => {
    d.rank = i;
    return d;
  });
};

const setCoord = values => {
  const { currentYearDataSet, compareCount, margin, width, height } = values;

  // Init the x coordinate to start the drawing within the svg canvas
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(currentYearDataSet, d => d.value)])
    .range([margin.left, width - margin.right - 65]);

  // Init the y coordinate to start the drawing within the svg canvas
  const y = d3
    .scaleLinear()
    .domain([compareCount, 0])
    .range([height - margin.bottom, margin.top]);

  // Init the xAxis with the labels of the progress
  const xAxis = d3
    .axisTop()
    .scale(x) // Set the scale for the x-axis label [min-max]
    .ticks(width > 500 ? 5 : 2) // Set the number of labels within scale
    .tickSize(-(height - margin.top - margin.bottom))
    .tickFormat(d => d3.format(',')(d));

  return [x, y, xAxis];
};

const halo = function (text, strokeWidth) {
  text
    .select(function () {
      return this.parentNode.insertBefore(this.cloneNode(true), this);
    })
    .style('fill', '#ffffff')
    .style('stroke', '#ffffff')
    .style('stroke-width', strokeWidth)
    .style('stroke-linejoin', 'round')
    .style('opacity', 1);
};

const drawInitState = values => {
  const {svg, currentYearDataSet, startYear, margin, barPadding, xAxis, width, height, x, y} = values;

  // Draw the frame of the canvas without the bar chart
  svg.append('g')
    .attr('class', 'axis xAxis')
    .attr('transform', `translate(0, ${margin.top})`)
    .call(xAxis)
    .selectAll('.tick line')
    .classed('origin', d => parseInt(d) === 0);

  // Draw the initial bars (first state) above the frame
  svg.selectAll('rect.bar')
    .data(currentYearDataSet, d => d.name)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', x(0) + 1)
    .attr('width', d => x(d.value) - x(0) - 1)
    .attr('y', d => y(d.rank) + 5)
    .attr('height', y(1) - y(0) - barPadding)
    .style('fill', d => d.colour);

  // Add the text (name) of the bars (first state) above the initial bars
  svg.selectAll('text.label')
    .data(currentYearDataSet, d => d.name)
    .enter().append('text')
    .attr('class', 'label')
    .attr('x', d => x(d.value) - 8)
    .attr('y', d => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
    .style('text-anchor', 'end')
    .html(d => d.name);

  // Add the text (value) of the bars (first state) in front of the bars, above the Frame
  svg.selectAll('text.valueLabel')
    .data(currentYearDataSet, d => d.name)
    .enter().append('text')
    .attr('class', 'valueLabel')
    .attr('x', d => x(d.value) + 5)
    .attr('y', d => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
    .text(d => d3.format(',.0f')(d.lastValue));

  // Add current year caption to svg frame
  const periodLabel = svg.append('text').attr('class', 'yearText')
    .attr('x', width - margin.right)
    .attr('y', height - 25)
    .style('text-anchor', 'end')
    .html(~~startYear).call(halo, 10);

  return periodLabel;
};

const updateCoods = values => {
  const { svg, currentYearDataSet, tickDuration, xAxis, x } = values;

  // Set the domain range [0 - maxValue ]
  x.domain([0, d3.max(currentYearDataSet, d => d.value)]);

  // Update the xAxis label
  svg
    .select('.xAxis')
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .call(xAxis);
  return [x, svg];
};

const updateBars = values => {
  const {
    svg,
    currentYearDataSet,
    compareCount,
    tickDuration,
    x,
    y,
    barPadding
  } = values;

  // selects and create new data array from the new array
  const bars = svg.selectAll('.bar').data(currentYearDataSet, d => d.name);

  // Setup and add new bars in array to the chart
  bars
    .enter()
    .append('rect')
    .attr('class', d => `bar ${d.name.replace(/\s/g, '_')}`)
    .attr('x', x(0) + 1)
    .attr('width', d => x(d.value) - x(0) - 1)
    .attr('y', _d => y(compareCount + 1) + 5)
    .attr('height', y(1) - y(0) - barPadding)
    .style('fill', d => d.colour)
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('y', d => y(d.rank) + 5);

  // Update existing bars in array
  bars
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('width', d => x(d.value) - x(0) - 1)
    .attr('y', d => y(d.rank) + 5);

  // Remove bars that are not in array
  bars
    .exit()
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('width', d => x(d.value) - x(0) - 1)
    .attr('y', _d => y(compareCount + 1) + 5)
    .remove();

  return svg;
};

const updateLabels = values => {
  const { svg, currentYearDataSet, tickDuration, compareCount, x, y } = values;

  // selects and create new bar title label array from the new array
  const labels = svg.selectAll('.label').data(currentYearDataSet, d => d.name);

  // Setup and add new bar title label in array to the chart
  labels
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => x(d.value) - 8)
    .attr('y', _d => y(compareCount + 1) + 5 + (y(1) - y(0)) / 2)
    .style('text-anchor', 'end')
    .html(d => d.name)
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('y', d => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1);

  // Update existing bar title label in array to the chart
  labels
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('x', d => x(d.value) - 8)
    .attr('y', d => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1);

  // Delete bar title label not in array to the chart
  labels
    .exit()
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('x', d => x(d.value) - 8)
    .attr('y', _d => y(compareCount + 1) + 5)
    .remove();
  return svg;
};

const updateLabelValue = values => {
  const { svg, currentYearDataSet, tickDuration, compareCount, x, y } = values;
  // Selects and create new bar title label array from the new array
  const valueLabels = svg
    .selectAll('.valueLabel')
    .data(currentYearDataSet, d => d.name);

  // Setup and add new bar subtitle label in array to the chart
  valueLabels
    .enter()
    .append('text')
    .attr('class', 'valueLabel')
    .attr('x', d => x(d.value) + 5)
    .attr('y', _d => y(compareCount + 1) + 5)
    .text(d => d3.format(',.0f')(d.lastValue))
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('y', d => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1);

  // Update existing bar subtitle label in array to the chart
  valueLabels
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('x', d => x(d.value) + 5)
    .attr('y', d => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
    .tween('text', function (d) {
      const i = d3.interpolateRound(d.lastValue, d.value);
      return function (t) {
        this.textContent = d3.format(',')(i(t));
      };
    });

  // Delete bar subtitle label not in array to the chart
  valueLabels
    .exit()
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('x', d => x(d.value) + 5)
    .attr('y', _d => y(compareCount + 1) + 5)
    .remove();

  return svg;
};

const updatePeriodLabel = values => {
  const { periodLabel, year } = values;
  // Update the year label
  periodLabel.html(~~year);
};

const updateSvg = values => {
  const { svg, formattedData, year, tickDuration, compareCount, xAxis, x, y, barPadding, periodLabel } = values;

  const currentYearDataSet = filterData({ formattedData, year, compareCount });
  updateCoods({ svg, currentYearDataSet, tickDuration, xAxis, x });

  updateBars({ svg, currentYearDataSet, compareCount, tickDuration, x, y, barPadding });

  updateLabels({ svg, currentYearDataSet, compareCount, tickDuration, x, y });

  updateLabelValue({ svg, currentYearDataSet, compareCount, tickDuration, x, y });
  updatePeriodLabel({ periodLabel, year });
  return svg;
};

const startBCR = (values = {}) => {
  // Feel free to change or delete any of the code you see in this editor!

  const height = 600;
  const width = 960;

  const { tickDuration = 500, compareCount = 12, svgTitle = 'Bar Chart Race Title', svgSubtitle = 'Bar Chart Race SubTitle', source = 'Source', startYear = 2000, stopYear = 2018, interval = 0.1,
    // url, //= './static/data/brand_values.csv',
    data = [], svgSelector = '#bar-chart-race'} = values;

  const margin = { top: 80, right: 0, bottom: 5, left: 0 };

  const barPadding = (height - (margin.bottom + margin.top)) / (compareCount * 5);

  const svg = initSVG({ width, height, svgSelector, svgTitle, svgSubtitle, source });

  // Use prepared array data or fetch from url
  // const data = dataArray.length > 0 ? dataArray : await loadData(url);

  let year = startYear;
  const formattedData = formatData(data);
  const currentYearDataSet = filterData({ formattedData, year, compareCount });
  const [x, y, xAxis] = setCoord({ currentYearDataSet, compareCount, margin, width, height });

  const periodLabel = drawInitState({ svg, currentYearDataSet, startYear, margin, barPadding, xAxis, width, height, x, y
  });
  year += interval;

  // start interval to update frame
  const ticker = d3.interval(_e => {
    updateSvg({ svg, formattedData, year, tickDuration, compareCount, xAxis, x, y, barPadding, periodLabel
    });

    // Stop timer when reached END_YEAR
    if (parseInt(year, 10) === parseInt(stopYear)) ticker.stop();
    year = d3.format('.1f')(+year + interval);
  }, tickDuration);
};
