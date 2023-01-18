const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");
var count = 0; 
var mail_black_list=[];

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    // js code to appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });


var emailArray=[];
var passwordArray=[];

function register(){

    var email = document.getElementById("re").value;
    var password = document.getElementById("rp").value;
    var passwordRetype = document.getElementById("rrp").value;

    if (ValidateEmail(email) == false) 
        {
            return;
        }  

    if (email == ""){
        alert("Email required.");
        return ;
    }
    else if (password == ""){
        alert("Password required.");
        return ;
    }
    else if (passwordRetype == ""){
        alert("Password required.");
        return ;
    }
    else if ( password != passwordRetype ){
        alert("Password don't match retype your Password.");
        return;
    }
    else if(emailArray.indexOf(email) == -1){
        
        emailArray.push(email);
        passwordArray.push(password);

        alert(email + "  Thanks for registration. \nTry to login Now");

        document.getElementById("re").value ="";
        document.getElementById("rp").value="";
        document.getElementById("rrp").value="";

        localStorage.setItem('email', JSON.stringify(emailArray));
        localStorage.setItem('password', JSON.stringify(passwordArray));

        
        alert('Your account has been created');

    }
    else{
        alert(email + " is already register.");
        return ;
    }
}

function login_f(){
    
    var email = document.getElementById("se").value;
    var password = document.getElementById("sp").value;

    var storedEmail = localStorage.getItem('email');
    var storedPassword = localStorage.getItem('password');
    
    alert(`${storedEmail} `)
    alert(`${storedPassword}`)
    
    var i = emailArray.indexOf(email);


    if(storedEmail.includes(email) && storedPassword.includes(password)){
        document.getElementById("se").value ="";
        document.getElementById("sp").value="";
        document.location.href="pages/linkPage.html";
        return ;
    }else{
        alert('Error on login');
    }


    if(emailArray.indexOf(email) == -1){
        if (email == ""){
            alert("Email required.");
            return ;
        }
        
        alert("Email does not exist.");
        return ;
    }
    else if(passwordArray[i] != password){
        if (password == ""){
            alert("Password required.");
            return ;
        }
        alert("Password does not match.");
        count++;
        if (mail_black_list.includes(email))
        {
            alert(" your email is in the black list");
            return;
        }
        if (count>3)
        {
            alert(" you try too much time , your email was black listed");
            mail_black_list.push(email);
            return;
        }
        return ;
    }
    else {
        
        if (mail_black_list.includes(email))
        {
            alert(" your email is in the black list");
            return;
        }

        alert(email + " yor are login Now \n welcome to our website.");

        document.getElementById("se").value ="";
        document.getElementById("sp").value="";
        document.location.href="pages/linkPage.html";
        return ;
    }

}

function ValidateEmail(input) {
    
    var testX=new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (testX.test(input)) {
  
      alert("Valid email address!");
  
      return true;
  
    } else {
  
      alert("Invalid email address!");
  
      return false;
  
    }
  
  }