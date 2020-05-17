var fs = require('fs');

/**
 * node index.js input_html_file output_html_file number_of_wraps number_of_recursive_wraps
 * 
 */

function arrayLayer(code, offset){
    if(!offset) offset = Math.floor(Math.random() * 1000000);
    return `eval([${code.split('').map(e=>e.charCodeAt()+offset).join(',')}].map(e=>String.fromCharCode(e-${offset})).join(""));`;
}
function wrapEval(code){
    code = Buffer.from(encodeURIComponent(Buffer.from(code).toString('base64'))).toString('base64');
    return `setTimeout(function(){eval(atob(decodeURIComponent(atob('${code}'))))},0);`;
}
function superWrapEval(code, numberOfWraps){
    for(var c = 0; c < numberOfWraps; c++){
        code = Buffer.from(encodeURIComponent(Buffer.from(code).toString('base64'))).toString('base64');
    }
    return `setTimeout(function(){for(var c=0,t='${code}';c<${numberOfWraps};c++)t=atob(decodeURIComponent(atob(t)));eval(t)},0);`;
}
function recursiveWrap(html, numberOfRecursives){
    var rootCode = `document.write(atob('${Buffer.from(html).toString('base64')}'));`;
    for(var c = 0; c < numberOfRecursives; c++){
        rootCode = arrayLayer(wrapEval(superWrapEval(rootCode, process.argv[4])));
    }
    return '<script>'+rootCode+'</script>';
}

var targetFile = fs.readFileSync(process.argv[2], 'utf8');
fs.writeFileSync(process.argv[3], recursiveWrap(targetFile, process.argv[5]), 'utf8');