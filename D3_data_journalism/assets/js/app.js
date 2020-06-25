// @TODO: YOUR CODE HERE!

//Read our data


//Create a responsive SVG area and the space for the chart
function responsivesvg() {

    function defaultchart(){
        //select, create, svg area
        var svgArea = d3.select("#scatter").select("svg")
        //Make sure the area is empty 
        if (!svgArea.empty()) {
            svgArea.remove();
        }

        //Define the sizes of our svg charte
        var svgHeight = window.innerHeight;
        var svgWidth = window.innerWidth;

        //Margin
        var chartMargin = {
            top: 30,
            right: 30,
            bottom: 30,
            left: 30,
        }

        // Space for our chart
        var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
        var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

        //Create the SVG with the given sizes
        var svg = d3
            .select("#scatter")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);

        //Lets group the chart figures with a g element
        var chartGroup = svg.append("g")
            .attr("transform", `translate (${chartMargin.left}, ${chartMargin.top})`)


        d3.csv("assets/data/data.csv").then(function(healthdata){
            console.log(healthdata);

        //define scales towards the data 
            var scaleY = d3.scaleLinear()
                .domain(d3.extent(healthdata, d => d.age))
                .range([0, svgHeight]);

            var scaleX = d3.scaleLinear()
                .domain(d3.extent(healthdata, d => d.smokes))
                .range([0, svgWidth]);

        //Create axis
            
            var Yaxis = d3.axisLeft(scaleY);
            var Xaxis = d3.axisRight(scaleX);

        //Appen the axis
       // append x axis
        chartGroup.append("g")
            .classed("x-axis", true)
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(Xaxis);

            // append y axis
        chartGroup.append("g")
            .call(Yaxis);



        //Add the svg circles 
            chartGroup.selectAll("circle")
                .data(healthdata)
                .enter()
                .append("circle")
                .attr("cx", d => scaleX(d.smokes))
                .attr("cy", d => scaleY(d.age))
                .attr("r", 5)
                .attr("fill", "purple")
    
        });
    }
    
    //run the sizes
    defaultchart();
    //run the data
  

}

//Run the svg once the page is open
responsivesvg();

//But also run all again once the window is resized
d3.select(window).on("resize", responsivesvg)



