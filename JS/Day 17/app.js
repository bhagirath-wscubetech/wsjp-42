var container = document.getElementById("container");
var addBtn = document.getElementById("add-btn");

window.addEventListener(
    "keydown",
    function (e) {
        if (e.code == "KeyV" && e.shiftKey == true && e.ctrlKey == true) {
            e.preventDefault();
            addBtn.click();
        }
    }
);
addBtn.addEventListener(
    "click",
    function () {
        var box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `<div class="tray">
            <button>Delete</button>
        </div>
        <textarea name="" id=""></textarea>`;

        var btn = box.children[0].children[0];
        btn.addEventListener(
            "dblclick",
            function () {
                // btn.parentNode.parentNode.remove();
                box.remove();
            }
        )

        container.append(box);
    }
)
