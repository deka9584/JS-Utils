//Remove paywalled content from some websites
//Bookmark: javascript:[PASTE FUNCTION]

(function antiPaywall(d, pm) {
    pm = pm || d.querySelector(".paywall_message");
    if (pm) {
        pm.remove();
    }

    Swal.close();

    fetch(window.location.href)
        .then(function (r) {
            return r.text();
        })
        .then(function (html) {
            var parser = new DOMParser();
            var parsedDoc = parser.parseFromString(html, 'text/html');
            var contents = parsedDoc.querySelectorAll(".paywalled_content");
            var intro = d.querySelector(".paywall_intro");

            if (intro) {
                for (var i = 0; i < contents.length; i++) {
                    var cont = contents[i];
                    cont.style.display = "block";
                    intro.insertAdjacentElement('beforebegin', cont);
                }

                intro.style.display = "none";
            }
        });
})(window.document);