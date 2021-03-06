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
            row += "<td><button type='button' name='editButton' class='editButton btn' value='" + id + "'>Edit</button></td>";
            row += "<td><button type='button' name='deleteButton' class='deleteButton btn' value='" + id + "'>Delete</button></td>";
            row += '</tr>';
            $('#datatable tbody').append(row);

            var deleteButtons = $(".deleteButton");
            deleteButtons.on("click", deleteItem);
            deleteButtons.on("click", jqueryPostButtonDelete);

            var editButtons = $(".editButton");
            editButtons.on("click", editItem);
            editButtons.on("click", showDialogEdit);
        }
        console.log("Table Updated");

    })
}

function clearTable() {
    $('#datatable tbody').empty();
    console.log("Table Cleared");
}

function deleteItem(e) {
    console.debug("Delete");
    console.debug(e.target.value);
}

function editItem(e) {
    console.debug("Edit");
    console.debug(e.target.value);
}

// Called when "Add Item" button is clicked
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthday').val("");

    $('#firstNameDiv').removeClass("has-success");
    $('#firstNameDiv').removeClass("has-error");
    $('#firstNameGlyph').removeClass("glyphicon-ok");
    $('#firstNameGlyph').removeClass("glyphicon-remove");

    $('#lastNameDiv').removeClass("has-success");
    $('#lastNameDiv').removeClass("has-error");
    $('#lastNameGlyph').removeClass("glyphicon-ok");
    $('#lastNameGlyph').removeClass("glyphicon-remove");

    $('#emailDiv').removeClass("has-success");
    $('#emailDiv').removeClass("has-error");
    $('#emailGlyph').removeClass("glyphicon-ok");
    $('#emailGlyph').removeClass("glyphicon-remove");

    $('#phoneDiv').removeClass("has-success");
    $('#phoneDiv').removeClass("has-error");
    $('#phoneGlyph').removeClass("glyphicon-ok");
    $('#phoneGlyph').removeClass("glyphicon-remove");

    $('#birthdayDiv').removeClass("has-success");
    $('#birthdayDiv').removeClass("has-error");
    $('#birthdayGlyph').removeClass("glyphicon-ok");
    $('#birthdayGlyph').removeClass("glyphicon-remove");

    console.log("Form cleared");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

