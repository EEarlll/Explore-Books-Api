# ExploreBooks Backend API for https://explorebooks.vercel.app/

Welcome to the ExploreBooks Backend API documentation. This API is built using Node.js, Express.js, and Mongoose, and it provides various endpoints to interact with the ExploreBooks application's database. Below, you'll find details about the available endpoints and their functionalities.

## Endpoints

### Get All Books

Endpoint: `/Browse/`
Method: GET
Description: Get a list of all books.
Parameters: None
Optional Parameters: 
- `limit`: Number of results to fetch (default: 8)
- `offset`: Starting index of results (default: 0)

### Get Books by Category

Endpoint: `/Browse/Category/:category`
Method: GET
Description: Get books by a specific category.
Parameters: `:category` (e.g., Fiction)
Optional Parameters:
- `limit`: Number of results to fetch (default: 8)
- `offset`: Starting index of results (default: 0)

### Get Total Pages for Pagination

Endpoint: `/Pagination/:category?`
Method: GET
Description: Get the total number of pages for all books or a specific category.
Parameters: `:category` (optional, e.g., Fiction)

### Get User's Bookmarks

Endpoint: `/Browse/Bookmark/:userId`
Method: GET
Description: Get books bookmarked by a specific user.
Parameters: `:userId`
Optional Parameters:
- `limit`: Number of results to fetch (default: 8)
- `offset`: Starting index of results (default: 0)

### Search Books

Endpoint: `/Browse/Query`
Method: GET
Description: Search for books based on a search query.
Parameters: `search` (e.g., akane)

### Send New Book

Endpoint: `/Catalogue/`
Method: POST
Description: Add a new book to the database.
Body: Book details in the provided model.

### Send Feedback

Endpoint: `/Catalogue/send-feedback`
Method: POST
Description: Send feedback to the system.
Body: Message, optional subject, and email.

### Bookmark a Book

Endpoint: `/Catalogue/Bookmark`
Method: POST
Description: Bookmark a book for a user.
Body: User ID and book ID.

### Delete Bookmark

Endpoint: `/Catalogue/DeleteBookmark`
Method: DELETE
Description: Delete a bookmark for a user.
Body: User ID and book ID.

### Update Book

Endpoint: `/Catalogue/:bookId`
Method: POST
Description: Update book details.
Parameters: `:bookId`
Body: Updated book details in the provided model.

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/Explore-Books-backend.git`
2. Navigate to the project directory: `cd Explore-Books-backend`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file with necessary variables.
5. Start the server: `npm start`

Make sure to replace `your-username` with your actual GitHub username.

## Contact

If you have any questions or feedback, please reach out to us at `earleustacio@gmail.com`.

## License

ExploreBooks Backend API is released under the [MIT License](LICENSE).

---

Thank you for using the ExploreBooks Backend API. Enjoy managing your book collection and enhancing your full stack development skills!
