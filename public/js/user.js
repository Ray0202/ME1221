let globalUsername;

function myregister() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const sendData= "username=" + username + "&password=" + password;
    console.log(sendData);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/register", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(sendData);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let responseText = this.responseText;
            alert(responseText);
        }
    }
}

function mylogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const sendData = "username=" + username + "&password=" + password;
    console.log(sendData);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/login", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(sendData);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let responseText = this.responseText;
            alert(responseText);
            if(responseText==="Login successful"){
                globalUsername = username;
            }
        }
    }
}

function passwordVisible(){
    const password = document.getElementById("password");
    const passwordVisible= document.getElementById("passwordVisible");
    if(password.type === "password"){
        password.type = "text";
        passwordVisible.innerHTML = "隐藏密码";
    }else{
        password.type = "password";
        passwordVisible.innerHTML = "显示密码";
    }
}