/**
 * Created by sara.nielsen on 3/23/2017.
 */

<!-- AJAX Post -->
function logout() {

    var url = "api/logout_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        getLogin();
    });
}

function getLogin() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        $('#getSessionResult').html(dataFromServer);
        var trim = $.trim(dataFromServer);
        console.log("DataFromServer: " + dataFromServer);
        if(trim === 'null')
        {
            $("#logout").hide();
            console.log("Logout Hidden")
        }
        else
        {
            $("#logout").show();
            console.log("Logout Shown")
        }
    });
}

function login() {

    var url = "api/set_login_servlet";

    var loginValue = $("#loginId").val();
    var loginKey = "loginId";

    var dataToServer = {loginKey : loginKey, loginValue : loginValue};

    $.post(url, dataToServer, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        $("#loginId").val("");
        getLogin();
    });
}

getLogin();

button = $('#getLoginButton');
button.on("click", getLogin);

button = $('#loginButton');
button.on("click", login);

button = $('#logoutButton');
button.on("click", logout);