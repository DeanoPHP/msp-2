// Import the necessary functions and global object from the script
const { fetchRequests, getThreeRandomImages, getCarouselImages, getEndpoint, global } = require('../js/script');

// Mock browser-specific globals before all tests
beforeAll(() => {
    const fs = require('fs');
    const fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

// Ensure the global object is defined and has the correct structure
describe('Global object contains the correct keys', () => {
    test('API_URL key exists', () => {
        expect(global.API_URL).toBe('https://api.themoviedb.org/3/');
    });

    test('score key exists', () => {
        expect('type' in global).toBe(true)
    })

    test('page key exists', () => {
        expect(global.page).toBe(null);
    });

    test('params key exists', () => {
        expect(global.params).toBe(null);
    });

    test('id key exists', () => {
        expect('id' in global).toBe(true);
    });

    test('category key exists', () => {
        expect('category' in global).toBe(true);
    });

    test('SITE_URL key exists', () => {
        expect(global.SITE_URL).toBe('https://deanophp.github.io/msp-2/');
    });
});

/**
 * Testing for the fetchRequests function
 * We have installed jest-fetch-moch
 */
beforeAll(() => {
    // Mock the global object
    global.global = {
        API_URL: 'https://api.themoviedb.org/3/'
    };

    // Mock the fetch function
    global.fetch = require('jest-fetch-mock');
});

describe('fetchRequests', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    test('calls the correct URL with the correct options', async () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));

        const request = 'movie/upcoming';
        const response = await fetchRequests(request);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            `${global.global.API_URL}${request}`,
            {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDRhYTA0ZDdkNDgzYzQ1Nzk5OTE1MGUwNjU3YWE3MSIsInN1YiI6IjY0NjkyNzIyMmJjZjY3MDE3MmIxNjE3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rw0hKW2Ftpnu2jjYtffYTpSao1k47k0eW0nSMb6P-Qs'
                }
            }
        );
        expect(response.data).toBe('12345');
    });

    test('handles a successful response', async () => {
        const mockData = { results: [{ id: 1, title: 'Test Movie' }] };
        fetch.mockResponseOnce(JSON.stringify(mockData));

        const response = await fetchRequests('movie/up');

        expect(response).toEqual(mockData);
    });

    test('handles a failure response', async () => {
        fetch.mockReject(new Error('API is down'));

        try {
            await fetchRequests('movie/upcoming');
        } catch (error) {
            expect(error.message).toBe('API is down');
        }
    });
});

/**
 * Testing the getThreeRandonImages function
 */
describe('getThreeRandomImages', () => {
    test('returns the correct number of random images', () => {
        const movies = [
            { id: 1, title: 'Movie 1' },
            { id: 2, title: 'Movie 2' },
            { id: 3, title: 'Movie 3' },
            { id: 4, title: 'Movie 4' },
            { id: 5, title: 'Movie 5' }
        ];

        const num = 3;
        const result = getThreeRandomImages(movies, num);

        expect(result.length).toBe(num);
        result.forEach(movie => {
            expect(movies).toContainEqual(movie);
        });
    });

    test('returns an empty array if num is 0', () => {
        const movies = [
            { id: 1, title: 'Movie 1' },
            { id: 2, title: 'Movie 2' },
            { id: 3, title: 'Movie 3' }
        ];

        const num = 0;
        const result = getThreeRandomImages(movies, num);

        expect(result).toEqual([]);
    });

    test('returns all movies if num is greater than length of movies array', () => {
        const movies = [
            { id: 1, title: 'Movie 1' },
            { id: 2, title: 'Movie 2' }
        ];

        const num = 5;
        const result = getThreeRandomImages(movies, num);

        expect(result.length).toBe(movies.length);
        result.forEach(movie => {
            expect(movies).toContainEqual(movie);
        });
    });
});


/**
 * Testing for getting the 3 random images
 * We are using jest-fetch-moch
 */
// jest.mock('../js/script', () => ({
//     fetchRequests: jest.fn(),
//     getThreeRandomImages: jest.requireActual('../js/script').getThreeRandomImages
// }));

// beforeAll(() => {
//     global.$ = require('jquery');
// });

// describe('getCarouselImages', () => {
//     beforeEach(() => {
//         fetch.resetMocks();
//         document.body.innerHTML = '<div class="carousel-inner"></div>';
//     });

//     test('fetches movies and appends three random images to the carousel', async () => {
//         const mockMovies = {
//             results: [
//                 { id: 1, title: 'Movie 1', backdrop_path: '/path1', overview: 'Overview 1' },
//                 { id: 2, title: 'Movie 2', backdrop_path: '/path2', overview: 'Overview 2' },
//                 { id: 3, title: 'Movie 3', backdrop_path: '/path3', overview: 'Overview 3' },
//                 { id: 4, title: 'Movie 4', backdrop_path: '/path4', overview: 'Overview 4' }
//             ]
//         };

//         fetchRequests.mockResolvedValue(mockMovies);

//         await getCarouselImages();

//         expect(fetchRequests).toHaveBeenCalledWith('movie/upcoming');
//         expect($('.carousel-inner').children().length).toBe(3);
//         expect($('.carousel-inner').html()).toContain('Movie 1');
//         expect($('.carousel-inner').html()).toContain('Movie 2');
//         expect($('.carousel-inner').html()).toContain('Movie 3');
//     });

//     test('handles fetch error gracefully', async () => {
//         const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

//         fetchRequests.mockRejectedValue(new Error('API is down'));

//         await getCarouselImages();

//         expect(consoleErrorSpy).toHaveBeenCalledWith('API is down');
//         consoleErrorSpy.mockRestore();
//     });
// });

/**
 * Tests to see whether the getEndpoint function is working as expected
 */
describe('getEndpoint', () => {
    let originalGlobal;

    beforeAll(() => {
        // Store the original global object to restore it later
        originalGlobal = { ...global };
    });

    // afterEach(() => {
    //     // Restore the original global object after each test
    //     global = { ...originalGlobal };
    // });

    test('returns "movie/popular" if global.page is null', () => {
        global.page = null;

        const endpoint = getEndpoint();
        expect(endpoint).toBe('movie/popular');
    });

    test('returns correct movie search endpoint if global.page is "movies"', () => {
        global.page = 'movies';
        global.params = 'test';

        const endpoint = getEndpoint();
        expect(endpoint).toBe('search/movie?query=test&include_adult=false&language=en-US&page=1');
    });

    test('returns correct tv search endpoint if global.page is "tv"', () => {
        global.page = 'tv';
        global.params = 'test';

        const endpoint = getEndpoint();
        expect(endpoint).toBe('search/tv?query=test&include_adult=false&language=en-US&page=1');
    });

    test('returns correct person search endpoint if global.page is neither null, "movies", nor "tv"', () => {
        global.page = 'person';
        global.params = 'test';

        const endpoint = getEndpoint();
        expect(endpoint).toBe('search/person?query=test&include_adult=false&language=en-US&page=1');
    });
});



