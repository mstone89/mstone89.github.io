$(() => {
    // =========================
    // global variables
    // =========================

    const $mainContainer = $('.main-container');
    const $openFavesBtn = $('#fav-button');
    const $favesModal = $('#modal');
    const $overlay = $('#overlay');
    const $closeFavesBtn = $('#close-modal');

    // =========================
    // global functions
    // =========================

    // render data function
    //// if a title is unavailable, add keyword search text as title
    const renderData = (limit, apiData, userInput) => {
        for (let i = 0; i < limit; i++) {
            const $divGif = $('<div>').addClass('gif-container');
            const $divHeader = $('<div>').addClass('gif-header');
            const $divGifTitle = $('<div>').addClass('gif-title');
            const $htmlStar = $('<div>').html('&#x2605;').addClass('star');
            if (apiData.data[i].title === ' ' || apiData.data[i].title === '') {
                $divGifTitle.text(userInput + ' GIF');
            } else {
                $divGifTitle.text(apiData.data[i].title);
            }
            const $gif = $('<img>').attr('src', apiData.data[i].images.original.url).addClass('gif-image');
            $divHeader.append($divGifTitle);
            $divHeader.append($htmlStar);
            $divGif.append($divHeader);
            $divGif.append($gif);
            $mainContainer.append($divGif);
        }
    }

    // create and append gif, title, etc. after clicking on random button
    const addRandomGif = (apiData) => {
        const $divGif = $('<div>').addClass('gif-container');
        const $divHeader = $('<div>').addClass('gif-header');
        const $divGifTitle = $('<div>').addClass('gif-title');
        const $htmlStar = $('<div>').html('&#x2605;').addClass('star');
        if (apiData.data.title === ' ' || apiData.data.title === '') {
            $divGifTitle.text('random GIF');
        } else {
            $divGifTitle.text(apiData.data.title);
        }
        const $gif = $('<img>').attr('src', apiData.data.images.original.url).addClass('gif-image');
        $divHeader.append($divGifTitle);
        $divHeader.append($htmlStar);
        $divGif.append($divHeader);
        $divGif.append($gif);
        $mainContainer.append($divGif);
    }

    // copy gif link function
    // creates a temporary input element, the value of which becomes the image url passed to the function
    // appends temporary input to body, selects the input, copies it, then removes the input,
    // allowing the url to be copied
    const copyGifUrl = (imageSource) => {
        const $tempInput = $('<input>').val(imageSource);
        $('body').append($tempInput);
        $tempInput.select();
        document.execCommand('copy');
        $tempInput.remove();
    }

    // open favorites modal
    const openFavesModal = () => {
        $overlay.show();
        $favesModal.show();
    }

    // close favorites modal
    const closeFavesModal = () => {
        $overlay.hide();
        $favesModal.hide();
    }

    // =========================
    // event listeners
    // =========================

    // event listener for user keyword input on form submission
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
            "http://api.giphy.com/v1/gifs/search?q=" + $userInput + "&api_key=pdUgvuVVPEs9PdIYiNuPW8HrZYpNBm1P&limit=25"
        );
        dataUrl.done(
            (data) => {
                console.log('data successfully pulled', data);
                // if no userdata, do nothing, throw no errors, else render data on page
                if ($userInput !== '') {
                    renderData(25, data, $userInput);
                }
                $('.gif-image').on('click', (event) => {
                    const $imageSource = $(event.currentTarget).attr('src');
                    copyGifUrl($imageSource);
                });
        });
    });

    // event listener for clicking random button, to display random gif
    $('.random-button').on('click', (event) => {
        // empty previous items from main div. keep page from reloading on form submission
        $mainContainer.empty();

        let dataUrl = $.get(
            "http://api.giphy.com/v1/gifs/random?api_key=pdUgvuVVPEs9PdIYiNuPW8HrZYpNBm1P"
        );
        dataUrl.done(
            (data) => {
                console.log('random gif successfully pulled', data);
                addRandomGif(data);
            },
            () => {
                console.log('bad');
            }
        )
    });

    // event listeners for opening/closing favorites modal
    $openFavesBtn.on('click', openFavesModal);
    $closeFavesBtn.on('click', closeFavesModal);
});
