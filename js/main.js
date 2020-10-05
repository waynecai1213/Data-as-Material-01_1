
var dateArray = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

var dateScale = d3.scalePoint()
  .domain(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
  .range([60, 900]);

var activityScale = d3.scaleQuantize()
  .domain([1, 8])
  .range(['#4075A0', '#C96579', '#40DDCB', '#FFE95C', '#E6AA75', '#698F3F', '#8F6689', '#C5E1E7']);

var tempScale = d3.scaleOrdinal()
  .domain(['hot', 'warm', 'room temp', 'cool', 'cold'])
  .range(['#F7918D', '#F7D6E0', '#B3BEFF', '#7EF1E3', '#1F80FF']);


var durationScale = d3.scaleThreshold()
  .domain([2, 6, 11, 31, 61])
  .range([5, 10, 20, 40, 55, 70]);
// u < 2 is mapped to ‘#ccc’
// 2 ≤ u < 6 to ‘lightblue’
// 6 ≤ u < 11 to ‘orange’


var symbolTypes = ['symbolCircle', 'symbolCross', 'symbolDiamond','symbolTriangle',  'symbolStar', 'symbolSquare', 'symbolWye'];

var typeScale = d3.scalePoint()
  .domain(['liquid', 'snack', 'staple', 'main course', 'mix', 'fruit', 'something unexcepted'])
  .range([0, symbolTypes.length - 1]);
// symbolTypes[typeScale('liquid')];

// var petalPath = "M 0,0 C -10,-10 -10,-40 0,-50 C 10,-40 10,-10 0,0" ;


function drawWithData(data) {
  console.log(data);
  var text = d3.select('svg').selectAll("text")
    .data(dateArray)
    .enter()
    .append("text");

  text.attr("x", function(d) { return dateScale(d)-16; })
                 .attr("y", 15 )
                 .text( function (d) { return d.toUpperCase(); })
                 .attr("font-size", "8px")
                  .attr("fill", "white");


  const mySymbol = d3.select('svg')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .classed('myShape', true)
    .attr('transform', (d, i) => 'translate(' + dateScale(d.Date) + ',0)');
  // .classed(data.Temperature,true)
  // .classed('hot',(d)=> d.Temperature==='hot')
  // .classed('warm',(d)=> d.Temperature==='warm')
  // .classed('room temp',(d)=> d.Temperature==='room temp')
  // .classed('cool',(d)=> d.Temperature==='cool')
  // .classed('cold',(d)=> d.Temperature==='cold')  
  // .attr('r', 10)
  // .attr('transform', (d,i) => 'translate('+ dateScale(d.Date) + ',' + i*30 +')');


  formatSymbol();
  //Format symbol by date 
  function formatSymbol() {
    dateArray.forEach(
      element =>
        mySymbol.filter(d => d.Date === element)
          .attr('transform', (d, i) => 'translate(' + dateScale(d.Date) + ',' + (i * 22 + 30) + ')')
    );
  }

  mySymbol.on('mouseenter', handleMouseOver2);
  mySymbol.on('mouseleave', handleMouseLeave);


  // function handleMouseOver(d,i){
  //   d3.select(this)
  //   .transition()
  //   .attr("transform", function() {
  //     var str= d3.select(this).attr("transform");
  //     str= str.substr(0,str.indexOf("scale") );
  //     return str+'scale(3)'
  //   });
  // }

  function handleMouseOver2(d, i) {
    d3.select(this)
      .transition()
      .attr("transform", "translate(600,360)" + 'scale(4)');
  }



  function handleMouseLeave(d, i) {
    formatSymbol();
    // d3.select(this)
    //   .transition()
    //   .attr("transform", function() {
    //     var str= d3.select(this).attr("transform");
    //     str= str.substr(0,str.indexOf("scale") );
    //     return str+'scale(1)' 
    //   });
  };



  // Cook Time - Line Length
  mySymbol.append('line')
    .style("stroke", "white")
    .style("stroke-width", 1.6)
    .attr("x1", -8)
    .attr("y1", 0)
    .attr("x2", d => -8- durationScale(d.CookTime))
    .attr("y2", 0);

  // Eat Duration - Line Length ; Acitivity - Line Color 
  mySymbol.append('line')
    .style("stroke", d => activityScale(d.Activity))
    .style("stroke-width", 1.6)
    .attr("x1", 8)
    .attr("y1", 0)
    .attr("x2", d => 8 + durationScale(d.Duration))
    .attr("y2", 0);


  // Type - Shape
  // Temperature - Shape Color
  var symbolGenerator = d3.symbol().size(36);

  mySymbol.append('path')
    .classed('temp type', true)
    .attr('d', function (d) {
      symbolGenerator
        .type(d3[symbolTypes[typeScale(d.Type)]]);
      return symbolGenerator();
    })
    .attr('stroke', d => tempScale(d.Temperature));


}


// ORIGIN
d3.csv("./materials/ThingsIAte-v2.csv", drawWithData);



function openTab(evt, tabName) {
  var i, tabcontent, tablinks, targetContent;
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
      tabcontent[i].style.display = "none";
      tabcontent[i].style.opacity = 0;
    }
    targetContent.style.display = "block";
    targetContent.style.opacity = 1;

  } else {
    targetContent.style.display = "none";
    targetContent.style.opacity = 0;

  }

}




// image guide 
imgArray = new Array(
  "howto1.png",
  "howto2.png",
  "howto3.png"
);

baseURL = "./materials";
numImages = 3;
curImage = 1;

function imgshow(xflip) {
  curImage = curImage + xflip;
  if (curImage > numImages) { curImage = 1; }
  if (curImage == 0) { curImage = numImages; }
  d3.select('.numbertext').text(curImage + ' / 3')
  document.getElementById('howtoimg').src = baseURL + '/' + imgArray[curImage - 1];
}


