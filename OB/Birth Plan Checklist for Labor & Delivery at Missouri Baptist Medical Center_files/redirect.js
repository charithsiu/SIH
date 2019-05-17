// Fix Array.indexOf() issue on IE7
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    };
}
function httpsRedirect(securePages) {
    //redirect to secure pages
    var currentPage = window.location.pathname;
    for (var i = 0; i < securePages.length; i++) {
        securePages[i] = securePages[i].toLowerCase().replace(".aspx", "");
    }

    if (securePages.indexOf(currentPage.toLowerCase().replace(".aspx", "")) >= 0) {
        if (location.href.indexOf("https:") < 0) {
            var secureURL = location.href.replace("http:", "https:");
            location.href = secureURL;
        }
    }
    else if (location.href.indexOf("https:") > -1) {
        var unsecureURL = location.href.replace("https:", "http:");
        location.href = unsecureURL;
    }
}