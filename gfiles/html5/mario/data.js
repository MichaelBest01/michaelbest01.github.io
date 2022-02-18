function resetData(){var check;if(check=document.getElementById("data_display"))
body.removeChild(check);if(!window.data){window.data=new Data();}}
function Data(){this.playerpower=1;this.traveled=this.traveledold=0;this.scorelevs=[100,200,400,500,800,1000,2000,4000,5000,8000];this.score=new DataObject(0,6,"SCORE");this.time=new DataObject(350,3,"TIME");this.world=new DataObject(0,0,"WORLD");this.coins=new DataObject(0,0,"COINS");this.lives=new DataObject(3,1,"LIVES");this.time.dir=-1;this.scoreold=0;}
function DataObject(amount,length,name){this.amount=amount;this.length=length;this.name=name;this.element=createElement("td",{className:"indisplay"});}
function setDataDisplay(){var display=createElement("table",{id:"data_display",className:"display",style:{width:(gamescreen.right+14)+"px"}}),elems=["score","coins","world","time","lives"];body.appendChild(display);data.display=display;for(var i in elems){display.appendChild(data[elems[i]].element);updateDataElement(data[elems[i]]);}
body.appendChild(data.display);}
function clearDataDisplay(){body.removeChild(data_display);}
function toggleLuigi(){window.luigi=!window.luigi;localStorage.luigi=window.luigi;window.player.title=(window.luigi)?"Luigi":"Mario";setThingSprite(window.player);}
function startDataTime(){TimeHandler.addEventInterval(updateDataTime,25,Infinity,data.time);}
function updateDataTime(me){if(me.dir!=1){if(me.amount==100)playCurrentThemeHurry();else if(me.amount<=0)killPlayer(player,true);}
if(!notime){map.time=me.amount+=me.dir;updateDataElement(me);}}
function updateDataElement(me){var text=me.name+"<br />"+(me.amount=="Infinity"?"Inf":me.amount);me.element.innerHTML=text;me.element.style.width="";}
function score(me,amount,appears){if(amount<=0)return;if(arguments.length==1)return score(player,me);localStorage.highscore=max(localStorage.highscore,data.score.amount+=amount);if(appears){var text=addText(amount,me.left,me.top);text.yvel=-unitsized4;TimeHandler.addEvent(killScore,49,text);}
while(data.score>10000){gainLife();data.score.amount=data.score.amount%10000;}
updateDataElement(data.score);}
function killScore(text){if(body.contains(text))
body.removeChild(text);killNormal(text);deleteThing(text,texts,texts.indexOf(text));}
function findScore(lev){if(lev<data.scorelevs.length)return data.scorelevs[lev];gainLife();return-1;}
function gainLife(num,nosound){data.lives.amount+=typeof(num)=="number"?num:1;if(!nosound)AudioPlayer.play("Gain Life");updateDataElement(data.lives);}
function setLives(num){data.lives.amount=Number(num);updateDataElement(data.lives);}
function storePlayerStats(){data.playerpower=player.power;}
function clearPlayerStats(){data.playerpower=player.power=1;}