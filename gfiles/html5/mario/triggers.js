function resetTriggers(){window.controls=new Controls({left:[37,65,"AXIS_LEFT","DPAD_LEFT"],right:[39,68,"AXIS_RIGHT","DPAD_RIGHT"],up:[38,87,32,"FACE_1","DPAD_UP","LEFT_BOTTOM_SHOULDER"],down:[40,83,"AXIS_DOWN","DPAD_DOWN"],sprint:[16,17,"FACE_1"],pause:[80,"START_FORWARD"],mute:[77],q:[81],l:[76],});window.gamepad=new Gamepad();gamepad.bind(Gamepad.Event.BUTTON_DOWN,ControlsPipe("keydown",true));gamepad.bind(Gamepad.Event.BUTTON_UP,ControlsPipe("keyup",false));gamepad.bind(Gamepad.Event.AXIS_CHANGED,function(event){var value=event.value,value_abs=abs(value);if(value_abs<0.1)return;switch(event.axis){case "LEFT_STICK_Y":case "RIGHT_STICK_Y":if(value_abs>0.5){keydown(value>0?"DPAD_DOWN":"DPAD_UP");}
else{keyup("DPAD_UP");keyup("DPAD_DOWN");}
break;case "LEFT_STICK_X":case "RIGHT_STICK_X":if(value_abs>0.5){keydown(value<0?"DPAD_LEFT":"DPAD_RIGHT");}
else{keyup("DPAD_UP");keyup("DPAD_DOWN");}
break;}});gamepad.init();proliferate(body,{onkeydown:ControlsPipe("keydown",true),onkeyup:ControlsPipe("keyup",false),oncontextmenu:contextmenu,onmousedown:mousedown});setMessageTriggers();}
function Controls(pipes,gamepadPipes){this.pipes=pipes;var keydown=this.keydown={left:function(keys){keys.run=-1;keys.left_down=true;},right:function(keys){keys.run=1;keys.right_down=true;},up:function(keys){keys.up=true;if(player.canjump&&(player.resting||map.underwater)){keys.jump=1;player.canjump=keys.jumplev=0;AudioPlayer.play(player.power>1?"Jump Super":"Jump Small");if(map.underwater)setTimeout(function(){player.jumping=keys.jump=false;},timer*14);}},down:function(keys){keys.crouch=true;},sprint:function(keys){if(player.power==3&&keys.sprint==0&&!keys.crouch)
player.fire();keys.sprint=1;},pause:function(keys){if(!paused&&!(window.editing&&!editor.playing))
setTimeout(function(){pause(true);},140);},mute:function(keys){AudioPlayer.toggleMute();},q:function(keys){if(++qcount>28)maxlulz();switch(qcount){case 7:lulz();break;case 14:superlulz();break;case 21:hyperlulz();break;}},l:function(keys){toggleLuigi();}};var keyup=this.keyup={left:function(keys){keys.run=0;keys.left_down=false;},right:function(keys){keys.run=0;keys.right_down=false;},up:function(keys){if(!map.underwater)keys.jump=keys.up=0;player.canjump=true;},down:function(keys){keys.crouch=0;removeCrouch();},sprint:function(keys){keys.sprint=0;},pause:function(keys){unpause(true);},}
var tag,codes,code,i;for(tag in pipes){codes=pipes[tag];for(i in codes){code=codes[i];keydown[code]=keydown[tag];keyup[code]=keyup[tag];}}}
function ControlsPipe(name,strict){var responses=controls[name];return function(event){if((strict&&((player&&player.dead)||window.paused))||window.nokeys)return;if(typeof(event)!="number"||event.which||event.control)
event=event.which||event.control;if(responses[event])
responses[event](player.keys);else mlog(name,"Could not",name,event);window.gamehistory[gamecount]=[keydown,event];};}
function keydown(event){if((player&&player.dead)||window.paused||window.nokeys)return;var responses=controls["keydown"];if(typeof(event)==="object"||event.which)
event=event.which;if(responses[event])
responses[event](player.keys);window.gamehistory[gamecount]=[keydown,event];}
function keyup(event){if(window.nokeys)return;var responses=controls["keyup"];if(typeof(event)==="object"||event.which)
event=event.which;if(responses[event])
responses[event](player.keys);window.gamehistory[gamecount]=[keyup,event];}
function contextmenu(event){if(event.preventDefault)
event.preventDefault();}
function mousedown(event){if(event.which==3){if(paused)unpause();else if((!window.editor)||(!editing&&!editor.playing))pause(true);if(event.preventDefault)
event.preventDefault()}}
function scriptKeys(oldhistory){var i,entry;for(i in oldhistory){entry=oldhistory[i];TimeHandler.addEvent(entry[0],i,entry[1]);TimeHandler.addEvent(function(){alert(entry[0].name+", "+entry[1])},i);}}
function lulz(options,timer){player.star=true;options=options||[Goomba];timer=timer||7;TimeHandler.addEventInterval(function(){if(characters.length>210)return;var lul=new Thing(options[randInt(options.length)],randBoolJS(),randBoolJS());lul.yvel=random()*-unitsizet4;lul.xvel=lul.speed=random()*unitsizet2*randSign();addThing(lul,(32*random()+128)*unitsize,(88*random())*unitsize);},timer,Infinity);}
function superlulz(){lulz([Goomba,Koopa,Beetle,HammerBro,Lakitu,Podoboo,Blooper]);}
function hyperlulz(){lulz([Bowser],21);}
function maxlulz(){TimeHandler.addEventInterval(function(arr){setAreaSetting(arr[randInt(arr.length)]);},7,Infinity,["Overworld","Underworld","Underwater","Sky","Castle"]);}
function mapKeyToControl(action,keyCode){if(window.controls.pipes[action].indexOf(keyCode)!=-1){return;}
window.controls.pipes[action].push(keyCode);var newPipes=window.controls.pipes;window.controls=new Controls(newPipes);proliferate(body,{onkeydown:ControlsPipe("keydown",true),onkeyup:ControlsPipe("keyup",false),oncontextmenu:contextmenu,onmousedown:mousedown});}
function setMessageTriggers(){var command_codes={setMap:triggerSetMap,startEditor:function(){loadEditor();},toggleOption:function(data){var name="toggle"+data.option;console.log(name,window[name]);if(window[name])window[name]();else log("Could not toggle",name);},setKey:function(data){mapKeyToControl(data.action,data.keyCode);}};window.addEventListener("message",function(event){var data=event.data,type=data.type;if(command_codes[type])
command_codes[type](data);else{console.log("Unknown event type received:",type,".\n",data);}});}
function triggerSetMap(data){clearPlayerStats();setMap.apply(this,data.map||[]);setLives(3);}