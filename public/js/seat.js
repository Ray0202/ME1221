function bookSeat(a){
    const sendData= "username=" + globalUsername + "&seat=" + a;
    console.log(sendData);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/seat", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(sendData);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let responseText = this.responseText;
            alert(responseText);
        }
    }
}

function loadSeat() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let myArr = JSON.parse(this.responseText);
            console.log("good news");
            myFunction(myArr)
        }
    }
    xmlhttp.open("GET", "/new.json", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();
} 

function myFunction(arr) {
    let i;
    for (i = 0; i < arr.length; i++) {
        if(arr[i]){
            document.getElementById(i.toString()+i.toString()).innerHTML = "空闲"; 
            document.getElementById(i.toString()).className = "list-group-item list-group-item-success";        
        }else{
            document.getElementById(i.toString()+i.toString()).innerHTML = "有人";
            document.getElementById(i.toString()).className = "list-group-item list-group-item-danger";
        }
    }
}