function startLoadingMaps(){if(window.location.protocol=="file:")return;passivelyLoadMap([1,2],new XMLHttpRequest());}
function passivelyLoadMap(map,ajax){if(!map||map[0]>8||map[1]<=0)return;var url="Maps/World"+map[0]+""+map[1]+".js"
ajax.open("GET",url,true);mlog("Maps","Requesting:",url);ajax.send();ajax.onreadystatechange=function(){if(ajax.readyState!=4)return;if(ajax.status==200){mapfuncs[map[0]][map[1]]=Function(ajax.responseText);if(window.parentwindow&&parentwindow.onMapLoad){parentwindow.onMapLoad(map[0],map[1]);setTimeout(function(){parentwindow.onMapLoad(map[0],map[1]);},2100);}
mlog("Maps"," Loaded: Maps/World"+map[0]+""+map[1]+".js");}
else if(ajax.status!=404)return;setTimeout(function(){passivelyLoadMap(setNextLevelArr(map),ajax);},7);};}
function setNextLevelArr(arr){if(arr[1]++==4){++arr[0];arr[1]=1;}
return arr;}