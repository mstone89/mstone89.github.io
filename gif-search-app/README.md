# Gif-Search App

The Gif-Search app allows users to search for apps by keyword. Users can store favorite gifs in local storage, have results loaded consistently and steadily on page, and copy gif URLs to the clipboard to paste them into other applications. Users can find a single random gif as well. Users may also share their favorited gifs: users are provided a unique URL of their favorites which can be shared with others.

[Gif-Search App](https://mstone89.github.io/gif-search-app/)

## Technologies Used

This app was built with:

- HTML
- CSS
- JavaScript
- jQuery
- AJAX

AJAX request is made through the [GIPHY API](https://developers.giphy.com/).

## App Features

- Search for gif by keyword
- Copy gif to clipboard URL on click
- Store favorite gifs on click in separate modal
- Favorite gifs are stored in local storage and will remain in favorites on page refresh
- Favorites can be removed from local storage
- Top header is sticky so user doesn't have to scroll back to the top for new search
- Copy unique gif favorites URL to clipboard to share with other users
- Gifs are loaded on page through infinite scroll; a new AJAX request for more results occurs when the user scrolls down a certain amount
- Site is responsive for multiple screen sizes

## Approach

- First worked on acquiring data from the API correctly.
- Decided what data should be loaded on the page. Have the gif image and the gif title added on page, visible to the user, through search query. Have the unique gif id added as an attribute for each gif.
- Next worked on page structure through wireframes, then adding basic content to HTML, then getting appended gifs and titles added to DOM through jQuery and search functionality.
- Once data was being loaded correctly and page was looking more formed, worked on adding additional buttons for finding random gifs, a place to store favorites (in a modal), and a way for users to click on gifs to favorite them.
- Testing page on multiple screen sizes to get it responsive, added styling as needed.
- Once page was put together, worked on adding more advanced functionality: infinite scroll, sticky header/nav, ability for user to copy gif links to clipboard, adding gifs to favorites.
- After a lot of testing, finally added a way for the user to share gifs through a unique URl.

## Challenges/Unsolved Problems

- Getting the close/remove all button to be in a sticky footer in modal. I couldn't get this to work properly.

## Future Improvements

- Add option to individually remove gifs from favorites (only way to remove gifs from favorites is to remove all of them)
- Additional user feedback: change star color when clicked to indicate that a gif is favorited, show a tooptip over star buttons to indicate that it's a way to favorite gifs.
- Make it so that the random button displays multiple random gifs.
- Have the close/remove all buttons in the modal show in a sticky footer, so they are visible at all times.

## Resources

See the [RESOURCES.md](https://github.com/mstone89/mstone89.github.io/blob/master/gif-search-app/RESOURCES.md) for details on sources used to create this project.
