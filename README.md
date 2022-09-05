# movieDB_CLI

# Requirements

    PERSONS
        - POPULAR PERSONS : Network request to fetch the most popular person
        - PERSON DETAILS : Network request to fetch the data of a single person

    MOVIES
        - MOVIES: Network request to fetch movies
        - SINGLE MOVIE DETAILS: Network request to fetch data of a single movie

    FLAGS
        --save
        --local

# Commands

    --> POPULAR PERSONS

        - help
        - options
            > --popular
                Shorthand: -p
                Required: yes
                Description: Fetch the popular persons
            > --page
                Shorthand: none
                Input type: number
                Required: yes
                Description: The page of persons data results to fetch
                Page option: ...popular?page=1
        --> Terminal spinner
            Npm package: ora
            Message: Fetching the popular person's data...

        --> Network request
            URL: https://api.themoviedb.org/3/person/popular?page=1 (dynamic)
            Module: https.request()
            Module info: https://nodejs.org/api/https.html#https_https_request_options_callback
            Example:
                command: ./moviedb.js get-persons --page 2 --popular
                URL: https://api.themoviedb.org/3/person/popular?page=2
        --> Errors
            Method: ora.fail()
            Functionality: Stop spinnner and render error message associated
        --> Results:
            Method: Console.log
            Formatting Npm package: chalk (color rendering)
            --> Pagination
                Method: chalk.white() --> See page 7
            --> Persons data
                Requirements: Page 7-8
                Example: Page 9
        --> Success
            Method: ora.succed()
            Functionality: Stop spinner
            Message: Popular persons data loaded

    --> PERSON DETAILS

        -help
        -options
            > --id
                Shorthand: -i
                Required: yes
                Description: "The id of the person"
                Input value: ID
                URL: ./moviedb get-person --id XXXXXXXX
        --> Terminal spinner
            Message: Fetching the person data...
        --> Network request
            URL: https://api.themoviedb.org/3/person/:personId (dynamic)
        --> Errors
            Functionality: Stop spinnner and render error message associated
        --> Results:
            --> Persons data
                Requirements: Page 13-15
                Example: Page 15
        --> Success
            Message: Person data loaded

    --> MOVIES

        -help
        -options
            > --pages
                Shorthand: none
                Input type: number
                Required: yes
                Description: "The page of movies data results to fetch"
                Page option: ...popular?page=1

            > --popular
                Shorthand: -p
                Required: no
                Description: "Fetch the popular movies"
                URL: See api documentation

            > --now-playing
                Shorthand: -n
                Required: no
                Description: "Fetch the movies that are paying now"
                URL: See api documentation

            > --popular --now-playing indicated separately. If neither the popular or now playing are indicated, it should search on to the default movies endpoint

        --> Terminal spinner
            Message: Fetching the movies data...
        --> Network request
            URL:  URL: https://api.themoviedb.org/3/movie/popular?page=1 (dynamic)
        --> Errors
            Functionality: Stop spinnner and render error message associated
        --> Results:
            --> Pagination
                Method: chalk.white() --> See page 19
            --> Persons data
                Requirements: Page 19
                Example: Page 20
        --> Success
            Message:
                - Popular movies data loaded
                - Movies playing now data loaded

    --> SINGLE MOVIE DETAILS

        -help
        -options
            > --id
                Shorthand: -i
                Required: yes
                Description: "The id of the movie"

            > --reviews
                Shorthand: -r
                Required: no
                Description: "Fetch the reviews of the movie"
                URL: See api documentation

        --> Terminal spinner
            Message: Fetching the movie data...
        --> Network request
            URL(dynamic):
                -https://api.themoviedb.org/3/movie/:movie_id
                -https://api.themoviedb.org/3/movie/:movie_id/reviews
        --> Errors
            Functionality: Stop spinnner and render error message associated
        --> Results:
            --> Movie data
                Requirements: Page 24-25
                Example: Page 25
            --> Reviews data
                Requirements: Page 26-27
                Example: 27
        --> Success
            Message: Movie data loaded

    FLAGS
        Requirements:   - Only for get-persons & get-movies
                        - Read documentation Node.js module

        --save
            - Requirements
                - Check if folder already exists
                - Overwrite data - not need to append data or check if file alreaduy exists
            - Organization:
                /persons
                /movies
                    popular-movies.json
                    now-playing-movies.json
            - Messages:
                Success & Error Statements
            - Notifications:
                Npm Package: node-notifier
                Method: notifier.notify()

        --local
            - Functionality:
                - Read information from local files
            - Messages & Notifications:
                - Non existing file:
                - Existing file:
            - Notifications:
                Npm Package: node-notifier
                Method: notifier.notify()