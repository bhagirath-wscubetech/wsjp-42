var inpbox = document.getElementById("inpbox");
var itemBox = document.getElementById("item-box");

inpbox.addEventListener(
    "keyup",
    function(e){
        if(e.key == "Enter"){
            addItem();
        }
    }
)


function addItem() {
    // var item = inpbox.value;
    if (inpbox.value != "") {
        var li = document.createElement("li");
        li.innerHTML = `${inpbox.value} <span>X</span>`;

        // console.log(li.children[0]);
        li.children[0].addEventListener(
            "click",
            function () {
                li.remove();
            }
        )

        // dynamic event binding
        li.addEventListener(
            "click", // event
            function () { // callback
                // console.log('hii');
                li.classList.toggle("done");
            }
        )

        li.addEventListener(
            "contextmenu",
            function (event) {
                event.preventDefault(); // prevent default
                li.remove();
            }
        )

        inpbox.value = "";
        // itemBox.append(li);
        itemBox.prepend(li);
    }
}