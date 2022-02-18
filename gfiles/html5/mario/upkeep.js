function upkeep(){if(window.paused)return;window.nextupk=setTimeout(upkeep,timer);for(var i=window.speed;i>0;--i){adjustFPS();QuadsKeeper.determineAllQuadrants(solids);maintainSolids();maintainCharacters();maintainPlayer();if(texts.length)maintainTexts();TimeHandler.handleEvents();refillCanvas();}}
function adjustFPS(){window.time_now=now();var time_diff=time_now-time_prev,fps_actual=roundDigit(1000/time_diff,.001);window.fps=roundDigit((.7*fps)+(.3*fps_actual),.01);window.realtime=fps_target/fps;window.time_prev=time_now;}
function pause(big){if(paused&&!window.nextupk)return;cancelAnimationFrame(nextupk);AudioPlayer.pause();paused=true;if(big)AudioPlayer.play("Pause");}
function unpause(){if(!paused)return;window.nextupk=requestAnimationFrame(upkeep);paused=false;AudioPlayer.resume();}
function maintainSolids(update){for(var i=0,solid;i<solids.length;++i){solid=solids[i];if(solid.alive){if(solid.movement)solid.movement(solid);}
if(!solid.alive||solid.right<QuadsKeeper.getDelX())
deleteThing(solid,solids,i);}}
function maintainCharacters(update){var delx=gamescreen.right+QuadsKeeper.getOutDifference(),character,i;for(i=0;i<characters.length;++i){character=characters[i];if(!character.resting){if(!character.nofall)character.yvel+=character.gravity||map.gravity;character.yvel=min(character.yvel,map.maxyvel);}else character.yvel=0;updatePosition(character);QuadsKeeper.determineThingQuadrants(character);character.under=character.undermid=false;determineThingCollisions(character);if(character.resting){if(!characterOnResting(character,character.resting)){character.resting=false;}else{character.yvel=false;setBottom(character,character.resting.top);}}
if(character.alive){if(character.type!="player"&&!map.shifting&&(character.numquads==0||character.left>delx)&&!character.outerok){deleteThing(character,characters,i);}
else{if(!character.nomove&&character.movement)
character.movement(character);}}
else if(!map.shifting)deleteThing(character,characters,i);}}
function maintainPlayer(update){if(!player.alive)return;if(player.yvel>0){if(!map.underwater)player.keys.jump=0;if(!player.jumping){if(map.underwater){if(!player.paddling){switchClass(player,"paddling","paddling");player.padding=true;}}
else{addClass(player,"jumping");player.jumping=true;}}
if(!player.piping&&!player.dying&&player.top>gamescreen.deathheight){if(map.exitloc){if(map.random){goToTransport(["Random","Overworld","Down"]);playerDropsIn();return;}
return shiftToLocation(map.exitloc);}
clearPlayerStats();killPlayer(player,2);}}
if(player.xvel>0){if(player.right>gamescreen.middlex){if(player.right>gamescreen.right-gamescreen.left)
player.xvel=min(0,player.xvel);}}
else if(player.left<0){player.xvel=max(0,player.xvel);}
if(player.under)player.jumpcount=0;window.scrolloffset=(map.canscroll)*(player.right-gamescreen.middlex);if(scrolloffset>0&&!map.shifting){scrollWindow(lastscroll=round(min(player.scrollspeed,scrolloffset)));}
else lastscroll=0;}
function maintainTexts(){var element,me,i;for(i=texts.length-1;i>=0;--i){me=texts[i];element=me.element||me;if(me.xvel)elementShiftLeft(element,me.xvel);if(me.yvel)elementShiftTop(element,me.yvel);}}