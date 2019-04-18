# Gif-Search App

The Gif-Search app allows users to search for apps by keyword. Users can store favorite gifs in local storage, have results loaded consistently and steadily on page, and copy gif URLs to the clipboard to paste them into other applications. Users can find a single random gif as well. Users may also share their favorited gifs: users are provided a unique URL of their favorites which can be shared with others.

## Technologies Used

This app was built with:

- HTML
- CSS
- JavaScript
- jQuery
- AJAX

AJAX request is made through the [GIPHY API](https://developers.giphy.com/).

## Approach

- First worked on acquiring data from the API correctly.
- Decided what data should be loaded on the page. Have the gif image and the gif title added on page, visible to the user, through search query. Have the unique gif id added as an attribute for each gif.
- Next worked on page structure through wireframes, then adding basic content to HTML, then getting appended gifs and titles added to DOM through jQuery and search functionality.
- Once data was being loaded correctly and page was looking more formed, worked on adding additional buttons for finding random gifs, a place to store favorites (in a modal), and a way for users to click on gifs to favorite them.
- Testing page on multiple screen sizes to get it responsive, added styling as needed.
- Once page was put together, worked on adding more advanced functionality: infinite scroll, sticky header/nav, ability for user to copy gif links to clipboard, adding gifs to favorites.
- After a lot of testing, finally added a way for the user to share gifs through a unique URl.
