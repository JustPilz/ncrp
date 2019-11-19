Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

require(['gitbook'], function(gitbook) {

    gitbook.events.bind('page.change', function() {

        /* rewrite placeholder for search input */
        document.getElementById("book-search-input").firstElementChild.setAttribute("placeholder", "Поиск...");

        /* disable copyright */
        /*
        var x = document.getElementsByClassName("gitbook-link");
        x[0].style.display = "none";
        */
        //document.getElementsByClassName("gitbook-link").remove();
        //document.querySelector(".summary li:nth-child(2)").remove();
        //document.querySelector(".summary li:nth-child(1)").remove();

        var cl = document.querySelector(".custom-link");

        if(cl) {
            cl.href = "https://mafia2online.ru/";
            cl.removeAttribute('target');
        }

        document.getElementsByClassName("summary")[0].lastElementChild.remove();
        document.getElementsByClassName("summary")[0].lastElementChild.remove();

        var COLOR_THEMES = [
            {
                config: 'light',
                text: 'Light',
                id: 0
            },
            {
                config: 'dark',
                text: 'Dark',
                id: 2
            }
        ];

        gitbook.fontsettings.setThemes(COLOR_THEMES);

    });
});

