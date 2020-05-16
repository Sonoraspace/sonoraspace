$(document).ready(function(){
    addClearButton();
    addDescriptions();
    hideAvailabilityLink();
    hideYoutubeLink();

    function addClearButton(){
        if($("#filters").length){
            // Is homepage
            $("#filters").append('<button id="filter-clear-homepage">Clear</button>');
            $("#filter-clear-homepage").click(function(e){
                e.preventDefault();
                $(".Logo")[0].click();
            });
        }
    }


    function addDescriptions(){
        if($(".new-listing-form").length) {
            // Listing new/edit page
            var formLoadingTimer = setInterval(checkIfFormLoaded, 200);

            function checkIfFormLoaded() {
                if ($("#listing_title").length > 0) {
                    stopInterval();
                    addDesriptionTexts();
                }
            }

            function stopInterval() {
                clearInterval(formLoadingTimer);
            }

            function addDesriptionTexts(){
                $("form label").each(function(){
                    if(listingFieldDescription[$(this).text()]){
                        $('<div class="info-text-container"> <div class="info-text-icon"> <i class="ss-info"></i> </div> <div class="info-text-content"> <p>'+ listingFieldDescription[$(this).text()] + '</p> </div></div>').insertAfter($(this));
                    }
                    if($(this).text() == 'Listing title*'){
                        $(this).text("Your name*")
                    }
                });
            }

        }
    }

    function hideAvailabilityLink(){

        if($(".listing-details-container").length){
            $("b").each(function () {
                if($(this).text() == '30 mins - Availability calendar:' || $(this).text() == '1h - Availability calendar:'){
                    $(this).parent().parent().hide();
                }
            });
        }
    }
    function hideYoutubeLink(){
        if($(".listing-details-container").length) {
            var youtubeLink = $('.listing-details-container a');
            $.each(youtubeLink, function (index, elem) {
                url = $(elem).attr('href');
                if (url.includes("youtube") || url.includes("youtu")) {
                    $(elem).addClass("hide-font hide");
                }
            })
        }

    }

    displaySessionSelectBoxOnCheckout();
    function displaySessionSelectBoxOnCheckout(){
        if($("#booking-dates").length){
            var s = $('<select id="sessionLength"/>');

            $('<option />', {value: null, text: "Select one"}).appendTo(s);

            $('<option />', {value: 1, text: '30 mins'}).appendTo(s);
            $('<option />', {value: 2, text: '1 hr'}).appendTo(s);

            s.prependTo($('.quantity-input'));
            $("#quantity").val('');

            $("#sessionLength").change(function(){
                $("#quantity").val($(this).val());
            })

            setInterval(function(){
                if($("#quantity-error").length){
                    $("#quantity-error").text("Please select a session length.")
                }
            }, 10)

        }
    }
});
