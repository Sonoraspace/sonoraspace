
$(document).ready(function () {
    addClearButton();
    addDescriptions();
    hideAvailabilityLink();
    hideYoutubeLink();
    displaySessionSelectBoxOnCheckout();
    displaySelectTimeSlotButton();
    changeTextOfQuantity();

    function addClearButton() {
        if ($("#filters").length) {
            // Is homepage
            $("#filters").append('<button id="filter-clear-homepage">Clear</button>');
            $("#filter-clear-homepage").click(function (e) {
                e.preventDefault();
                $(".Logo")[0].click();
            });
        }
    }


    function addDescriptions() {
        if ($(".new-listing-form").length) {
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

            function addDesriptionTexts() {
                $("form label").each(function () {
                    if (listingFieldDescription[$(this).text()]) {
                        $('<div class="info-text-container"> <div class="info-text-icon"> <i class="ss-info"></i> </div> <div class="info-text-content"> <p>' + listingFieldDescription[$(this).text()] + '</p> </div></div>').insertAfter($(this));
                    }
                    if ($(this).text() == 'Listing title*') {
                        $(this).text("Your name*")
                    }
                });
            }

        }
    }

    function hideAvailabilityLink() {
        if ($(".listing-details-container").length) {
            $("b").each(function () {
                if ($(this).text() == '30 mins - Availability calendar:' || $(this).text() == '1h - Availability calendar:') {
                    $(this).parent().parent().hide();
                }
            });
        }
    }

    function hideYoutubeLink() {
        if ($(".listing-details-container").length) {
            var youtubeLink = $('.listing-details-container a');
            $.each(youtubeLink, function (index, elem) {
                url = $(elem).attr('href');
                if (url.includes("youtube") || url.includes("youtu")) {
                    $(elem).addClass("hide-font hide");
                }
            })
        }

    }

    function displaySessionSelectBoxOnCheckout() {
        if ($("#booking-dates").length) {
            var s = $('<select id="sessionLength"/>');

            $('<option />', {value: null, text: "Select one"}).appendTo(s);

            $('<option />', {value: 1, text: '30 mins'}).appendTo(s);
            $('<option />', {value: 2, text: '1 hr'}).appendTo(s);

            s.prependTo($('.quantity-input'));
            $("#quantity").val('');

            $("#sessionLength").change(function () {
                $("#quantity").val($(this).val());
            })

            setInterval(function () {
                if ($("#quantity-error").length) {
                    $("#quantity-error").text("Please select a session length.")
                }
            }, 10)

        }
    }

    function quantity() {
        var selectedQuantity = parseInt($(".initiate-transaction-quantity-value").text())
        var correctedQuantity = -1;

        if(Number.isNaN(selectedQuantity)){
            correctedQuantity = 1; // Sharetribe hides the quantity if 1.
        }
        if (selectedQuantity==2) {
            correctedQuantity = 2;
        }
        return correctedQuantity;
    }

    function displaySelectTimeSlotButton() {
        if($("#transaction_status .confirm").length == 1){
            var link = availabilityLink(quantity());
            $('<div><a href="'+ link +'" id="displayCalenderPopup" data-featherlight="iframe" style="color: #fff; background: red; display: block;"  class="display-calender-popup button">Select time slot</a></div>').insertAfter($('.inbox-horizontally-aligned-status')[0]);
            $('<div><a href="'+ link +'" id="displayCalenderPopup1" target="_blank" style="color: #fff; background: red; display: block;"  class="display-calender-popup button">Select time slot</a></div>').insertAfter($('#displayCalenderPopup'));
        }

    }

    function changeTextOfQuantity(){
        if(parseInt($(".initiate-transaction-quantity-value").text()) == 2){
            $(".initiate-transaction-quantity-value").text("1 hr.")
        }

    }

    function httpGet(theUrl) {
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    function listingURL() {
        return (window.location.origin + $("h2 a").attr("href"));
    }

    function availabilityLink(quanity) {
        var bodyListingPageContent = httpGet(listingURL());
        var link = '';
        $(bodyListingPageContent).find(".listing-details-container b").each(function () {
            if (quanity == 1 && $(this).text() == '30 mins - Availability calendar:') {
                link = $(this).parent().find("a").attr("href");
            }else if (quanity == 2 && $(this).text() == '1h - Availability calendar:') {
                link = $(this).parent().find("a").attr("href");
            }
        });
        return link;
    }


});
