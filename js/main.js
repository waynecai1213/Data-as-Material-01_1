
var dateArray = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday'];

var dateScale = d3.scalePoint()
.domain(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday'])
.range([60, 900]);

var activityScale = d3.scaleQuantize()
.domain([1, 8])
.range(['#31597A', '#C96579', '#E6AA75', '#E5E197','#EDC0DB','#31DBC7','#A7C199','#ffe74c']);

var tempScale = d3.scaleOrdinal()
.domain(['hot', 'warm', 'room temp', 'cool', 'cold'])
.range(['#F7918D', '#F7D6E0', '#B3BEFF', '#B2F7EF','#2A88C1']);


var durationScale = d3.scaleThreshold()
  .domain([2, 6, 11, 31, 61])
  .range([5, 10,20, 40,55,65]);
// u < 2 is mapped to ‘#ccc’
// 2 ≤ u < 6 to ‘lightblue’
// 6 ≤ u < 11 to ‘orange’


var symbolTypes = ['symbolCircle', 'symbolCross', 'symbolDiamond', 'symbolSquare', 'symbolStar', 'symbolTriangle', 'symbolWye'];

var typeScale = d3.scalePoint()
.domain(['liquid','snack','staple','main course','mix','fruit','something unexcepted'])
.range([0, symbolTypes.length - 1]);
// symbolTypes[typeScale('liquid')];

// var petalPath = "M 0,0 C -10,-10 -10,-40 0,-50 C 10,-40 10,-10 0,0" ;


    
function drawWithData(data){
  console.log(data);
  const mySymbol = d3.select('svg')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .classed('myShape',true)
    .attr('transform', (d,i) => 'translate('+ dateScale(d.Date) + ',0)' )
    ;
    // .classed(data.Temperature,true)
    // .classed('hot',(d)=> d.Temperature==='hot')
    // .classed('warm',(d)=> d.Temperature==='warm')
    // .classed('room temp',(d)=> d.Temperature==='room temp')
    // .classed('cool',(d)=> d.Temperature==='cool')
    // .classed('cold',(d)=> d.Temperature==='cold')  
    // .attr('r', 10)
    // .attr('transform', (d,i) => 'translate('+ dateScale(d.Date) + ',' + i*30 +')');
  
    // mySymbol.on('mouseenter', handleMouseOver);
    // mySymbol.on('mouseleave', handleMouseLeave);
    
    function handleMouseOver(d,i){
      d3.select(this)
      .transition()
      .attr("transform", function() {
        var str= d3.select(this).attr("transform");
        str= str.substr(0,str.indexOf("scale") );
        return str+'scale(3)'
        
      });
    }

    
    function handleMouseOver(d,i) {
      d3.select(this)
        .transition()
        .attr("transform", function() {
          var str= d3.select(this).attr("transform");
          str= str.substr(0,str.indexOf("scale") );
          return str+'scale(1)' 
        });
    };




    //Format symbol by date 
    dateArray.forEach( 
      element => 
    mySymbol.filter( d => d.Date===element)
            .attr('transform', (d,i) => 'translate('+ dateScale(d.Date) + ',' + (i*23+20) +')') 
    );


    // Cook Time - Line Length
    mySymbol.append('line')
    .style("stroke", "white")
    .style("stroke-width", 1)
    .attr("x1", -10)
    .attr("y1", 0)
    .attr("x2", d => -10- durationScale(d.CookTime))
    .attr("y2", 0); 

    // Eat Duration - Line Length ; Acitivity - Line Color 
    mySymbol.append('line')
    .style("stroke", d => activityScale(d.Activity))
    .style("stroke-width", 1)
    .attr("x1", 10)
    .attr("y1", 0)
    .attr("x2", d => 10+ durationScale(d.Duration))
    .attr("y2", 0); 


    // Type - Shape
    // Temperature - Shape Color
    var symbolGenerator = d3.symbol().size(40);
  
    mySymbol.append('path')
    .classed('temp type',true)
    .attr('d', function(d) {
      symbolGenerator
        .type(d3[symbolTypes[typeScale(d.Type)]]);
      return symbolGenerator();
    })
    .attr('fill', d => tempScale(d.Temperature));


}


// ORIGIN
d3.csv("./materials/ThingsIAte-v2.csv",drawWithData);



function openTab(evt, tabName) {
  var i, tabcontent, tablinks,targetContent;
  targetContent = document.getElementById(tabName);

  // targetContent.style.display = "block";

  tabcontent = document.getElementsByClassName("tabcontent");
 

  // tablinks = document.getElementsByClassName("tablinks");
  // for (i = 0; i < tablinks.length; i++) {
  //   tablinks[i].className = tablinks[i].className.replace(" active", "");
  // }

  // evt.currentTarget.className += " active";

  if (targetContent.style.opacity === "0") {
    for (i = 0; i < tabcontent.length; i++) {
      // tabcontent[i].style.display = "none";
      tabcontent[i].style.opacity=0;
    }
    // targetContent.style.display = "block";
    targetContent.style.opacity=1;
   
  } else {
    // targetContent.style.display = "none";
    targetContent.style.opacity=0;

  }

  
}
 