chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: 'noi.openjudge.cn'}
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    chrome.storage.sync.set({students: []});
    chrome.storage.sync.set({problems: []});
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.operation) {
            case 'add_student':
                console.log('add student');
                chrome.storage.sync.get('students', data => {
                    let new_student = {userId: request.userId, userName: request.userName}
                    data.students.push(new_student);
                    chrome.storage.sync.set({students: data.students});
                });
                break;
            case 'del_student':
                console.log('del student');
                chrome.storage.sync.get('students', data => {
                    data.students = data.students.filter(s => s.userId != request.userId || s.userName != request.userName);
                    chrome.storage.sync.set({students: data.students});
                });
                break;
            case 'add_problem':
                console.log('add ' + request.problems.length + ' problem');
                chrome.storage.sync.get('problems', data => {
                    data.problems = data.problems.concat(request.problems);
                    chrome.storage.sync.set({problems: data.problems});
                });
                break;
            case 'del_problem':
                console.log('del ' + request.problems.length + ' problem');
                chrome.storage.sync.get('problems', data => {
                    request.problems.forEach(p => {
                        data.problems = data.problems.filter(pp => pp.chapterId != p.chapterId || pp.problemId != p.problemId);
                    });
                    chrome.storage.sync.set({problems: data.problems});
                });
                break;
        }
    }
);
