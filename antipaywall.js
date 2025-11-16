//Remove paywalled content from some websites
//Bookmark: javascript:[PASTE FUNCTION]

(function (document, fetch, Swal, DOMParser) {
    function restorePwContents () {
        var intro = document.querySelector(".paywall_intro");

        if (!intro) {
            return;
        }
        
        var pwm = document.querySelector(".paywall_message");

        if (pwm) {
            pwm.remove();
        }

        fetch(window.location.href)
            .then(function (r) {
                return r.text();
            })
            .then(function (html) {
                var parser = new DOMParser();
                var parsedDoc = parser.parseFromString(html, 'text/html');
                var contents = parsedDoc.querySelectorAll(".paywalled_content");
                
                for (var i = 0; i < contents.length; i++) {
                    var cont = contents[i];
                    cont.style.display = "block";
                    intro.insertAdjacentElement('beforebegin', cont);
                }

                intro.style.display = "none";
            });
    }

    function qiotaBypass () {
        document.querySelectorAll(".qiota_reserve").forEach(el => {
            el.style.removeProperty("height");
            el.style.removeProperty("overflow");
        });
    }

    function closeCookieOverlay () {
        const style = document.createElement("style");
        style.textContent = ".cookiewall, .privacy-cp-wall {display:none!important; opacity:0!important; visibility:hidden!important; pointer-events:none!important;}";
        document.head.append(style);

        if (Swal && typeof Swal.close === "function") {
            Swal.close();
        }

        document.querySelectorAll(".privacy-cp-wall, .iubenda-cs-banner").forEach(function (el) {
            el.remove();
        });

        document.body.classList.remove("noScroll");
    }

    restorePwContents();
    qiotaBypass();
    closeCookieOverlay();
})(window.document, window.fetch, window.Swal, window.DOMParser);