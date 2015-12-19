chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;
            try{
                var urlParts = url.split('/');
                var filename = '';
                for(j = 2; j < urlParts.length; ++j)
                    filename += urlParts[j] + '/';
                filename = filename.substring(0, filename.length - 1);
                if(filename.substring(filename.length - 4) != 'html')
                    filename += '.html';
                var blob = new Blob([request.source], {type: "text/html;charset=utf-8"});
                filename = filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
                saveAs(blob, filename);
                return;
            } catch(e) {
                console.log(e.message);
            }
        });
    }
});



window.onload = function(){
    var sb = document.getElementById('saveB');
    sb.onclick = function () {

        chrome.tabs.executeScript(null, {file: "js/getPagesSource.js"}, function() {
            if (chrome.runtime.lastError) {
                console.log('There was an error injecting script : \n' +
                                     chrome.runtime.lastError.message);
            }
        });

    }
}