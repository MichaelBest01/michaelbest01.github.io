function QuadsKeepr(settings){"use strict";var version="1.0",quadrants,columns,num_quads,num_rows,num_cols,screen_width,screen_height,quad_width,quad_height,tolerance,delx,out_difference,leftmost,rightmost,thing_left,thing_top,thing_right,thing_bottom,thing_num_quads,thing_max_quads,thing_quadrants,onUpdate,onCollide;this.getQuadrants=function(){return quadrants;}
this.getNumQuads=function(){return num_quads;}
this.getNumRows=function(){return num_rows;}
this.getNumCols=function(){return num_cols;}
this.getQuadWidth=function(){return quad_width;}
this.getQuadHeight=function(){return quad_height;}
this.getDelX=function(){return delx;}
this.getOutDifference=function(){return out_difference;}
var resetQuadrants=this.resetQuadrants=function resetQuadrants(){quadrants.length=0;columns.length=0;for(var i=0;i<num_cols;++i)
addQuadCol((i-2)*quad_width);leftmost=quadrants[0];}
function Quadrant(row,left){this.left=left;this.top=(row-1)*quad_height;this.right=this.left+quad_width;this.bottom=this.top+quad_height;this.things=[];this.numobjects=this.tolx=this.toly=0;}
this.updateQuadrants=function(xdiff){xdiff=xdiff||0;out_difference+=xdiff;while(leftmost.left<=delx){shiftQuadCol();addQuadCol(rightmost.right);if(onUpdate)
onUpdate();}}
function addQuadCol(xloc){var column=[];for(var i=0;i<num_rows;++i){rightmost=new Quadrant(i,xloc);column.push(rightmost);quadrants.push(rightmost);}
columns.push(column);}
function shiftQuadCol(){columns.shift();for(var i=0;i<num_rows;++i)
quadrants.shift();leftmost=quadrants[0];out_difference=quad_width;}
this.determineAllQuadrants=function(){var i,len;for(i=0;i<num_quads;++i)
quadrants[i].numthings=0;for(i=0,len=arguments.length;i<len;++i)
determineThingArrayQuadrants(arguments[i]);}
function determineThingArrayQuadrants(things){for(var i=0,len=things.length;i<len;++i)
determineThingQuadrants(things[i]);}
var determineThingQuadrants=this.determineThingQuadrants=function(thing){thing[thing_num_quads]=0;for(var i=0;i<num_quads;++i)
if(thingInQuadrant(thing,quadrants[i])){setThingInQuadrant(thing,quadrants[i],i);if(thing[thing_num_quads]>thing[thing_max_quads])
return;}}
function setThingInQuadrant(thing,quadrant,num_quad){thing[thing_quadrants][thing[thing_num_quads]]=quadrant;++thing[thing_num_quads];quadrant.things[quadrant.numthings]=thing;++quadrant.numthings;}
function thingInQuadrant(thing,quadrant){return thing[thing_right]+tolerance>=quadrant.left&&thing[thing_left]-tolerance<=quadrant.right&&thing[thing_bottom]+tolerance>=quadrant.top&&thing[thing_top]-tolerance<=quadrant.bottom;}
function reset(settings){quadrants=[];columns=[];num_quads=settings.num_quads;num_rows=settings.num_rows;num_cols=settings.num_cols;if(num_quads){if(num_rows)num_cols=num_quads/num_rows;if(num_cols)num_rows=num_quads/num_cols;}
else{if(!num_rows)num_rows=2;if(!num_cols)num_cols=2;num_quads=num_rows*num_cols;}
screen_width=settings.screen_width||640;screen_height=settings.screen_height||480;quad_width=screen_width/(num_cols-3);quad_height=screen_height/(num_rows-2);tolerance=settings.tolerance||0;delx=settings.delx||quad_width*-2;out_difference=quad_width;thing_left=settings.thing_left||"left";thing_right=settings.thing_right||"right";thing_top=settings.thing_top||"top";thing_bottom=settings.thing_bottom||"bottom";thing_num_quads=settings.thing_num_quads||"numquads";thing_max_quads=settings.thing_max_quads||"maxquads";thing_quadrants=settings.thing_quadrants||"quadrants";onUpdate=settings.onUpdate;onCollide=settings.onCollide;resetQuadrants();}
reset(settings||{});}