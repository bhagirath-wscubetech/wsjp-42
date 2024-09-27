var headings = document.querySelectorAll(".box h2");
console.log(headings);

for (heading of headings) {
    heading.addEventListener(
        "click",
        function (event) {
            if (event.target.classList.contains("open-heading")) {
                event.target.classList.remove("open-heading");
                event.target.nextElementSibling.classList.remove("open");
                event.target.nextElementSibling.style.height = "";
            } else {
                var currentOpen = document.querySelector(".open");
                var openHeading = document.querySelector(".open-heading");
                if (currentOpen != null) {
                    currentOpen.classList.remove("open");
                    openHeading.classList.remove("open-heading");
                    currentOpen.style.height = "";
                }
                var nextP = event.target.nextElementSibling;
                event.target.classList.add("open-heading");
                nextP.classList.add("open");
                nextP.style.height = nextP.scrollHeight + 20 + "px";
            }

        }
    )
}