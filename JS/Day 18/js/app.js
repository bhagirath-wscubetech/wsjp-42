var items = document.querySelectorAll("#tab-parent li");
var boxes = document.querySelectorAll(".box");

for (item of items) {
    item.addEventListener(
        "click",
        function (event) {
            var currentActive = document.querySelector(".active");
            currentActive.classList.remove("active");

            var currentOpen = document.querySelector(".open");
            currentOpen.classList.remove("open");

            var index = event.target.dataset.index;
            boxes[index].classList.add("open");

            event.target.classList.add("active");
        }
    );
}