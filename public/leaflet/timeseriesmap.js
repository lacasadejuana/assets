const colors = new Array("#e0f7ff", "#b6e2ff", "#87c4ff", "#5d9eff", "#007bff");

// -- GET FILES -- //
let gbCounts = "https://brycetreats-rsh.github.io/osu_greenbook_filehost/county_gb_counts_oneyear.json";
let anotherSource = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
let countyGeoFile = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let gbCountsData;
let countyGeoData;

// -- LOAD MAP -- //
let map = d3.select('#map');

let drawMap = () => {

    var colorScale = d3
        .scaleThreshold()
        .domain([0, 10, 30, 100, 220])
        .range(colors);


    map.selectAll('path')
        .data(countyGeoData.features)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr("stroke", "#333")
        .attr('class', 'county')
        .attr("fill", (d, i) => { //d is a county data item
            //get ID of current data element
            let currentID = d.id;
            // console.log(i, currentID)
            //find education that matches id
            let county = gbCountsData.find((item) => {
                if (item.fips === currentID) {
                    // console.log(item.state)
                    return item;
                }
            });

            return colorScale(county.yearninteenthirtyeight);
        });
};

// -- LOAD MAP DATA -- //
d3.json(gbCounts).then(
    (data, error) => {
        if (error) {
            console.log(error);
        } else {
            // if no error, load data
            gbCountsData = data;
            console.log(gbCountsData);

            // load map after data is loaded
            d3.json(countyGeoFile).then(
                (data, error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        // if no error, load data
                        countyGeoData = topojson.feature(data, data.objects.counties);
                        drawMap();

                    }
                }
            );
        }
    }
);