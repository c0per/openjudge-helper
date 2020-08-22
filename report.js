let table = $('#user-problem');

chrome.storage.sync.get(['students', 'problems'], data => {
    data.problems.forEach((problem) => {
        $('#user-problem thead tr').append($('<th></th>').text(problem.problemName));
    });
    data.students.forEach((student) => {
        let tr = $('<tr></tr>');
        tr.append($('<td></td>').text(student.userName));
        let problemAccepted = [];
        $.get('http://openjudge.cn/user/' + student.userId + '/in/group-93/', function(data) {
            $(data).find('h4:contains(已解决)').next().find('a').each(function() {
                problem = $(this).prop('href').match(/[0-9]+/g);
                problemAccepted.push({chapterId: problem[0], problemId: problem[1]});
            });
        }).done(() => {
            data.problems.forEach((problem) => {
                let td = $('<td></td>');
                if (problemAccepted.filter(p => p.chapterId == problem.chapterId && p.problemId == problem.problemId).length)
                    td.text('已完成');
                else
                    td.text('未完成');
                tr.append(td);
            });
            $('#user-problem tbody').append(tr);
        });
    });
});
