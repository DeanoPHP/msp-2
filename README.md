# ScreenQuest

![Responsive](assets/images/amIResponsive.png)
[Click here to view the live website](https://deanophp.github.io/msp-2/)

## Overview
Movie Explorer is an interactive web application that allows users to search and discover popular movies, TV shows, and actors/actresses. With a user-friendly interface, the application provides a seamless experience where users can click on any item to view detailed information about it. This includes descriptions, ratings, cast lists, and more.

This project connects to The Movie Database (TMDb) API to fetch and display recent movies, TV shows, and actor/actress information. 

## User Experience (UX)

## User Stories
This section outlines the user stories that guided the development of our project. User stories help us focus on the user’s perspective and needs, ensuring that the features developed are practical and beneficial for the user.

### As a visitor
1. **As a visitor** I want to be able to easily navigate the website so I can find information easily.
2. **As a visitor** I want the website to be visually appealing and professionally styled so that I have a positive impression of the website.
3. **As a visitor** I want browse popular movies so I can discover new movies to watch.
4. **As a visitor** I want browse popular tv shows so I can discover new tv shows to watch.
5. **As a visitor** I want to browse actors or actresses
6. **As a visitor** I want to be able to click on movie, tv shows or actor/actress to get more details
7. **As a visitor** I would like to use any of my devices to view the website.

### As the site owner
1. **As the site owner**, I want to feature high-quality images and detailed descriptions of our movies, tv shows, and actors.

2. **As the site owner**, I want to display the data clearly.

3. **As the site owner**, I want to give the user clear navigation.

### As a returning user 
1. **As a returning user**, I want to be able to view saved favourite movies, tv shows, and actors.

- **Visually Appealing**
  - **Bootstrap Navbar with Hamburger Menu**: We utilized Bootstrap's responsive navbar component to ensure easy navigation across all device sizes. The hamburger menu on smaller screens allows for a clean and uncluttered interface while providing full navigation capability.

## Implementation of User Stories
<!-- @todo Look at msp1 -->

## Future features
- Login in and Register functionality.
- Let a logged in user leave a review.
- Let the user save their favourite movies, tv shows.
- Give the user the ability to check movies, and tv shows by genres
- Give the user the abilty to choose between Dark/Light mode.

## Skeleton
Wireframes were designed using [Balsamiq](https://balsamiq.cloud/#)
<br><br>

### Home page
--------------
| Desktop and tablet| Mobile|
|:------------------|:------|
| ![Desktop](assets/images/Home-desktop.png) | ![Mobile](assets/images/Home-mobile.png) |

### Details page
----------------
| Desktop and tablet| Mobile|
|:------------------|:------|
| ![Desktop](assets/images/details-desktop.png) | ![Mobile](assets/images/details-mobile.png) |

## Technologies and Tools
- HTML/CSS - For stucturing and design
- Bootstrap - Framework for designing responsive and 
mobile-first web pages.
- JavaScript 
- jQuery
- themoviedb API
- FontAwesome - For icons
- Google Fonts - For fonts
- Gitpod
- Github
- Visual Studio

## Design Overview

<!-- Add some text here about the design -->

### Color Palette
  - Gold: #C7A64A - Used for h1 tags and logo;
  - Dark shade of yellow-green #5C501F - Used for sub-headings;
  - Light grey: #fafafa - Used for links;
  - very light grey: #eeeeee - used for body;

### Font Usage
Our project utilizes a combination of FontAwesome, Roboto, and Anonymous Pro to ensure clear readability, aesthetic appeal, and functional design across all elements of our website.

### Fonts Details
- **Google Fonts**: Used primarily for icons across the website. FontAwesome provides scalable vector icons that can instantly be customized — size, color, drop shadow, and anything that can be done with the power of CSS.

- **Roboto**: This is the primary typeface used for text elements on the website. Designed for readability, Roboto offers a modern, neutral look with a wide range of weights and styles.

- **Anonymous Pro**: Employed mainly in code snippets and data displays, Anonymous Pro is a monospace font that offers excellent clarity and readability in technical sections of the website.

### Font Integration
To integrate and use these fonts in your development environment, follow these steps:

- **fonts.google.com**:
  ```css
    /* Importing Roboto font with all weights and styles */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

    /* Importing Anonymous Pro font with specific weights and styles */
    @import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap');

- [Link for Roboto](https://fonts.google.com/?query=roboto)
- [Link for Anonymous Pro](https://fonts.google.com/?query=anonymous+pro)


Anonymous Pro and Roboto make a highly functional pairing in digital design, combining clarity with versatility. Anonymous Pro, a monospaced font, offers exceptional readability for code snippets and data, ensuring that each character is distinctly spaced and easy to differentiate. This makes it ideal for technical contexts where precision in text presentation is crucial. Roboto, on the other hand, is a sans-serif font known for its clean lines and friendly appearance, making it suitable for more general text such as paragraphs, headings, and user interfaces. Together, these fonts provide a balanced aesthetic: Roboto enhances the visual appeal and ease of reading for narrative text, while Anonymous Pro ensures technical sections are approachable and clear. This combination is particularly effective in environments like technical blogs, programming interfaces, or any application where text clarity and user comfort are paramount.

### Implementation

Here is an example of how to apply colours and fonts:

## Assistance from AI
During the development of this project, AI-powered tools were utilized to assist with including the design and implementation of a transparent navbar using Bootstrap. This assistance helped to optimize the solution and implement best practices in web development.

### Specific AI Contributions
- **3 random image for carousel** I used AI to help me get three random images from themoviedb API

```
const getThreeRandomImages = (movies, num) => {
    let shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};
```

## Fix
### Initial Development

Initially, the project contained multiple functions to handle different API requests:
- `getMovies()`: Fetches recent movies.
- `getTVShows()`: Fetches recent TV shows.
- `getActors()`: Fetches actor/actress information.

### Refactoring and Optimization

To improve the code maintainability and reduce redundancy, these functions were consolidated into a single, more flexible function. This new function accepts parameters to determine the type of data to fetch, resulting in cleaner and more efficient code.

### Unified Fetch Function

The unified function can be used as follows:

```javascript
function fetchData(type) {
    /**
 * Display the fetched data
 */
const displayDataFetched = async () => {
    try {
        const results = await fetchRequests(getEndpoint());

        $('.heading').html(`<h2>${global.type}</h2>`)
        if (results.results.length > 0) {
            results.results.forEach(item => {
                $('.display-results').append(`
                    <div class='col-sm-12 col-md-4 d-flex justify-content-center align-items-center'>
                        <a href='details.html?page=details&id=${item.id}&category=${global.page === null || global.page === 'movies' ? 'movie' : global.page === 'tv' ? 'tv' : 'person'}'><img src='https://image.tmdb.org/t/p/w1280/${global.page !== 'actors' ? item.poster_path : item.profile_path}' class="d-block" alt='${item.original_title}'/><a>                                             
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

const getEndpoint = () => {
    if (global.page === null) {
        return 'movie/popular';
    } else if (global.page === 'movies') {
        return `search/movie?query=${global.params}&include_adult=false&language=en-US&page=1`;
    } else if (global.page === 'tv') {
        return `search/tv?query=${global.params}&include_adult=false&language=en-US&page=1`;
    } else {
        return `search/person?query=${global.params}&include_adult=false&language=en-US&page=1`;
    }
}
```

## Testing
[w3c Markup Validation](https://validator.w3.org/)

index.html
![index.html](./assets/images/testing/index.png)

form-submitted.html
![form-submitted.html](./assets/images/testing/form-submitted.png)

style.css
![style.css](./assets/images/testing/css.png)

## Functional Testing
| Action | Expected Behaviour | Pass/Fail |
| ------ | ------------------ | --------- | 
| Initial page load | I expect the browser to load my website and be on the index section | Pass |
| Home link | The browser should navigate to and display the 'Home' section. | Pass |
| About link | The browser should navigate to and display the 'About' section. | Pass |
| The Gym link | The browser should navigate to and display the 'Gym' section. | Pass |
| Team link | The browser should navigate to and display the 'Team' section. | Pass |
| Contact link | The browser should navigate to and display the 'Contact' section. | Pass | 
| Test for hero section Button | Upon clicking the button, the Bootstrap modal should be displayed, including all its content and with the correct styling. | Pass |
| Test for team section Button | Upon clicking the button, the Bootstrap modal should be displayed, including all its content and with the correct styling. | Pass |
| Test for Contact Section Button | Implemented functionality test to verify that clicking the button in the contact section redirects to the "form-submitted.html" page when all form inputs are filled out as expected. | Pass |
| Test Full Name required | Implemented functionality to verify whether form would submit if the input field is empty | Pass | 
| Test Email required | Implemented functionality to verify whether form would submit if the input field is empty | Pass | 
| Test Tel required | Implemented functionality to verify whether form would submit if the input field is empty | Pass | 
| Test Message required | Implemented functionality to verify whether form would submit if the input field is empty | Pass | 
| Implement Iframe map functionality | Added functionality test to ensure that the iframe map in the contact section functions correctly, displaying the map as expected and allowing interaction with it. | Pass |

## Lighthouse report
<hr>

## Deployment
<hr>

1. **Design the Website on GitPod**:
   - Open GitPod and create a new workspace.
   - Design and develop your website within the GitPod environment.

2. **Push the Website to GitHub**:
   - Initialize a Git repository in your GitPod workspace:
     ```sh
     git init
     ```
   - Add all the project files:
     ```sh
     git add .
     ```
   - Commit the changes with a meaningful message:
     ```sh
     git commit -m "Initial commit"
     ```
   - Add your GitHub repository as a remote:
     ```sh
     git remote add origin <your-github-repo-url>
     ```
   - Push the changes to GitHub:
     ```sh
     git push -u origin main
     ```

## Cloning this repository

1. Open your prefered terminal.

2. Navigate to the directory where you want the cloned directory to be added.

3. Run the following command 
```sh
git clone https://github.com/DeanoPHP/MSP-1.git
```

4. After cloning, navigate into the directory
```sh
 cd your-repository-name
```

5. Now you can start working on the project on your local machine.

## Forking this repository
1. Go to the repository on GitHub.

2. In the top-right corner of the page, click the "Fork" button.

3. Once the repository has been forked, you will be taken to your copy of the repository in your GitHub account.

4. Clone your forked repository to your local machine:
```sh
git clone https://github.com/DeanoPHP/MSP-1.git
```

5. Navigate to the cloned directory
```sh
  cd your-repository-name
```

6. You can now make changes to your fork and submit pull requests to the original repository.

## Deployment Steps
<hr>

**Deploy to GitHub Pages**:
   - Go to your GitHub repository on GitHub.
   - Navigate to the repository settings.
   - Scroll down to the "GitHub Pages" section.
   - Under "Source", select the branch you want to deploy (usually `main` or `gh-pages`).
   - Click "Save".

Your website should now be live on GitHub Pages. You can access it via the URL provided in the GitHub Pages section of your repository settings.

## Credits and Acknowledgments
<hr>
I would like to express my heartfelt gratitude to my mentor for his invaluable guidance and advice throughout this project. 

Additionally, I extend my sincere thanks to my tutors, especially Miguel Ortega Legorreta, for their exceptional teaching and encouragement. Your dedication and expertise have greatly contributed to my learning journey.






