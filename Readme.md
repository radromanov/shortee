### Shurl

Link shortener and "socials" page service built using Vite + Express.js.

# I. Links

## 1. Adding links

    - [x] Client ensures user input is valid
    - [x] Client sends POST request with payload
    - [x] Server ensures user input is valid
    - [x] Server sends GET request to user-provided URL in payload
        - [x] if valid, proceed with creating the link - allow up to 10 links, duplicate URLs aren't allowed
        - [x] if invalid, send error to client (e.g. "Provided URL doesn't exist.")

## 2. Using links

    - User clicks on link
        - [x] GET request to the API with the specified short URL
        - [x] API endpoint sends a 302 redirect to the user where they get redirected to the original URL
    - [ ] Copy to clipboard option (done via a "..." menu icon beside each link, which opens up a menu)

## 3. Links CRUD operations

    Updating and deleting will be done via a "..." menu icon beside each link, which opens a menu
        - [x] Create links
        - [x] Read links
        - [ ] Update links (name and original URL)
        - [ ] Delete links

# II. User Profiles

## 1. User authentication

    - [x] Sign up
        - [ ] Email verification
    - [x] Log in
        - [ ] Email verification
    - [x] HTTP-Only cookie based sessions
    - [x] Protected routes

## 2. Profile management - CRUD

    - [x] Create profile (as per II-1, `Sign up`)
    - [ ] Read profile page with user data
    - [ ] Update profile page data
    - [ ] Option to delete profile
