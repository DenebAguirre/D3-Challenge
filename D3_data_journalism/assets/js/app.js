// @TODO: YOUR CODE HERE!

//Read our data


//Create a responsive SVG area and the space for the chart
function responsivesvg() {

    function defaultchart(){
        //Make sure the area is empty 
        var svgArea = d3.select("#scatter").select("svg")
    
        if (!svgArea.empty()) {
            svgArea.remove();
        }
  
         //Margin
        var chartMargin = {
            top: 30,
            right: 50,
            bottom: 30,
            left: 50,
        }

        //Define the sizes of our svg charte
        var svgHeight = window.innerHeight;
        var svgWidth = window.innerWidth;

      

        // Space for our chart
        var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
        var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

        //Create the SVG with the given sizes
        var svg = d3
            .select("#scatter")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);

        //Lets group the chart figures and move them to right
        var chartGroup = svg.append("g")
            .attr("transform", `translate (${chartMargin.left}, ${chartMargin.top})`)


        d3.csv("assets/data/data.csv").then(function(healthdata){
          console.log(healthdata)
          

        //I order to d3.extent to work I need to cast
            healthdata.forEach(function(data) {
                data.smokes = +data.smokes;
                data.age = +data.age;
            });


        //define scales towards the data 
            var scaleX = d3.scaleLinear()
                .domain(d3.extent(healthdata, d => d.age))
                .range([ 0, svgHeight]);

            var scaleY = d3.scaleLinear()
                .domain(d3.extent(healthdata, d => d.smokes)) 
                .range([svgWidth, 0]);
               

        //Create axis

            var Xaxis = d3.axisBottom(scaleX).ticks(10);
            var Yaxis = d3.axisLeft(scaleY).ticks(10);
            
       // append axis
            chartGroup.append("g")
                .classed("x-axis", true)
                .attr("transform", `translate(0, ${chartHeight})`)
                .call(Xaxis);

            chartGroup.append("g")
                .call(Yaxis);

        // append axis text
            chartGroup.append("text")
                .attr("transform", `translate(${chartWidth/2}, ${chartHeight + chartMargin.top +20})`)
                .attr("stroke", "black")
                .text("Age(Median)")

            chartGroup.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", chartMargin.right)
                .attr("y", chartHeight/2)
                .attr("stroke", "black")
                .text("Smokes(%)")

            
        //Add the svg circles 
            var circles = chartGroup.selectAll("circle");

            circles.data(healthdata)
                .enter()
                .append("circle")
                .attr("cx", d => scaleX(d.age))
                .attr("cy", d => scaleY(d.smokes))
                .attr("r", 10)
                .attr("fill", "purple")
            //add text
            circles.data(healthdata)
                .enter()
                .append("text")
                .attr("x", d => scaleX(d.age))
                .attr("y", d => scaleY(d.smokes))
                .attr("fill", "white")
                .attr("text-anchor", "middle")
                .attr("font-size", "8px")
                .text(d => d.abbr)
    
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



