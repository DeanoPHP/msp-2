/**
 * Global variables
 */
const global = {
    API_URL: 'https://api.themoviedb.org/3/',
    API_KEY: '644aa04d7d483c457999150e0657aa71',
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
 * Initialize the carousel
 */
const init = () => {
    getCarouselImages();
}

$(document).ready(function () {
    init();
});


// module.exports = { fetchRequest, getThreeRandomImages }