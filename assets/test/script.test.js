// Import the necessary functions and global object from the script
const { fetchRequests, getThreeRandomImages, getEndpoint, global } = require('../js/script');

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
