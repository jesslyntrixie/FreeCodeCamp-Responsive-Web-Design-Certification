d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").then(json => {
    const data = json.monthlyVariance;
    const baseTemp = json.baseTemperature;

    const margin = {top: 20, right: 30, bottom: 100, left: 60};
    const width = 1300 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const tooltip = d3.select("body")
                        .append("div")
                        .attr("id", "tooltip")
                        .style("position", "absolute")
                        .style("opacity", 0)
                        .style("background", "#ffffff")
                        .style("border", "1px solid #ccc")
                        .style("padding", "6px 10px")
                        .style("border-radius", "4px")
                        .style("font-size", "12px")
                        .style("pointer-events", "none");


    const svg = d3.select("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")    //group untuk chartnya, digeser (transform)
                  .attr("transform", `translate(${margin.left}, ${margin.top})`);
                  // ukuran svg = width+margin x height+margin, chartnya digeser kebawah dan ke kanan dikit sesuai margin

    const years = [...new Set(data.map(d=> d.year))];
    const months = d3.range(1,13);

    const cellWidth = width / years.length;
    const cellHeight = height / months.length;

    // Color scale (base + variance)
    const tempExtent = d3.extent(data, d => baseTemp + d.variance);  // returns an array [min, max]
    const colorScale = d3.scaleSequential().domain(tempExtent.reverse()).interpolator(d3.interpolateRdYlBu);

    // X scale (years)
    const xScale = d3.scaleBand().domain(years).range([0, width])  // untuk convert numerik jadi skala
    
    // Y scale (months)
    const yScale = d3.scaleBand().domain(months).range([0, height]);

    // Draw Heatmap cells
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.year))
        .attr("y", d => yScale(d.month))
        .attr("data-temp", d => d.variance)
        .attr("data-month", d => d.month-1)
        .attr("data-year", d => d.year)
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .attr("fill", d => colorScale(baseTemp + d.variance))
        .attr("class", "cell")
        .on("mouseover", function(event, d) {
            tooltip.style("opacity", 1)
                .html(`
                    <strong>${d.year} - ${d3.timeFormat("%B")(new Date(0, d.month - 1))}</strong><br/>
                    Temp: ${(baseTemp + d.variance).toFixed(2)}°C<br/>
                    Variance: ${d.variance.toFixed(2)}°C
                `)
                .attr("data-year", d.year);
        })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        });

    // Add Axes
    const xAxis = d3.axisBottom(xScale).tickValues(years.filter(y => y % 10 === 0));
    const yAxis = d3.axisLeft(yScale).tickFormat(m => d3.timeFormat("%B")(new Date(2000, m-1)));

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .attr("id", "x-axis")
        .call(xAxis);
    svg.append("g").call(yAxis).attr("id", "y-axis");
    
    console.log("Data loaded:", data);

    // Legend config
    const legendWidth = 400;
    const legendHeight = 20;

    // Use 5 discrete colors (can use more)
    const legendColors = d3.schemeRdYlBu[5].reverse();

    // Threshold scale: temperature -> color bins
    const legendThreshold = d3.scaleThreshold()
    .domain(
        d3.range(
        tempExtent[0],
        tempExtent[1],
        (tempExtent[1] - tempExtent[0]) / legendColors.length
        )
    )
    .range(legendColors);

    // Linear scale to position the rects in the legend
    const legendX = d3.scaleLinear()
    .domain(tempExtent)
    .range([0, legendWidth]);

    // Create <g> for the legend and position it under the chart
    const legend = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${(width - legendWidth) / 2}, ${height + 40})`);

    // Draw the colored rects
    legend.selectAll("rect")
    .data(legendThreshold.range().map(color => {
        const [x0, x1] = legendThreshold.invertExtent(color);
        return {
        color,
        x0: x0 ?? tempExtent[0],
        x1: x1 ?? tempExtent[1]
        };
    }))
    .enter()
    .append("rect")
    .attr("x", d => legendX(d.x0))
    .attr("y", 0)
    .attr("width", d => legendX(d.x1) - legendX(d.x0))
    .attr("height", legendHeight)
    .style("fill", d => d.color);

    // Add ticks below the legend
    const legendAxis = d3.axisBottom(legendX)
    .tickSize(6)
    .tickValues(legendThreshold.domain())
    .tickFormat(d3.format(".1f"));  // e.g. 5.5, 6.7

    legend.append("g")
    .attr("transform", `translate(0, ${legendHeight})`)
    .call(legendAxis);

});