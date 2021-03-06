$(() => {
    // =========================
    // API variables
    // =========================

    const host = 'https://api.giphy.com';
    const searchPath = '/v1/gifs/search';
    const randomPath = '/v1/gifs/random';
    const apiKey = 'pdUgvuVVPEs9PdIYiNuPW8HrZYpNBm1P';
    const ratingG = 'g';
    const initialLimit = 10;
    let offset = 10;

    // =========================
    // element variables
    // =========================

    const $mainContainer = $('.main-container');
    const $openFavesBtn = $('.fav-button');
    const $favesModal = $('#modal');
    const $overlay = $('#overlay');
    const $closeFavesBtn = $('#close-modal');
    const $favoriteBtn = $('.star');
    const $clearFavesBtn = $('#clear-modal');

    // =========================
    // functions
    // =========================

    // render data function
    const renderData = (limit, apiData, userInput) => {
        for (let i = 0; i < limit; i++) {
            const $divGif = $('<div>').addClass('gif-container');
            const $divHeader = $('<div>').addClass('gif-header');
            const $divGifTitle = $('<div>').addClass('gif-title');
            const $htmlStar = $('<div>').html('&#x2605;').addClass('star');
            let $gif;
            if (limit === 1) {
                $gif = $('<img>').attr('src', apiData.data.images.original.url).addClass('gif-image').attr('id', apiData.data.id);
                $divGifTitle.text(apiData.data.title);
            } else {
                $gif = $('<img>').attr('src', apiData.data[i].images.original.url).addClass('gif-image').attr('id', apiData.data[i].id);
                $divGifTitle.text(apiData.data[i].title);
            }
            $divHeader.append($divGifTitle);
            $divHeader.append($htmlStar);
            $divGif.append($divHeader);
            $divGif.append($gif);
            $mainContainer.append($divGif);
        }
    }

    // copy gif link function
    // creates a temporary input element, the value of which becomes the image url passed to the function
    // appends temporary input to body, selects the input, copies it, then removes the input,
    // allowing the url to be copied
    // line 1 in RESOURCES.md
    const copyUrl = (input) => {
        const $tempInput = $('<input>').val(input);
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

    const clearFavesModal = () => {
        const $appendedGifs = $('#fave-gifs').children();
        if ($('#fave-gifs').children().length > 0) {
            localStorage.clear();
            for (let i = 0; i < $appendedGifs.length; i++) {
                $appendedGifs[i].remove();
            }
        }
    }

    // favorite specific gif
    // Is the length of the modal gifs > 0 => NO => add the gif to modal
    // => YES => grab the selected gif url, and the children of the gif Modal
    // for all children in the modal, if the selected gif url equals the children url, return
    // otherwise, exits if statement with no return, appends as normal
    const favoriteGif = (event) => {
        if ($('#fave-gifs').children().length > 0) {
            const $selectedImgUrl = $(event.currentTarget).parent().parent().children().eq(1).prop('src');
            const $appendedGifs = $('#fave-gifs').children();
            for (let i = 0; i < $appendedGifs.length; i++) {
                if ($selectedImgUrl === $appendedGifs[i].src) {
                    return;
                }
            }
        }
        const $favedGif = $(event.currentTarget).parent().parent().children().eq(1);
        const $modalGif = $favedGif.clone().appendTo('#fave-gifs');
        $modalGif.attr('id', $(event.currentTarget).attr('id'));
        $('.gif-image').on('click', (event) => {
            const $imageSource = $(event.currentTarget).attr('src');
            copyUrl($imageSource);
        });
        populateStorage();
    }

    // line 28 in RESOURCES.md
    // save favorited gifs in local storage
    const populateStorage = () => {
        const $appendedGifs = $('#fave-gifs').children();
        for (let i = 0; i < $appendedGifs.length; i++) {
            const $imgUrl = $appendedGifs[i].src;
            localStorage.setItem('src-' + i, $imgUrl);
        }
    }

    // after page refresh/revisit, add back favorited gifs to modal storage, if any
    const repopulateFavorites = () => {
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                let id = localStorage.getItem('src-' + i).slice(0, -10)
                id = id.slice(id.lastIndexOf('/') + 1);
                const $gif = $('<img>').attr('src', localStorage.getItem('src-' + i)).addClass('gif-image').attr('id', id);
                $('#fave-gifs').append($gif);
            }
        }
    }

    const showCopyText = () => {
        if ($(event.currentTarget).parent().attr('id') === 'fave-gifs') {
            return;
        }
        const $copyTextDiv = $('<div>').text('click to copy link').addClass('copy-text');
        $(event.currentTarget).parent().append($copyTextDiv);
    }

    const hideCopyText = () => {
        $('.copy-text').remove();
    }

    const addImageEvents = () => {
        $('.gif-image').on('click', (event) => {
            const $imageSource = $(event.currentTarget).attr('src');
            copyUrl($imageSource);
            $('.copy-text').text('link copied');
        });

        $('.gif-image').hover(showCopyText, hideCopyText);

        $('.star').on('click', favoriteGif);
    }

    // infinite scrolling: line 37 in RESOURCES.md
    // document height: returns height of html document
    // window height: returns height of browser viewpoint
    // document scroll top: returns the current vertical position of the scroll bar for the html document
    const infiniteScroll = (userInput) => {
        $(document).scroll(() => {

            const distanceFromBottom = $(document).height() - $(document).scrollTop() - $(window).height();

            if (distanceFromBottom < 200) {
                let dataUrl = $.get(
                    `${host}${searchPath}?q=${userInput}&api_key=${apiKey}&limit=${initialLimit}&offset=${offset}`
                );
                dataUrl.done(
                    (data) => {
                        console.log('data successfully pulled', data);
                        // if no userdata, do nothing, throw no errors, else render data on page
                        renderData(initialLimit, data, userInput);
                        addImageEvents();
                });
                offset += 10;
            }
        });
    }

    const loadPageWithHash = () => {
        if (window.location.hash) {
            let hashIds = window.location.hash.substring(1).split('-');
            console.log(hashIds);
            for (let i = 0; i < hashIds.length; i++) {
                console.log(hashIds[i]);
                let dataUrl = $.get(
                    `${host}/v1/gifs/${hashIds[i]}?&api_key=${apiKey}`
                );
                dataUrl.done(
                    (data) => {
                        renderData(1, data);
                        addImageEvents();
                    });
            }
            const $closeShared = $('<button>').text('close shared gifs').addClass('close-shared');
            $('.wrapper').append($closeShared);
            $closeShared.on('click', () => {
                location.assign('https://mstone89.github.io/gif-search-app/');
            });
        }
    }

    // =========================
    // event listeners
    // =========================

    // event listener for user keyword input on form submission
    $('form').on('submit', (event) => {
        // removes old event listener from the document so it doesn't scroll on multiple search terms.
        $(document).off();

        // grab user input keyword data
        let $userInput = $('input[type="text"]').val();

        // empty previous items from main div. keep page from reloading on form submission
        // reset form submission to be default (blank)
        $mainContainer.empty();
        event.preventDefault();
        $(event.currentTarget).trigger('reset');

        // get data based on user input
        let dataUrl = $.get(
            `${host}${searchPath}?q=${$userInput}&api_key=${apiKey}&limit=${initialLimit}`
        );
        dataUrl.done(
            (data) => {
                console.log('data successfully pulled', data);
                // if no userdata, do nothing, throw no errors, else render data on page
                if ($userInput !== '') {
                    renderData(initialLimit, data, $userInput);
                }
                addImageEvents();
        });

        infiniteScroll($userInput);

    });

    // event listener for clicking random button, to display random gif
    $('.random-button').on('click', (event) => {

        $(document).off();

        // empty previous items from main div.
        $mainContainer.empty();

        let dataUrl = $.get(
            `${host}${randomPath}?api_key=${apiKey}&rating=${ratingG}`
        );
        dataUrl.done(
            (data) => {
                console.log('random gif successfully pulled', data);
                renderData(1, data);
                addImageEvents();
            }
        )
    });

    $('.logo').on('click', () => {
        location.assign('https://mstone89.github.io/gif-search-app/');
    });

    // grab ids on click, store them in location.hash
    // line 53 in RESOURCES.md
    $('.copy-gifs-url').on('click', (event) => {
        window.location.hash = '';
        if ($('#fave-gifs').children().length > 0) {
            const $children = $('#fave-gifs').children();
            for (let i = 0; i < $('#fave-gifs').children().length; i++) {
                window.location.hash += $($children[i]).attr('id') + '-';
            }
            // remove last character. start at index 0, move backwards to the last part of the string
            window.location.hash = window.location.hash.slice(0, -1);
        }
        copyUrl('https://mstone89.github.io/gif-search-app/' + window.location.hash);
    });

    // event listeners for opening/closing favorites modal
    $openFavesBtn.on('click', openFavesModal);
    $closeFavesBtn.on('click', closeFavesModal);
    $clearFavesBtn.on('click', clearFavesModal);

    // add back locally stored gifs to favorites modal
    repopulateFavorites();

    // if page has hash anchor in the url, load the page with the embedded gifs
    loadPageWithHash();
});
