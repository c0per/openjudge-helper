$('thead tr').prepend($('<td>纳入统计<input id="problemall" type="checkbox" /></td>'));
let checkboxTd = $('<td><input class="problemcheck" type="checkbox" /></td>');
$('tbody tr').prepend(checkboxTd);

let currentCId = $('tbody .problem-id:first').children().prop('href').match(/[0-9]+/);

chrome.storage.sync.get('problems', function(data) {
    data.problems.forEach(function(problem) {
        if (problem.chapterId == currentCId) {
            $('.problem-id:contains(' + problem.problemId + ')').siblings(':first').children().prop('checked', true);
        }
    });
    if ($('.problemcheck:checked').length == $('.problemcheck').length)
        $('#problemall').prop('checked', true);
});

$('#problemall').change(function () {
    if ($(this).prop('checked')) {

        let problems = []
        $('.problemcheck').each(function() {

            let chapterId = $(this).parent().siblings('.problem-id').children().prop('href').match(/[0-9]+/g)[0];
            let problemId = $(this).parent().siblings('.problem-id').children().prop('href').match(/[0-9]+/g)[1];
            let problemName = $(this).parent().siblings('.title').text();
            let problem = {chapterId: chapterId, problemId: problemId, problemName: problemName};

            if (!$(this).prop('checked')) {

                problems.push(problem);
                $(this).prop('checked', true);
            }
        });
        chrome.runtime.sendMessage({operation: 'add_problem', problems: problems}, undefined);

    }
    else {

        let problems = []
        $('.problemcheck').each(function() {

            let chapterId = $(this).parent().siblings('.problem-id').children().prop('href').match(/[0-9]+/)[0];
            let problemId = $(this).parent().siblings('.problem-id').children().prop('href').match(/[0-9]+/g)[1];
            let problemName = $(this).parent().siblings('.title').text();
            let problem = {chapterId: chapterId, problemId: problemId, problemName: problemName};

            if ($(this).prop('checked')) {

                problems.push(problem);
                $(this).prop('checked', false);
            }
        });
        chrome.runtime.sendMessage({operation: 'del_problem', problems: problems}, undefined);
    }
});

$('.problemcheck').change(function() {

    let chapterId = $(this).parent().siblings('.problem-id').children().prop('href').match(/[0-9]+/g)[0];
    let problemId = $(this).parent().siblings('.problem-id').children().prop('href').match(/[0-9]+/g)[1];
    let problemName = $(this).parent().siblings('.title').text();
    let problem = {chapterId: chapterId, problemId: problemId, problemName: problemName};

    if ($(this).prop('checked')) {

        chrome.runtime.sendMessage({operation: 'add_problem', problems: [problem]}, undefined);

        if ($('.problemcheck:checked').length == $('.problemcheck').length)
            $('#problemall').prop('checked', true);
    }

    else {

        chrome.runtime.sendMessage({operation: 'del_problem', problems: [problem]}, undefined);

        if ($('.problemcheck:checked').length != $('.problemcheck').length)
            $('#problemall').prop('checked', false);
    }
});
