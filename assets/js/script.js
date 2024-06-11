/**
 * Global variables
 */
const global = {
    API_URL: 'https://api.themoviedb.org/3/',
    API_KEY: '644aa04d7d483c457999150e0657aa71',
    page: new URLSearchParams(window.location.search).get('page'),
    params: new URLSearchParams(window.location.search).get('params'),
    id: new URLSearchParams(window.location.search).get('id'),
    category: new URLSearchParams(window.location.search).get('category'),
    type: '',
    SITE_URL: 'https://deanophp.github.io'
}

/**
 * This function will fetch data from the moviedb API
 */
const fetchRequests = async (request) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDRhYTA0ZDdkNDgzYzQ1Nzk5OTE1MGUwNjU3YWE3MSIsInN1YiI6IjY0NjkyNzIyMmJjZjY3MDE3MmIxNjE3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rw0hKW2Ftpnu2jjYtffYTpSao1k47k0eW0nSMb6P-Qs'
        }
    }

    const response = await fetch(`${global.API_URL}${request}`, options)
    const data = await response.json()
    return data
}

/**
 * Get 3 random images
 */
const getThreeRandomImages = (movies, num) => {
    let shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

/**
 * Function to insert images into the carousel
 */
const getCarouselImages = async () => {
    try {
        const movies = await fetchRequests('movie/upcoming');
        const getImages = getThreeRandomImages(movies.results, 3);
        const carouselInner = $('.carousel-inner');

        getImages.forEach((movie, index) => {
            let isActive = index === 0 ? 'active' : '';
            let movieItem = `
                <div class="carousel-item ${isActive}">
                    <a href='details.html?page=details&id=${movie.id}&category=movie'><img class="d-block w-100" src="https://image.tmdb.org/t/p/w1280${movie.backdrop_path}" alt="${movie.title}"></a>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${movie.title}</h5>
                        <p>${movie.overview}</p>
                    </div>
                </div>
            `;
            carouselInner.append(movieItem);
        });
    } catch (error) {
        console.error(error.message);
    }
};

/**
 * Display popular movies. This will show when document loads
 * https://api.themoviedb.org/3/endpoint
 */
const displayPopularMovies = async () => {
    try {
        const results = await fetchRequests('movie/popular');

        $('.heading').html(`<h2>${global.type}</h2>`)
        if (results.results.length > 0) {
            results.results.forEach(movie => {
                $('.display-results').append(`
                    <div class='col-sm-12 col-md-4 d-flex justify-content-center align-items-center'>
                        <a href='details.html?page=details&id=${movie.id}&category=movie'><img src='https://image.tmdb.org/t/p/w1280/${movie.poster_path}' class="d-block" alt='${movie.original_title}' /></a>                                             
                    </div>
                `);
            });
        } else {
            $('.display-results').html('<h2>No results found for popular movies</h2>')
        }
    } catch (error) {
        console.error(error.message);
    }
}

/**
 * function to display searched movie
 */
const displayMovieSearch = async () => {
    try {
        const results = await fetchRequests(`search/movie?query=${global.params}&include_adult=false&language=en-US&page=1`)
        $('.heading').html(`<h2>${global.type}</h2>`)
        results.results.forEach(movie => {
            $('.display-results').append(`
                <div class='col-sm-12 col-md-4 d-flex justify-content-center align-items-center'>
                    <a href='details.html?page=details&id=${movie.id}&category=movie'><img src='${movie.poster_path ? `https://image.tmdb.org/t/p/w1280/${movie.poster_path}` : 'assets/images/No-Image.png'}' class="d-block" alt='${movie.original_title}' /></a>                                             
                </div>
            `);
        });
        console.log(results)
    } catch (error) {
        console.log(error.message)
    }
}

/**
 * Display tv series and shows
 */
const displayTvSearched = async () => {
    try {
        const results = await fetchRequests(`search/tv?query=${global.params}&include_adult=false&language=en-US&page=1`)
        $('.heading').html(`<h2>${global.type}</h2>`)
        results.results.forEach(tv => {
            $('.display-results').append(`
                <div class='col-sm-12 col-md-4 d-flex justify-content-center align-items-center'>
                    <a href='details.html?page=details&id=${tv.id}&category=tv'><img src='https://image.tmdb.org/t/p/w1280/${tv.poster_path}' class="d-block" alt='${tv.original_title}' /></a>                                             
                </div>
            `);
        });
        console.log(results)
    } catch (error) {
        console.log(error.message)
    }
}

/**
 * display actor or actress searched
 */
const displayActorSearched = async () => {
    try {
        const results = await fetchRequests(`search/person?query=${global.params}&include_adult=false&language=en-US&page=1`)
        $('.heading').html(`<h2>Actor/Actress Results</h2>`)
        results.results.forEach(actor => {
            $('.display-results').append(`
                <div class='col-sm-12 col-md-4 d-flex justify-content-center align-items-center'>
                    <a href='details.html?page=details&id=${actor.id}&category=person'><img src='${actor.profile_path ? `https://image.tmdb.org/t/p/w1280/${actor.profile_path}` : 'assets/images/no-photo-icon.png' }' class="d-block" alt='${actor.name}' /></a>                                             
                </div>
            `);
        });
        console.log(results)
    } catch (error) {
        console.log(error.message)
    }
}

/**
 * display the selected movie, tv show, or actor for more information
 */
const showDetails = async () => {
    try {
        const res = await fetchRequests(`${global.category}/${global.id}`)

        if (global.category === 'movie') {
            $('.details-results').append(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <img class="details-image" src="https://image.tmdb.org/t/p/w1280/${res.poster_path}" alt="screen details">
                        </div>
                        <div class="col-sm-12 col-md-6 p-3">
                            <h1>${res.title}</h1>
                            <p>${res.overview}</p> 
                            <p>Release date: ${res.release_date}</p>
                            <a href="${res.homepage}" target="_blank">Visit Website</a>
                        </div>
                    </div>
                </div>
            `)
        } else if (global.category === 'tv') {
            $('.details-results').append(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <img class="details-image" src="https://image.tmdb.org/t/p/w1280/${res.poster_path}" alt="screen details">
                        </div>
                        <div class="col-sm-12 col-md-6 p-3">
                            <h1>${res.name}</h1>
                            <p>${res.overview}</p> 
                            <p>Release date: ${res.release_date}</p>
                            <a href="${res.homepage}" target="_blank">Visit Website</a>
                        </div>
                    </div>
                </div>
            `)
        } else {
            $('.details-results').append(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <img class="details-image" src="https://image.tmdb.org/t/p/w1280/${res.profile_path}" alt="screen details">
                        </div>
                        <div class="col-sm-12 col-md-6 p-3">
                            <h1>${res.name}</h1>
                            <p>${res.biography}</p> 
                            <p>Birthday: ${res.birthday}</p>
                            <a href="${res.homepage}" target="_blank">Visit Website</a>
                        </div>
                    </div>
                </div>
            `)
        }

        console.log(res)
    } catch (error) {
        console.log(error.message)
    }
}

const showSearchForm = () => {
    $('.fa-search').click(() => {
        $('#pageBlur').fadeIn(500);
        $('body').css('overflow', 'hidden')
        $('#searchApiForm').css({
            display: 'block',
            opacity: 0
        }).animate({
            opacity: 1,
            top: "30%"
        }, {
            duration: 1000,
            easing: "easeInQuad",
            complete: function () {
                console.log("Search form animation complete");
            }
        });
    });

    $('#pageBlur').click(() => {
        $('#pageBlur').fadeOut(1000)
        $('#searchApiForm').fadeOut(1000)
        $('body').css('overflow', 'auto')
    })
}

const catagoryInput = () => {
    $('#mySelect').change(() => {
        const selectedOption = $('#mySelect option:selected').data('placeholder')
        $('#nameInput').attr('placeholder', selectedOption)
        global.type = selectedOption

        if (global.type === 'Search popular movies') {
            $('#nameInput').fadeOut(1000)
        } else {
            $('#nameInput').fadeIn(1000)
        }
    })

    $('#mySelect').trigger('change');
}

const formSubmit = () => {
    $('#submitButton').on('click', async (e) => {
        e.preventDefault()

        const type = global.type.split(' ')[1].toLowerCase()
        const inputVal = document.getElementById('nameInput').value

        if (type === 'popular') {
            window.location.href = `${global.SITE_URL}/`
        } else if (type === 'movie') {
            window.location.href = `${global.SITE_URL}/?page=movies&params=${inputVal}`
        } else if (type === 'tv') {
            window.location.href = `${global.SITE_URL}/?page=tv&params=${inputVal}`
        } else if (type === 'people') {
            window.location.href = `${global.SITE_URL}/?page=actors&params=${inputVal}`
        }
    })
}

/**
 * Initialize the carousel
 */
const init = () => {
    switch (global.page) {
        case 'movies':
            displayMovieSearch();
            showSearchForm();
            catagoryInput();
            formSubmit();
            break;
        case 'tv':
            displayMovieSearch();
            showSearchForm();
            catagoryInput();
            formSubmit();
            break;
        case 'actors':
            displayActorSearched();
            showSearchForm();
            catagoryInput();
            formSubmit();
            break;
        case 'details':
            showDetails();
            showSearchForm();
            catagoryInput();
            formSubmit();
            break;
        default:
            getCarouselImages();
            displayPopularMovies();
            showSearchForm();
            catagoryInput();
            formSubmit();
    }
};

$(document).ready(function () {
    init();
});


// module.exports = { fetchRequest, getThreeRandomImages }