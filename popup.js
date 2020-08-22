/*document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("options").addEventListener("click", function() {
        chrome.tabs.create({});
    });
});*/

$('#options').click(() => {
    chrome.tabs.create({url: 'options.html'});
});

$('#report').click(() => {
    chrome.tabs.create({url: 'report.html'});
});
