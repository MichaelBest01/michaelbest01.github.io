function followPath(obj,path,num){if(path[num]!=null&&obj[path[num]]!=null)
return followPath(obj[path[num]],path,++num);return obj;}
function clearAllTimeouts(){var id=setTimeout(function(){});while(id--)clearTimeout(id);}
function getCanvas(width,height,stylemult){var canv=createElement("canvas",{width:width,height:height});if(stylemult){stylemult=stylemult||unitsize;proliferate(canv.style,{width:(width*stylemult)+"px",height:(height*stylemult)+"px"});}
canv.getContext("2d").webkitImageSmoothingEnabled=false
return canv;}
function step(num){unpause();upkeep();pause();if(num>0)step(num-1);}
function fastforward(num){window.speed=max(0,parseInt(num||0))+1;}
function toggleFastFWD(num){if(!window.fastforwarding){fastforward(2);window.fastforwarding=true;}
else{fastforward(0);window.fastforwarding=false;}}
function specifyTimer(timerin){timer=timerin;requestAnimationFrame=function(func){window.setTimeout(func,timer);};}
function changeUnitsize(num){if(!num)return;resetUnitsize(num);function setter(arr){for(i in arr){updateSize(arr[i]);updatePosition(arr[i]);}}
setter(solids);setter(characters);}
function randTrue(num){return floor(getSeed()*((num||1)+1));}
function randSign(num){return randTrue(num)*2-1;}
function randBoolJS(num){return floor(random()*2);}
function updatePosition(me){if(!me.nomove)shiftHoriz(me,me.xvel);if(!me.nofall)shiftVert(me,me.yvel);}
function updateSize(me){me.unitwidth=me.width*unitsize;me.unitheight=me.height*unitsize;me.spritewidthpixels=me.spritewidth*unitsize;me.spriteheightpixels=me.spriteheight*unitsize;var canvas;if(canvas=me.canvas){canvas.width=me.spritewidthpixels;canvas.height=me.spriteheightpixels;refillThingCanvas(me);}}
function reduceHeight(me,dy,see){me.top+=dy;me.height-=dy/unitsize;if(see){updateSize(me);}}
function shiftBoth(me,dx,dy){if(!me.noshiftx)shiftHoriz(me,dx);if(!me.noshifty)shiftVert(me,dy);}
function shiftHoriz(me,dx){me.left+=dx;me.right+=dx;}
function shiftVert(me,dy){me.top+=dy;me.bottom+=dy;}
function setLeft(me,left){me.left=left;me.right=me.left+me.width*unitsize;}
function setRight(me,right){me.right=right;me.left=me.right-me.width*unitsize;}
function setTop(me,top){me.top=top;me.bottom=me.top+me.height*unitsize;}
function setBottom(me,bottom){me.bottom=bottom;me.top=me.bottom-me.height*unitsize;}
function setWidth(me,width,spriter,updater){me.width=width;me.unitwidth=width*unitsize;if(spriter){me.spritewidth=width;me.spritewidthpixels=width*unitsize;}
if(updater){updateSize(me);setThingSprite(me);}}
function setHeight(me,height,spriter,updater){me.height=height;me.unitheight=height*unitsize;if(spriter){me.spriteheight=height;me.spriteheightpixels=height*unitsize;}
if(updater){updateSize(me);setThingSprite(me);}}
function setSize(me,width,height,spriter,updater){if(width)setWidth(me,width,spriter);if(height)setHeight(me,height,spriter);if(updater){updateSize(me);setThingSprite(me);}}
function setMidX(me,left,see){setLeft(me,left+me.width*unitsized2,see);}
function getMidX(me){return me.left+me.width*unitsized2;}
function setMidY(me,top,see){setTop(me,top+me.height*unitsized2,see);}
function setMidXObj(me,object,see){setLeft(me,(object.left+object.width*unitsized2)-(me.width*unitsized2),see);}
function slideToXLoc(me,xloc,maxspeed,see){maxspeed=maxspeed||Infinity;var midx=getMidX(me);if(midx<xloc){shiftHoriz(me,min(maxspeed,(xloc-midx)),see);}else{shiftHoriz(me,max(-maxspeed,(xloc-midx)),see);}}
function updateLeft(me,dx){me.left+=dx;me.right=me.left+me.width*unitsize;}
function updateRight(me,dx){me.right+=dx;me.left=me.right-me.width*unitsize;}
function updateTop(me,dy){me.top+=dy;me.bottom=me.top+me.height*unitsize;}
function updateBottom(me,dy){me.bottom+=dy;me.top=me.bottom-me.height*unitsize;}
function increaseHeightTop(me,dy,spriter){me.top-=dy;me.height+=dy/unitsize;me.unitheight=me.height*unitsize;}
function determineThingCollisions(me){if(me.nocollide)return;else if(!me.resting||me.resting.yvel==0)me.resting=false;var cur,others,other,contents,i,j,leni,lenj;if(!me.skipoverlaps)checkOverlap(me);for(i=0,leni=me.numquads;i<leni;++i){cur=me.quadrants[i];others=cur.things;for(j=0,lenj=cur.numthings;j<lenj;++j){other=others[j];if(me==other)break;if(!other.alive||other.scenery||other.nocollide)continue;if(objectsTouch(me,other)&&(me.player||(!other.hidden||!(other.visual_scenery&&other.visual_scenery.hidden))||solidOnCharacter(other,me))){if(other.character)
objectsCollided(me,other);else if(!me.nocollidesolid){objectsCollided(me,other);if(!me.skipoverlaps&&!other.skipoverlaps&&characterOverlapsSolid(me,other))
me.overlaps.push(other);}}}}
if(me.undermid)me.undermid.bottomBump(me.undermid,me);else if(me.under instanceof Thing)me.under.bottomBump(me.under,me);}
function checkOverlap(me){if(me.overlapdir){if((me.overlapdir<0&&me.right<=me.ocheck.left+unitsizet2)||me.left>=me.ocheck.right-unitsizet2){me.overlapdir=0;me.overlaps=[];}
else shiftHoriz(me,me.overlapdir,true);}
else if(me.overlaps.length>0){var overlaps=me.overlaps,right={right:-Infinity},left={left:Infinity},mid=0,over,i;me.overlapfix=true;for(i in overlaps){over=overlaps[i];mid+=getMidX(over);if(over.right>right.right)right=over;if(over.left<left.left)left=over;}
mid/=overlaps.length;if(getMidX(me)>=mid-unitsized16){me.overlapdir=unitsize;me.ocheck=right;}else{me.overlapdir=-unitsize;me.ocheck=left;}}}
function characterOverlapsSolid(me,solid){return me.top<=solid.top&&me.bottom>solid.bottom;}
function objectsTouch(one,two){if(one.right-unitsize>two.left&&one.left+unitsize<two.right)
if(one.bottom>=two.top&&one.top<=two.bottom)
return true;return false;}
function charactersTouch(one,two){if(one.bottom<=two.top+unitsizet2||one.top+unitsizet2>=two.bottom)return false;return true;}
function objectInQuadrant(one,quad){if(one.right+unitsize>=quad.left&&one.left-unitsize<=quad.right)
if(one.bottom+unitsize>=quad.top&&one.top-unitsize<=quad.bottom)
return true;return false;}
function objectsCollided(one,two){if(one.solid){if(!two.solid)return objectsCollided(two,one);}
if(two.up&&one!=two.up)return characterTouchesUp(one,two);if(two.solid||one.player)
two.collide(one,two);else one.collide(two,one);}
function objectToLeft(one,two){return(one.left+one.right)/2<(two.left+two.right)/2;}
function objectOnTop(one,two){if(one.type=="solid"&&two.yvel>0)return false;if(one.yvel<two.yvel&&two.type!="solid")return false;if(one.player&&one.bottom<two.bottom&&two.group=="enemy")return true;return((one.left+unitsize<two.right&&one.right-unitsize>two.left)&&(one.bottom-two.yvel<=two.top+two.toly||one.bottom<=two.top+two.toly+abs(one.yvel-two.yvel)));}
function objectOnSolid(one,two){return((one.left+unitsize<two.right&&one.right-unitsize>two.left)&&(one.bottom-one.yvel<=two.top+two.toly||one.bottom<=two.top+two.toly+abs(one.yvel-two.yvel)));}
function solidOnCharacter(solid,me){if(me.yvel>=0)return false;me.midx=getMidX(me);return me.midx>solid.left&&me.midx<solid.right&&(solid.bottom-solid.yvel<=me.top+me.toly-me.yvel);}
function characterOnSolid(me,solid){return(me.resting==solid||(objectOnSolid(me,solid)&&me.yvel>=0&&me.left+me.xvel+unitsize!=solid.right&&me.right-me.xvel-unitsize!=solid.left));}
function characterOnResting(me,solid){return objectOnSolid(me,solid)&&me.left+me.xvel+unitsize!=solid.right&&me.right-me.xvel-unitsize!=solid.left;}
function characterTouchedSolid(me,solid){if(solid.up==me)return;if(characterOnSolid(me,solid)){if(solid.hidden)return;me.resting=solid;if(me.player&&map.underwater)removeClass(me,"paddling");}
else if(solidOnCharacter(solid,me)){var mid=me.left+me.width*unitsize/2;if(mid>solid.left&&mid<solid.right)me.undermid=solid;else if(solid.hidden)return;if(!me.under)me.under=[solid];else me.under.push(solid);if(me.player){setTop(me,solid.bottom-me.toly+solid.yvel,true);}
me.yvel=solid.yvel;if(me.player)me.keys.jump=0;}
if(solid.hidden)return;if(!characterNotBumping(me,solid)&&!objectOnTop(me,solid)&&!objectOnTop(solid,me)&&!me.under&&me!=solid.up){if(me.right<=solid.right){me.xvel=min(me.xvel,0);shiftHoriz(me,max(solid.left+unitsize-me.right,-unitsized2),true);}else if(me.left>=solid.left){me.xvel=max(me.xvel,0);shiftHoriz(me,min(solid.right-unitsize-me.left,unitsized2),true);}
if(!me.player){me.moveleft=!me.moveleft;if(me.group=="item")me.collide(solid,me);}
else if(solid.actionLeft)
solid.actionLeft(me,solid,solid.transport);}}
function characterNotBumping(me,solid){if(me.top+me.toly+abs(me.yvel)>solid.bottom)return true;return false;}
function characterTouchesUp(me,solid){switch(me.group){case "item":me.moveleft=getMidX(me)<=getMidX(solid)+unitsized2;characterHops(me);break;case "coin":me.animate(me);break;default:me.death(me,2);scoreEnemyBelow(me);break;}}
function characterHops(me){me.yvel=-1.4*unitsize;me.resting=false;}
function characterIsAlive(me){return!(!me||me.dead||!me.alive);}
function scorePlayerShell(player,shell){if(player.star)return score(shell,200,true);if(!shell.resting)return score(shell,8000,true);if(shell.peeking)return score(shell,1000,true);return score(shell,100,true);}
function scoreEnemyStomp(enemy){var amount=100;switch(enemy.type.split(" ")[0]){case "koopa":amount=enemy.fly?400:100;break;case "bulletbill":amount=200;break;case "cheepcheep":amount=200;break;case "hammerbro":amount=1000;break;case "lakitu":amount=800;break;default:amount=100;break;}}
function scoreEnemyFire(enemy){var amount=200;switch(enemy.type.split(" ")[0]){case "goomba":amount=100;break;case "hammerbro":amount=1000;break;case "bowser":amount=5000;break;default:amount=200;break;}
scoreEnemyFin(enemy,amount);}
function scoreEnemyStar(enemy){var amount=200;switch(enemy.type.split(" ")[0]){case "goomba":amount=100;break;case "hammerbro":amount=1000;break;default:amount=200;break;}
scoreEnemyFin(enemy,amount);AudioPlayer.play("Kick");}
function scoreEnemyBelow(enemy){var amount=100;switch(enemy.type.split(" ")[0]){case "hammerbro":amount=1000;break;default:amount=100;break;}
scoreEnemyFin(enemy,amount);}
function scoreEnemyFin(enemy,amount){score(enemy,amount,true);}
function moveSimple(me){if(me.direction!=me.moveleft){if(me.moveleft){me.xvel=-me.speed;if(!me.noflip)unflipHoriz(me);}else{if(!me.noflip)flipHoriz(me);me.xvel=me.speed;}
me.direction=me.moveleft;}}
function moveSmart(me){moveSimple(me);if(me.yvel==0&&(!me.resting||(offResting(me)))){if(me.moveleft)shiftHoriz(me,unitsize,true);else shiftHoriz(me,-unitsize,true);me.moveleft=!me.moveleft;}}
function offResting(me){if(me.moveleft)return me.right-unitsize<me.resting.left;else return me.left+unitsize>me.resting.right;}
function moveJumping(me){moveSimple(me);if(me.resting){me.yvel=-abs(me.jumpheight);me.resting=false;}}
function moveFloating(me){setPlatformEndpoints(me);me.begin=map.floor*unitsize-me.begin;me.end=map.floor*unitsize-me.end;(me.movement=moveFloatingReal)(me);}
function moveFloatingReal(me){if(me.top<me.end)
me.yvel=min(me.yvel+unitsized32,me.maxvel);else if(me.bottom>me.begin)
me.yvel=max(me.yvel-unitsized32,-me.maxvel);movePlatformNorm(me);}
function moveSliding(me){setPlatformEndpoints(me);(me.movement=moveSlidingReal)(me);}
function moveSlidingReal(me){if(gamescreen.left+me.left<me.begin)
me.xvel=min(me.xvel+unitsized32,me.maxvel);else if(gamescreen.left+me.right>me.end)
me.xvel=max(me.xvel-unitsized32,-me.maxvel);movePlatformNorm(me);}
function setPlatformEndpoints(me){if(me.begin>me.end){var temp=me.begin;me.begin=me.end;me.end=temp;}}
function collideTransport(me,solid){characterTouchedSolid(me,solid);if(solid!=me.resting)return;solid.movement=movePlatformNorm;solid.collide=characterTouchedSolid;solid.xvel=unitsized2;}
function moveFalling(me){if(me!=player.resting)return me.yvel=0;shiftVert(me,me.yvel+=unitsized8);setBottom(player,me.top);if(me.yvel>=unitsize*2.8){me.freefall=true;me.movement=moveFreeFalling;}}
function moveFallingScale(me){if(player.resting==me){shiftScaleStringVert(me,me.string,me.yvel+=unitsized16);shiftScaleStringVert(me.partner,me.partner.string,-me.yvel);me.tension+=me.yvel;me.partner.tension-=me.yvel;}
else if(me.yvel>0){shiftScaleStringVert(me,me.string,me.yvel-=unitsized32);shiftScaleStringVert(me.partner,me.partner.string,-me.yvel);me.tension-=me.yvel;me.partner.tension+=me.yvel;}
if(me.partner.tension<=0){me.collide=me.partner.collide=characterTouchedSolid;me.movement=me.partner.movement=moveFreeFalling;}}
function moveFreeFalling(me){shiftVert(me,me.yvel+=unitsized16);if(me.yvel>unitsizet2)
me.movement=function(me){shiftVert(me,me.yvel);}}
function shiftScaleStringVert(me,string,yvel){shiftVert(me,yvel);string.bottom=me.top;string.height=(string.bottom-string.top)/unitsize;updateSize(string);}
function setClass(me,strin){me.className=strin;setThingSprite(me);}
function setClassInitial(me,strin){me.className=strin;}
function addClass(me,strin){me.className+=" "+strin;setThingSprite(me);}
function removeClass(me,strout){me.className=me.className.replace(new RegExp(" "+strout,"gm"),'');setThingSprite(me);}
function switchClass(me,strout,strin){removeClass(me,strout);addClass(me,strin);}
function removeClasses(me){var strings,arr,i,j;for(i=1;i<arguments.length;++i){arr=arguments[i];if(!(arr instanceof Array))arr=arr.split(" ");for(j=arr.length-1;j>=0;--j)
removeClass(me,arr[j]);}}
function addClasses(me,strings){var arr=strings instanceof Array?strings:strings.split(" ");for(var i=arr.length-1;i>=0;--i)
addClass(me,arr[i]);}
function addElementClass(element,strin){element.className+=" "+strin;}
function removeElementClass(element,strin){element.className=element.className.replace(new RegExp(" "+strin,"gm"),'');}
function flipHoriz(me){addClass(me,"flipped");}
function flipVert(me){addClass(me,"flip-vert");}
function unflipHoriz(me){removeClass(me,"flipped");}
function unflipVert(me){removeClass(me,"flip-vert");}
function deleteThing(me,array,arrayloc){array.splice(arrayloc,1);if(me.ondelete)me.ondelete();}
function switchContainers(me,outer,inner){outer.splice(outer.indexOf(me),1);inner.push(me);}
function containerForefront(me,container){container.splice(container.indexOf(me),1);container.unshift(me);}
function killNormal(me){if(!me)return;me.hidden=me.dead=true;me.alive=me.resting=me.movement=false;TimeHandler.clearAllCycles(me);}
function killFlip(me,extra){flipVert(me);me.bottomBump=function(){};me.nocollide=me.dead=true;me.resting=me.movement=me.speed=me.xvel=me.nofall=false;me.yvel=-unitsize;TimeHandler.addEvent(function(me){killNormal(me);},70+(extra||0));}
function generalMovement(me,dx,dy,cleartime){var move=setInterval(function(){shiftVert(me,dy);shiftHoriz(me,dx);},timer);setTimeout(function(){clearInterval(move);},cleartime);}
function blockBumpMovement(me){var dir=-3,dd=.5;var move=setInterval(function(){shiftVert(me,dir);dir+=dd;if(dir==3.5){clearInterval(move);me.up=false;}
determineThingCollisions(me);},timer);}
function emergeUp(me,solid){AudioPlayer.play("Powerup Appears");flipHoriz(me);me.nomove=me.nocollide=me.alive=me.nofall=me.emerging=true;switchContainers(me,characters,scenery);var move=setInterval(function(){shiftVert(me,-unitsized8);if(me.bottom<=solid.top){clearInterval(move);switchContainers(me,scenery,characters);me.nocollide=me.nomove=me.moveleft=me.nofall=me.emerging=false;if(me.emergeOut)me.emergeOut(me,solid);if(me.movement){me.movementsave=me.movement;me.movement=moveSimple;me.moving=TimeHandler.addEventInterval(function(me,solid){if(me.resting!=solid){TimeHandler.addEvent(function(me){me.movement=me.movementsave;},1,me);return true;}},1,Infinity,me,solid);}}},timer);}
function flicker(me,cleartime,interval){var cleartime=round(cleartime)||49,interval=round(interval)||3;me.flickering=true;TimeHandler.addEventInterval(function(me){me.hidden=!me.hidden;},interval,cleartime,me);TimeHandler.addEvent(function(me){me.flickering=me.hidden=false;},cleartime*interval+1,me);}
function killOtherCharacters(){var thing,i;if(window.characters){for(i=characters.length-1;i>=0;--i){thing=characters[i];if(!thing.nokillend)deleteThing(thing,characters,i);else if(thing.killonend)thing.killonend(thing);}}
if(window.solids){for(i=solids.length-1;i>=0;--i)
if(solids[i].killonend)
deleteThing(solids[i],solids,i);}}
function lookTowardPlayer(me,big){if(player.right<=me.left){if(!me.lookleft||big){me.lookleft=true;me.moveleft=false;unflipHoriz(me);}}
else if(player.left>=me.right){if(me.lookleft||big){me.lookleft=false;me.moveleft=true;flipHoriz(me);}}}
function lookTowardThing(me,thing){if(thing.right<=me.left){me.lookleft=true;me.moveleft=false;unflipHoriz(me);}
else if(thing.left>=me.right){me.lookleft=false;me.moveleft=true;flipHoriz(me);}}