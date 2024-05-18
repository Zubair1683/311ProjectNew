$(document).ready(function() {
    evaluatePagging();
   

    $("#downButton").click(function() {

        let num = parseInt($("#projNum").attr("value"));

        if(num < 4)
        num++;
        
        $("#projNum").attr("value", num);
        $("#projNum").empty().append(num);

        $.getJSON("https://zubair1683.github.io/311ProjectNew/jsonFiles/projectDatas.json", function(data) {
            $.each(data.projects, function(key, value) {
                if (key === "project" + num) {
                    $(".project").empty().append("<div  class=\"projectTop\"> <h1>" + value.title + "</h1>" +
                     "<div  class=\"info\">" + value.info + "</div>" + "</div>" + 
                    "<div  id=\"pPhoto\"> <a" + " href=\""+ value.link + "\"  class=\"imagebutton\">" +  
                    "<img src=\""+ value.imageURL + "\"  alt=\"Project-1\">" + "</a> </div> </div>");
                }
            });
            evaluatePagging();
        });
    });

    $("#upButton").click(function() {

        let num = parseInt($("#projNum").attr("value"));

        if(num > 1)
        num--;

        $("#projNum").attr("value", num);
        $("#projNum").empty().append(num);

        $.getJSON("https://zubair1683.github.io/311ProjectNew/jsonFiles/projectDatas.json", function(data) {
            $.each(data.projects, function(key, value) {
                if (key === "project" + num) {
                    $(".project").empty().append("<div  class=\"projectTop\"> <h1>" + value.title + "</h1>" +
                     "<div  class=\"info\">" + value.info + "</div>" + "</div>" + 
                    "<div  id=\"pPhoto\"> <a" + " href=\""+ value.link + "\"  class=\"imagebutton\">" +  
                    "<img src=\""+ value.imageURL + "\"  alt=\"Project-1\">" + "</a> </div> </div>");
                }
            });
            evaluatePagging();
        });
    });
});

function evaluatePagging(){
    if ($("#projNum").attr("value") == "1") {
        $("#upButton").css("border", "none");
        $("#upButton").empty().append("");
    } else if ($("#projNum").attr("value") == "4") {
        $("#downButton").css("border", "none");
        $("#downButton").empty().append("");
    }
    else{
        $("#downButton").css("display", "block");
        $("#upButton").css("display", "block");
        $("#upButton").empty().append("&#8593;");
        $("#downButton").empty().append("&#8595;");
        $("#upButton").css("border", "2px outset #464646");
        $("#downButton").css("border", "2px outset #464646");
    }


    $(document).ready(function () {
        // When hovering over an image with the class 'imagebutton'
        $('.imagebutton').hover(function () {
          // Increase the image size on hover
          $(this).find('img').css({
            'transform': 'scale(1.05)', // Scale factor
            'transition': 'transform 0.5s ease' // Smooth transition
          });
        }, function () {
          // Restore the original size when mouse leaves
          $(this).find('img').css({
            'transform': 'scale(1)', // Original scale
            'transition': 'transform 0.5s ease' // Smooth transition
          });
        });
      });
}