// Called when "Edit Item" button is clicked
function showDialogEdit(e) {

    // Print that we got here
    console.log("Opening edit item dialog");

    //Grab values for field
    var id = e.target.value;
    var firstName =  e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    var lastName = e.target.parentNode.parentNode.querySelectorAll("td")[2].innerHTML;
    var email = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    var phone = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
    phone = phone.split("-").join("");
    var birthday = e.target.parentNode.parentNode.querySelectorAll("td")[5].innerHTML;

    $('#id').val(id);
    $('#firstName').val(firstName);
    $('#lastName').val(lastName);
    $('#email').val(email);
    $('#phone').val(phone);
    $('#birthday').val(birthday);

    $('#firstNameDiv').removeClass("has-success");
    $('#firstNameDiv').removeClass("has-error");
    $('#firstNameGlyph').removeClass("glyphicon-ok");
    $('#firstNameGlyph').removeClass("glyphicon-remove");

    $('#lastNameDiv').removeClass("has-success");
    $('#lastNameDiv').removeClass("has-error");
    $('#lastNameGlyph').removeClass("glyphicon-ok");
    $('#lastNameGlyph').removeClass("glyphicon-remove");

    $('#emailDiv').removeClass("has-success");
    $('#emailDiv').removeClass("has-error");
    $('#emailGlyph').removeClass("glyphicon-ok");
    $('#emailGlyph').removeClass("glyphicon-remove");

    $('#phoneDiv').removeClass("has-success");
    $('#phoneDiv').removeClass("has-error");
    $('#phoneGlyph').removeClass("glyphicon-ok");
    $('#phoneGlyph').removeClass("glyphicon-remove");

    $('#birthdayDiv').removeClass("has-success");
    $('#birthdayDiv').removeClass("has-error");
    $('#birthdayGlyph').removeClass("glyphicon-ok");
    $('#birthdayGlyph').removeClass("glyphicon-remove");

    console.log("Form cleared");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

function validate() {
    var valid_form = true;

    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var birthday = $('#birthday').val();

    var nameReg = /^[^{L}]{1,30}$/;
    var emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    var phoneReg = /^[0-9]{10}$/;
    var birthdayReg = /^(19[0-9][0-9]|20[0-9][0-9])-(0[1-9]|1[1,2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;

    if(nameReg.test(firstName)){
        console.log("Firstname Ok");
        // Set style for outline of form field
        $('#firstNameDiv').removeClass("has-error");
        $('#firstNameDiv').addClass("has-success");

        // Set the icon for the form field
        $('#firstNameGlyph').removeClass("glyphicon-remove");
        $('#firstNameGlyph').addClass("glyphicon-ok");

        // Put in the field used by screen readers
        $('firstNameStatus').val("(success)");
    }
    else{
        console.log("Firstname Bad");
        valid_form = false;
        // Set style for outline of form field
        $('#firstNameDiv').removeClass("has-success");
        $('#firstNameDiv').addClass("has-error");

        // Set the icon for the form field
        $('#firstNameGlyph').removeClass("glyphicon-ok");
        $('#firstNameGlyph').addClass("glyphicon-remove");

        // Put in the field used by screen readers
        $('firstNameStatus').val("(failure)");
    }

    //last name
    if(nameReg.test(lastName)){
        console.log("Lastname Ok");
        // Set style for outline of form field
        $('#lastNameDiv').removeClass("has-error");
        $('#lastNameDiv').addClass("has-success");

        // Set the icon for the form field
        $('#lastNameGlyph').removeClass("glyphicon-remove");
        $('#lastNameGlyph').addClass("glyphicon-ok");

        // Put in the field used by screen readers
        $('lastNameStatus').val("(success)");
    }
    else{
        console.log("Lastname Bad");
        valid_form = false;
        // Set style for outline of form field
        $('#lasstNameDiv').removeClass("has-success");
        $('#lastNameDiv').addClass("has-error");

        // Set the icon for the form field
        $('#lastNameGlyph').removeClass("glyphicon-ok");
        $('#lastNameGlyph').addClass("glyphicon-remove");

        // Put in the field used by screen readers
        $('lastNameStatus').val("(failure)");
    }

    //email
    if(emailReg.test(email)){
        console.log("Email Ok");
        // Set style for outline of form field
        $('#emailDiv').removeClass("has-error");
        $('#emailDiv').addClass("has-success");

        // Set the icon for the form field
        $('#emailGlyph').removeClass("glyphicon-remove");
        $('#emailGlyph').addClass("glyphicon-ok");

        // Put in the field used by screen readers
        $('emailStatus').val("(success)");
    }
    else{
        console.log("Email Bad");
        valid_form = false;
        // Set style for outline of form field
        $('#emailDiv').removeClass("has-success");
        $('#emailDiv').addClass("has-error");

        // Set the icon for the form field
        $('#emailGlyph').removeClass("glyphicon-ok");
        $('#emailGlyph').addClass("glyphicon-remove");

        // Put in the field used by screen readers
        $('emailStatus').val("(failure)");
    }

    //phone number
    if(phoneReg.test(phone)){
        console.log("Phone Number Ok");
        // Set style for outline of form field
        $('#phoneDiv').removeClass("has-error");
        $('#phoneDiv').addClass("has-success");

        // Set the icon for the form field
        $('#phoneGlyph').removeClass("glyphicon-remove");
        $('#phoneGlyph').addClass("glyphicon-ok");

        // Put in the field used by screen readers
        $('phoneStatus').val("(success)");
    }
    else{
        console.log("Phone Number Bad");
        valid_form = false;
        // Set style for outline of form field
        $('#phoneDiv').removeClass("has-success");
        $('#phoneDiv').addClass("has-error");

        // Set the icon for the form field
        $('#phoneGlyph').removeClass("glyphicon-ok");
        $('#phoneGlyph').addClass("glyphicon-remove");

        // Put in the field used by screen readers
        $('phoneStatus').val("(failure)");
    }

    //birthday
    if(birthdayReg.test(birthday)){
        console.log("Birthday Ok");
        // Set style for outline of form field
        $('#birthdayDiv').removeClass("has-error");
        $('#birthdayDiv').addClass("has-success");

        // Set the icon for the form field
        $('#birthdayGlyph').removeClass("glyphicon-remove");
        $('#birthdayGlyph').addClass("glyphicon-ok");

        // Put in the field used by screen readers
        $('birthdayStatus').val("(success)");
    }
    else{
        console.log("Birthday Bad");
        valid_form = false;
        // Set style for outline of form field
        $('#birthdayDiv').removeClass("has-success");
        $('#birthdayDiv').addClass("has-error");

        // Set the icon for the form field
        $('#birthdayGlyph').removeClass("glyphicon-ok");
        $('#birthdayGlyph').addClass("glyphicon-remove");

        // Put in the field used by screen readers
        $('birthdayStatus').val("(failure)");
    }

    return valid_form;
}
//Called when "Save Changes" button is clicked
function saveChanges() {
    validate();
    console.log("Changes Saved");
}

<!-- AJAX Post -->
function jqueryPostButtonAdd() {

    if (validate() == true) {
        var url = "api/name_list_edit";
        var id = $("#id").val();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var birthday = $("#birthday").val();

        var dataToServer = {id : id, firstName: firstName, lastName: lastName, email: email, phone: phone, birthday: birthday};

        console.log(dataToServer);

        $.post(url, dataToServer, function (dataFromServer) {
            console.log("Finished calling servlet.");
            console.log(dataFromServer);
            clearTable();
            updateTable();
            $('#myModal').modal('hide');
        });
    }
    else console.log("Invalid form");
}

function jqueryPostButtonDelete(e) {

    var url = "api/name_list_delete";
    var id = e.target.value;

    var dataToServer = {id: id};

    console.log(dataToServer);

    $.post(url, dataToServer, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        clearTable();
        updateTable();
    });
}

// Call your code.
updateTable();

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

var saveButton = $('#saveChanges');
saveButton.on("click", saveChanges);
saveButton.on("click", jqueryPostButtonAdd);
