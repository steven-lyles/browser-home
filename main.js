//=====================================================================================
// Finds the index of a quote with the desired string
function get_quote_index_for(str) {
    let max = config.quotes.length - 1;
    let i = parseInt(Math.random() * (max - 0) + 0);
    $.each(config.quotes, function(index, value) {
        if (value.text.includes(str)) { i = index; }
    });
    return i;
};

//=====================================================================================
$(document).ready(function() {
    //---------------------------------------------------
    // build the link divs from config and add to flexbox
    $.each(config.links, function (index, entry) {
        let icon = entry.icon;
        if (entry.icon == "") { icon = "./icons/url.png"; } // handle no icon
        let node =
            "    <div>\n" +
            "      <a href='" + entry.link + "'><img class='link' src='" + icon + "'></a>\n" +
            "      <div class='desc'>" + entry.desc + "</div>\n" +
            "    </div>";
        $("#link-container").append(node);
    });

    //----------------------------
    // Pick a background at random
    let mx = background.images.length;
    let image_index = parseInt(Math.random() * mx);
    // image_index = 72; // uncomment to set always to particular image by index
    let img = background.images[image_index];

    //-------------------------------
    // Set the image style attributes
    switch(img.position) {
        case "top":
            $(".quote-div").css("align-items", "flex-start");
            break;
        case "middle":
            $(".quote-div").css("align-items", "center");
            break;
        case "bottom":
            $(".quote-div").css("align-items", "flex-end");
            break;
    }
    let url = "url('" + img.pathname + "')";
    $(".bg").css("background-image" , url);
    $(".desc").css("color", img.desc_color);
    $("#quote").css("color", img.quote_color);
    $("#quote-credit").css("color", img.quote_color);

    let quote = {}
    if ("quote" in img) { // image has its own quote
        quote = img["quote"]
    } else { // pick a random quote from the list
        let max = config.quotes.length - 1;
        let quote_index = parseInt(Math.random() * (max - 0) + 0);
        quote = config.quotes[quote_index];
    }
    $("#quote").text("\" " + quote.text + " \"");
    $("#quote-credit").text("~ " + quote.credit);

});