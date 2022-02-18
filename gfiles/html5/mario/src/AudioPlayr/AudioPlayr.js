function playCurrentThemeHurry(name_raw){AudioPlayer.playTheme("Hurry "+(name_raw||area.theme));}
function AudioPlayr(settings){"use strict";var version="1.0",library,filetypes,sounds,theme,muted,directory,localStorageMuted,getVolumeLocal,getThemeDefault,soundSettings;var play=this.play=function(name_raw){var sound=sounds[name_raw];if(!sound){if(sound=library[name_raw]){sounds[name_raw]=sound;}
else{console.log("Unknown sound: '"+name_raw+"'");return sound;}}
sound.name_raw=name_raw;soundStop(sound);sound.volume=!muted;sound.play();if(!(sound.used++))
sound.addEventListener("ended",function(){soundFinish(sound,name_raw);});return sound;}
this.playLocal=function(name_raw,location){var sound=play(name_raw),volume_real;if(!sound)return sound;switch(getVolumeLocal.constructor){case Function:volume_real=getVolumeLocal(location);break;case Number:volume_real=getVolumeLocal;break;default:volume_real=Number(volume_real)||1;break;}
sound.volume=sound.volume_real=volume_real=0;;return sound;}
this.playTheme=function(name_raw,resume,loop){loop=typeof loop!=='undefined'?loop:true;if(!name_raw)
switch(getThemeDefault.constructor){case Function:name_raw=getThemeDefault();break
case String:name_raw=getThemeDefault;break;}
if(sound=theme){soundStop(sound);theme=undefined;delete sounds[sound.name_raw];}
var sound=theme=play(name_raw);sound.loop=loop;if(!resume)
sound.used=false;if(sound.used==1)
sound.addEventListener("ended",this.playTheme);return sound;}
this.addEventListener=function(name_raw,event,func){var sound=sounds[name_raw];if(sound)sound.addEventListenever(event,func);}
this.addEventImmediate=function(name_raw,event,func){var sound=sounds[name_raw];if(sound&&!sound.paused)
sound.addEventListener(event,func);else func();}
this.toggleMute=function(){muted=!muted;for(var i in sounds)
sounds[i].volume=muted?0:(sounds[i].volume_real||1);if(localStorageMuted)
localStorage[localStorageMuted]=muted;}
this.pause=function(){for(var i in sounds)if(sounds[i])soundPause(sounds[i]);}
this.resume=function(){for(var i in sounds)if(sounds[i])soundPlay(sounds[i]);}
this.pauseTheme=function(){if(theme)theme.pause();}
this.resumeTheme=function(){if(theme)theme.play();}
this.clear=function(){this.pause();sounds={};this.theme=undefined;}
this.getLibrary=function(){return library;}
this.getSounds=function(){return sounds;}
function soundFinish(sound,name_raw){if(sounds[name_raw])
delete sounds[name_raw];}
function soundPlay(sound){sound.play();}
function soundPause(sound){sound.pause();}
function soundStop(sound){if(sound&&sound.pause){sound.pause();if(sound.readyState)
sound.currentTime=0;}}
function libraryLoad(){var section,name,s_name,j;for(s_name in library){section=library[s_name];for(j in section){name=section[j];library[name]=createAudio(name,s_name);}}}
function createAudio(name,section){var sound=document.createElement("Audio"),type,i;proliferate(sound,soundSettings);for(i in filetypes){type=filetypes[i];sound.appendChild(proliferate(document.createElement("Source"),{type:"audio/"+type,src:directory+"/"+section+"/"+type+"/"+name+"."+type}));}
sound.play();return sound;}
function proliferate(elem,settings){var setting,i;for(i in settings){if(typeof(setting=settings[i])=="object"){if(!elem[i])elem[i]={};proliferate(elem[i],setting);}
else elem[i]=setting;}
return elem;}
function reset(settings){library=settings.library||{};filetypes=settings.filetypes||["mp3","ogg"];muted=settings.muted||false;directory=settings.directory||"";localStorageMuted=settings.localStorageMuted||"";getVolumeLocal=settings.getVolumeLocal||1;getThemeDefault=settings.getThemeDefault||"Theme";var soundSetsRef=settings.soundSettings||{}
soundSettings=settings.soundSettings||{preload:soundSetsRef.preload||"auto",used:0,volume:0};sounds={};if(localStorageMuted)
muted=localStorage[localStorageMuted];libraryLoad();}
reset(settings||{});}