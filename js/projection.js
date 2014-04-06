(function($) {

Drupal.behaviors.d3Projection = {
  attach: function (context) {
    var data = Drupal.settings.d3Projection.mapData;
    var topoPath = Drupal.settings.d3Projection.pathToTopo;
    console.log(data);
    console.log(topoPath);

    var width = 960,
        height = 500;

    var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    d3.json(topoPath, function(error, us) {
        var zoom = d3.behavior.zoom()
            .translate([0,0])
            .scale(1)
            .scaleExtent([1,10])
            .on("zoom", zoomed);

        var svg = d3.select("map").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(zoom);

        var features = svg.append("g");

        var div = d3.select("map").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        features.insert("path", ".graticule")
            .datum(topojson.feature(us, us.objects.land))
            .attr("class", "land")
            .attr("d", path);

        features.insert("path", ".graticule")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "state-boundary")
            .attr("d", path);

        var pin = features.selectAll("image")
                  .data(data)
                  .enter()
                  .append("svg:image")
                  .attr("xlink:href", "pin.png")
                  .attr("class", "pin")
                  .attr("width", 16)
                  .attr("height", 18)
                  .attr("transform", transform)
                  .on("mouseover", function(d) {
                    var mousePos = d3.mouse(svg.node());
                    console.log(mousePos);
                    div.transition(200)
                      .duration(200)
                      .style("opacity", .9);
                    div.html(d.city + ', ' + d.state)
                      .style("left", (mousePos[0] + 25) + "px")
                      .style("top", (mousePos[1]) + "px");
                  })
                  .on("mouseout", function(d) {
                    div.transition()
                      .duration(500)
                      .style("opacity", 0);
                  });

        function zoomed() {
          features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
          features.select(".land")
                  .style("stroke-width", 1.5 / d3.event.scale + "px");
          features.select(".state-boundary")
                  .style("stroke-width", .5 / d3.event.scale + "px");
          pin.attr("width", 16 / d3.event.scale)
              .attr("height", 18 / d3.event.scale)
              .attr("transform", function(d) {
                  coords = [+(-d.lon), +d.lat];
                  var position = projection(coords);
                  d.position.x = position[0] - (8 / d3.event.scale);
                  d.position.y = position[1] - (18 / d3.event.scale);
                  return "translate(" + d.position.x + "," + d.position.y + ")";
              });
        }

        function transform(d) {
          coords = [+(-d.lon), +d.lat];
          d.position = projection(coords);
          return "translate(" + (d.position[0] - 8) + "," + (d.position[1]-18) + ")";
        }
    });

    d3.select(self.frameElement).style("height", height + "px");
  }
};

}(jQuery));
