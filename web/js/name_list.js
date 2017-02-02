/**
 * Created by sara.nielsen on 1/31/2017.
 */
// Main Javascript File

function updateTable() {
    // Here's where your code is going to go.
    var url = "api/name_list_get";

    $.getJSON(url, null, function(json_result) {
        // json_result is an object. You can set a breakpoint, or print
        // it to see the fields. Specifically, it is an array of objects.
        // Here we loop the array and print the first name.
        for (var i = 0; i < json_result.length; i++) {
            var id = json_result[i].id;
            var firstName = json_result[i].first;
            var lastName = json_result[i].last;
            var email = json_result[i].email;
            var phone = json_result[i].phone;
            var phoneDash = phone.substr(0,3) + '-' + phone.substr(3,3) + '-' + phone.substr(6,4);
            var birthday = json_result[i].birthday;

            var row ='<tr>';
            row += '<td>' + id + '</td>';
            row += '<td>' + firstName + '</td>';
            row += '<td>' + lastName + '</td>';
            row += '<td>' + email + '</td>';
            row += '<td>' + phoneDash + '</td>';
            row += '<td>' + birthday + '</td>';
            row += '</tr>';
            $('#datatable tbody').append(row);
        }
        console.log("Done");

    })
}

// Call your code.
updateTable();