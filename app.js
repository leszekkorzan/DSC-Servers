$(function(){
    const params = new URLSearchParams(window.location.search);
    const idparam = params.get('id');
    if(idparam){
        $("#login").hide();
        $("#general").show();
    }
    $("#join-btn").click(function(){
        $("#join-btn").addClass("hide");
        $("#join-btn").fadeOut();
        $("#gc").delay(500).slideDown();
    })
    $("#login-btn-show").click(function(){
        $("#login").fadeOut();
        $("#login-cnt").delay(360).slideDown();
    })
    $("#register-btn-show").click(function(){
        $("#login").fadeOut();
        $("#register-cnt").delay(360).slideDown();
    })
    //ok-btn
    $("#ok-btn").click(function(){
        location = location;
    })
    //add
    $("#add-btn").click(function(){
        var invite = document.getElementById("invite-inpt").value;
        var name = document.getElementById("name-invite-inpt").value;
        var url = document.getElementById("url-invite-inpt").value;
        if(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/.test(invite)){
            if(name && url){
                db.collection("invites").doc(url).set({
                    name: name,
                    invite: invite,
                    url: url
                })
                .then(function() {
                    console.log("Document successfully written!");
                    document.getElementById("add-err").innerHTML = "";
                    document.getElementById("ays").innerHTML = "Added!";
                    document.getElementById("generated-invite").innerHTML = "https://dsc-servers.web.app/" + url;
                    $("#add-inpts").slideUp();
                    $("#add-ok").delay(360).fadeIn();
                })
                .catch(function(error) {
                    document.getElementById("add-err").innerHTML = "This name is busy!";
                }); 
            }else{
                document.getElementById("add-err").innerHTML = "Error!";
            }

        }else{
            document.getElementById("add-err").innerHTML = "The link is not valid!";
        }

    })
})
var verifyCallback = function(response) {
    return new Promise(function(resolve, reject) {
        var data;
        if(response){
            data = {
                "key" : response,
                "success" : true,
            }
            if(data.success){
                location.replace("https://discordapp.com/invite/jUnuPDc");
            }
        } 
    })
}
//reset login
function resetlogin(){
    document.getElementById("email-inpt").value = "";
    document.getElementById("password-inpt").value = "";
}
//reset register
function resetregister(){
    document.getElementById("email-register").value = "";
    document.getElementById("password-register").value = "";
    document.getElementById("password2-register").value = "";
}
//reset add
function resetadd(){
    document.getElementById("invite-inpt").value = "";
    document.getElementById("name-invite-inpt").value = "";
    document.getElementById("url-invite-inpt").value = "";
}
// auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        resetlogin()
        $("#login").hide();
        $("#login-cnt").hide();
        $("#register-cnt").hide();
        $("#logged-cnt").fadeIn();
    }
});
// register
$("#register-btn").click(function(){
    // get user info
    const email = document.getElementById("email-register").value;
    const password = document.getElementById("password-register").value;
    const password2 = document.getElementById("password2-register").value;
    if(password === password2){
        // sign up the user
        auth.createUserWithEmailAndPassword(email, password).catch(function(error) {      
            var errorMessageReg = error.message;
            document.getElementById("register-err").innerHTML = errorMessageReg;  
        }).then(() => {
            resetregister();
        });
    }
    else{
        document.getElementById("register-err").innerHTML = "Passwords are not identical!";
    }

})
//login
$("#login-btn").click(function(){
    // get user info
    const emaillogin = document.getElementById("email-inpt").value;
    const passwordlogin = document.getElementById("password-inpt").value;

    // log the user in
    auth.signInWithEmailAndPassword(emaillogin, passwordlogin).catch(function(error) {
        var errorMessage = error.message;
        document.getElementById("login-err").innerHTML = errorMessage;
    });
})
//logout
$("#logout").click(function(){
    auth.signOut();
    document.getElementById("add-err").innerHTML = "";
    resetadd();
    $("#logged-cnt").hide();
    $("#login").fadeIn();
})