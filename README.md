# crud-task-movieReviewApi

Here's a list of the routes



## Movies
### Get routes
Get all : /api/movies/
Get By Id : /api/movies/:movieId

### Post routes
Create : /api/movies
Request body sample : { "title" : "Osofia in london", "releaseDate" : "06/06/2018", "directorName" : "the russo brothers (goats)" }

### Patch routes
patch : /api/movies/:movieId

### Delete routes
Delete : /api/movies/:movieId


## Reviewer
### Get routes
Get all : /api/reviewers/
Get By Id : /api/reviewers/:reviewerId

### Post routes
Create : /api/reviewers
Request body sample : { "name" : "raphael" }

### Patch routes
patch : /api/movies/:reviewerId

### Delete routes
Delete : /api/movies/:reviewerId


## Review
### Get routes
GetAll : /api/reviews/
Get Reviews of Movie : /api/reviews/getReviewsOfMovie/:movieId
Get Reviews of Reviewer : /api/reviews/getReviewsOfReviewer/:reviewerId
Get By Id: /api/reviews/reviewId

### Post routes
Create : /api/reviews
Request Sample : { "rating" : 5, "description" : "good movie would recommend", "movieId" : "62d29cb7e348330218b7b63a", "reviewerId" : "62d29d424adb718034dc0f7b" }

### Patch routes
patch : /api/movies/:reviewId

### Delete routes
Delete : /api/movies/:reviewId
