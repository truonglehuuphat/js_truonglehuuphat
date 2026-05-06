var a = 1;
var b = 2;
var pheptinh = 'cong';
var ketqua = null;
if(pheptinh == 'cong'){
    ketqua = a + b;
} else if(pheptinh == 'tru'){
    ketqua = a - b;
} else if(pheptinh == 'nhan'){
    ketqua = a * b;
} else if(pheptinh == 'chia'){
    if(b==0){
        console.log("b khong duoc bang 0");
    } else {
        ketqua=a/b;
    }
}
console.log(ketqua);

function hello(fullname){
    alert("Hello " + fullname);
}

function myAge(){
    return 38;
}

function yourAge(yourBirthYear){
    return 2026 -yourBirthYear;
}

let x = myAge() + yourAge(1990);
let y = yourAge(myAge())
console.log(x);
console.log(y);

function phepNhan(pt){
    let a = Number(document.getElementById('giaTriA').value);
    let b = Number(document.getElementById('giaTriB').value);
    let c = null;
    if(pt=='cong'){
        c = a + b;
    } else if (pt == 'tru'){
        c = a - b;
    } else if (pt == 'nhan'){
        c = a * b;
    } else if(pt == 'chia') {
        if(b == 0){
            document.getElementById('ketqua').innerHTML = "khong the chia cho 0";
            return;
        } else {
            c = a / b;
        }
    }
    document.getElementById('ketqua').innerHTML = c;
}

function cong(){
    let a = document.getElementById('a').value;
    let b = document.getElementById('b').value;
    a = parseInt(a);
    b = parseInt(b);
    let c = a + b;
    document.getElementById('ketqua').innerHTML = c;
}

function tru(){
    let a = document.getElementById('a').value;
    let b = document.getElementById('b').value;
    a = parseInt(a);
    b = parseInt(b);
    let c = a - b;
    document.getElementById('ketqua').innerHTML = c;    
}

function nhan(){    
    let a = document.getElementById('a').value;
    let b = document.getElementById('b').value;
    a = parseInt(a);
    b = parseInt(b);
    let c = a * b;
    document.getElementById('ketqua').innerHTML = c;    
}

function chia(){
    let a = document.getElementById('a').value;
    let b = document.getElementById('b').value;
    a = parseInt(a);
    b = parseInt(b);
    if(b == 0){
        document.getElementById('ketqua').innerHTML = "khong the chia cho 0";        
    } else {
        let c = a /b;
        document.getElementById('ketqua').innerHTML = c;    
    }
}