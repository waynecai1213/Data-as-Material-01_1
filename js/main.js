
var dateArray = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday'];

var dateScale = d3.scalePoint()
.domain(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday'])
.range([0, 840]);

var activityScale = d3.scaleQuantize()
.domain([1, 8])
.range(['#31597A', '#C96579', '#E6AA75', '#E5E197','#EDC0DB','#31DBC7','#A7C199','#ffe74c']);

var tempScale = d3.scaleOrdinal()
.domain(['hot', 'warm', 'room temp', 'cool', 'cold'])
.range(['#F7918D', '#F7D6E0', '#B3BEFF', '#B2F7EF','#2A88C1']);


var durationScale = d3.scaleThreshold()
  .domain([2, 6, 11, 31, 61])
  .range([5, 20,40, 60 ,80,100]);
// u < 2 is mapped to ‘#ccc’
// 2 ≤ u < 6 to ‘lightblue’
// 6 ≤ u < 11 to ‘orange’


var symbolTypes = ['symbolCircle', 'symbolCross', 'symbolDiamond', 'symbolSquare', 'symbolStar', 'symbolTriangle', 'symbolWye'];

var typeScale = d3.scalePoint()
.domain(['liquid','snack','staple','main course','mix','fruit','something unexcepted'])
.range([0, symbolTypes.length - 1]);
// symbolTypes[typeScale('liquid')];


var petalPath = "M 0,0 C -10,-10 -10,-40 0,-50 C 10,-40 10,-10 0,0" ;


function drawWithData(data){
  console.log(data);
  const mySymbol = d3.select('svg')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .classed('myShape',true)
    .attr('transform', (d,i) => 'translate('+ dateScale(d.Date) + ',0)');
    // .classed(data.Temperature,true)
    // .classed('hot',(d)=> d.Temperature==='hot')
    // .classed('warm',(d)=> d.Temperature==='warm')
    // .classed('room temp',(d)=> d.Temperature==='room temp')
    // .classed('cool',(d)=> d.Temperature==='cool')
    // .classed('cold',(d)=> d.Temperature==='cold')  
    // .attr('r', 10)
    // .attr('transform', (d,i) => 'translate('+ dateScale(d.Date) + ',' + i*30 +')');
  

    //Format symbol by date
    dateArray.forEach( 
      element => 
    mySymbol.filter( d => d.Date===element)
            .attr('transform', (d,i) => 'translate('+ dateScale(d.Date) + ',' + i*36 +')') 
    );





    // Acitivity - Line Color
    mySymbol.append('path')
    .classed('activity',true)
    .attr('fill', d => activityScale(d.Activity));

    // Type - Shape
    // Temperature - Shape Color
    var symbolGenerator = d3.symbol().size(80);
  
    mySymbol.append('path')
    .classed('temp type',true)
    .attr('d', function(d) {
      symbolGenerator
        .type(d3[symbolTypes[typeScale(d.Type)]]);
      return symbolGenerator();
    })
    .attr('fill', d => tempScale(d.Temperature));


}

d3.csv("/materials/ThingsIAte-v2.csv",drawWithData);

// console.log(myData);

//day scale to x position


  // console.log(dayScale(myData.Date));
  // console.log(dayScale('Tuesday'));





d3.selectAll('circle')
  .on('mouseover', function(d, i) {
    d3.select('.status')
      .text('You clicked on circle ' + i);
     d3.select(this)
     .style('fill', 'orange')
     .attr('transform-origin','center')
     .attr('transform', 'scale(2)');
  })
  .on('mouseout', function(d, i) {
    d3.select('.status')
      .text('You clicked on circle ' + i);
     d3.select(this)
     .style('fill', 'blue')
     .attr('transform-origin','center')
     .attr('transform', 'scale(1)');
  });

 