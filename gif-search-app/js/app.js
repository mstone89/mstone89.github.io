$(() => {
    // =========================
    // global variables
    // =========================

    const $mainContainer = $('.main-container');

    // =========================
    // global functions
    // =========================

    // render data function
    //// if a title is unavailable, add keyword search text as title
    const renderData = (limit, apiData, userInput) => {
        for (let i = 0; i < limit; i++) {
            const $divGif = $('<div>').addClass('gif-container');
            const $divGifTitle = $('<div>').addClass('gif-title');
            if (apiData.data[i].title === ' ' || apiData.data[i].title === '') {
                $divGifTitle.text(userInput + ' GIF');
            } else {
                $divGifTitle.text(apiData.data[i].title);
            }
            const $gif = $('<img>').attr('src', apiData.data[i].images.fixed_height.url).addClass('gif-image');
            $divGif.append($divGifTitle);
            $divGif.append($gif);
            $mainContainer.append($divGif);
        }
    }

    // copy gif link function
    // creates a temporary input element, the value of which becomes the image url passed to the function
    // appends temporary input to body, selects the input, copies it, then removes the input,
    // allowing the url to be copied
    const copyGifUrl = (imageSource) => {
        const $tempInput = $('<input>');
        $tempInput.val(imageSource);
        $('body').append($tempInput);
        $tempInput.select();
        document.execCommand('copy');
        $tempInput.remove();
    }
    // =========================
    // event handlers
    // =========================

    // event handler for user keyword input on form submission
    $('form').on('submit', (event) => {

        // grab user input keyword data
        let $userInput = $('input[type="text"]').val();

        // empty previous items from main div. keep page from reloading on form submission
        // reset form submission to be default (blank)
        $mainContainer.empty();
        event.preventDefault();
        $(event.currentTarget).trigger('reset');

        // get data based on user input. current results limited to 50 for now
        let dataUrl = $.get(
            "http://api.giphy.com/v1/gifs/search?q=" + $userInput + "&api_key=pdUgvuVVPEs9PdIYiNuPW8HrZYpNBm1P&limit=5"
        );
        dataUrl.done(
            (data) => {
                console.log('data successfully pulled', data);
                // if no userdata, do nothing, throw no errors, else render data on page
                if ($userInput !== '') {
                    renderData(5, data, $userInput);
                }
                $('.gif-image').on('click', (event) => {
                    const $imageSource = $(event.currentTarget).attr('src');
                    copyGifUrl($imageSource);
                });
        });
    });
});
