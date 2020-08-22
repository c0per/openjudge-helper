$('thead tr').prepend($('<td>纳入统计</td>'));
let checkboxTd = $('<td><input class="usercheck" type="checkbox" /></td>');
$('tbody tr').prepend(checkboxTd);

chrome.storage.sync.get('students', function(data) {
    data.students.forEach(function(student) {
        //alert('.submit-user:contains(' + student.userName + ')');
        let td = $('.submit-user:contains(' + student.userName + ')');
        td.each(function() {
            //alert('yes');
            $(this).siblings(':first').children().prop('checked', true);
        });
    });
});

$('.usercheck').change(function() {
    let userId = $(this).parent().siblings('.submit-user').children().prop('href').match(/[0-9]+/)[0];
    let userName = $(this).parent().siblings('.submit-user').children().text();
    if ($(this).prop('checked')) {
        chrome.runtime.sendMessage({operation: 'add_student', userId: userId, userName: userName}, undefined);
        $('.usercheck').each(function() {
            if ($(this).parent().siblings('.submit-user').children().text() == userName) {
                $(this).prop('checked', true);
            }
        });
    }
    else {
        chrome.runtime.sendMessage({operation: 'del_student', userId: userId, userName: userName}, undefined);
        $('.usercheck').each(function() {
            if ($(this).parent().siblings('.submit-user').children().text() == userName) {
                $(this).prop('checked', false);
            }
        });
    }
});
