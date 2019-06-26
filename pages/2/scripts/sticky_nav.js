{
    window.onscroll = function () {
        myFunction();
    };
    var navbar = document.getElementById("nav");
    var sticky = 720;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        }
        else {
            navbar.classList.remove("sticky");
        }
    }
}