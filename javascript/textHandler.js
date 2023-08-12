window.addEventListener("DOMContentLoaded", (event) => {
    var abtmeText = document.querySelector('#abt_me_text p').innerHTML;
    while(abtmeText.includes('[s]')) {
        var before = abtmeText.substring(0, abtmeText.indexOf('[s]'));
        var after = abtmeText.substring(abtmeText.indexOf('[s/]') + 4, abtmeText.length);
        sText = abtmeText.substring(abtmeText.indexOf('[s]') + 4, abtmeText.indexOf('[s/]')-1);
        document.querySelector('#abt_me_text p').innerHTML = before + "<span class='striked'>" + sText + "</span>" + after;
        abtmeText = document.querySelector('#abt_me_text p').innerHTML;
    }

    while(abtmeText.includes('[u]')) {
        var before = abtmeText.substring(0, abtmeText.indexOf('[u]'));
        var after = abtmeText.substring(abtmeText.indexOf('[u/]') + 4, abtmeText.length);
        sText = abtmeText.substring(abtmeText.indexOf('[u]') + 4, abtmeText.indexOf('[u/]')-1);
        document.querySelector('#abt_me_text p').innerHTML = before + "<span class='underlined'>" + sText + "</span>" + after;
        abtmeText = document.querySelector('#abt_me_text p').innerHTML;
    }

    while(abtmeText.includes('[i]')) {
        var before = abtmeText.substring(0, abtmeText.indexOf('[i]'));
        var after = abtmeText.substring(abtmeText.indexOf('[i/]') + 4, abtmeText.length);
        sText = abtmeText.substring(abtmeText.indexOf('[i]') + 4, abtmeText.indexOf('[i/]')-1);
        document.querySelector('#abt_me_text p').innerHTML = before + "<span class='cursive'>" + sText + "</span>" + after;
        abtmeText = document.querySelector('#abt_me_text p').innerHTML;
    }

    while(abtmeText.includes('[b]')) {
        var before = abtmeText.substring(0, abtmeText.indexOf('[b]'));
        var after = abtmeText.substring(abtmeText.indexOf('[b/]') + 4, abtmeText.length);
        sText = abtmeText.substring(abtmeText.indexOf('[b]') + 4, abtmeText.indexOf('[b/]')-1);
        document.querySelector('#abt_me_text p').innerHTML = before + "<span class='bold'>" + sText + "</span>" + after;
        abtmeText = document.querySelector('#abt_me_text p').innerHTML;
    }

    while(abtmeText.includes('[n/]')) {
        var before = abtmeText.substring(0, abtmeText.indexOf('[n/]'));
        var after = abtmeText.substring(abtmeText.indexOf('[n/]') + 4, abtmeText.length);
        document.querySelector('#abt_me_text p').innerHTML = before + "<br>" + after;
        abtmeText = document.querySelector('#abt_me_text p').innerHTML;
    }
});