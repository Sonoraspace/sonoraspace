$(document).ready(function(){
    if($("#filters").length){
        // Is homepage
        $("#filters").append('<button id="filter-clear-homepage">Clear</button>');
        $("#filter-clear-homepage").click(function(e){
            e.preventDefault();
           $(".Logo")[0].click();
        });
    }

    if($(".new-listing-form").length) {
        // Listing new/edit page
        var formLoadingTimer = setInterval(checkIfFormLoaded, 500);

        function checkIfFormLoaded() {
            if ($("#listing_title").length > 0) {
                stopInterval();
                addDesriptionTexts();
            }
        }

        function stopInterval() {
            clearInterval(formLoadingTimer);
        }
    }


    function addDesriptionTexts(){
        $("form label").each(function(){
            if(listingFieldDescription[$(this).text()]){
                $('<div class="info-text-container"> <div class="info-text-icon"> <i class="ss-info"></i> </div> <div class="info-text-content"> <p>'+ listingFieldDescription[$(this).text()] + '</p> </div></div>').insertAfter($(this));

            }
        });
    }
});
