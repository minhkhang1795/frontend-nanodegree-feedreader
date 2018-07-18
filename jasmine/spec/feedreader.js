/** feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        describe('For each RSS Feed, it', function () {
            allFeeds.forEach(function (feed) {
                it('has a URL that is not empty', function () {
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).not.toBe(0);
                })
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        describe('For each RSS Feed, it', function () {
            allFeeds.forEach(function (feed) {
                it('has a name that is not empty', function () {
                    expect(feed.name).toBeDefined();
                    expect(feed.name.length).not.toBe(0);
                })
            });
        });
    });


    let menu = $(".slide-menu")[0], hamburgerBtn = $(".menu-icon-link")[0];
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('is hidden by default', function () {
            expect(checkVisible(menu)).toBeFalsy();
        });

        describe('The menu', function () {
            beforeEach(function (done) {
                hamburgerBtn.click();
                // Wait for the toggle animation to be done
                setTimeout(function () {
                    done();
                }, 400)
            });
            /* TODO: Write a test that ensures the menu changes
             * visibility when the menu icon is clicked. This test
             * should have two expectations: does the menu display when
             * clicked and does it hide when clicked again.
             */
            it('displays when the menu icon is first clicked', function () {
                expect(checkVisible(menu)).toBeTruthy();
            });

            it('hides when the menu icon is clicked one more time', function () {
                expect(checkVisible(menu)).toBeFalsy();
            });
        });
    });

    let container = $('.feed')[0];
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            // call something asynchronous
            loadFeed(0, function () {
                done();
            });
        });

        it('are loaded with at least one feed', function (done) {
            expect(container.childElementCount).not.toBe(0);
            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let firstTitle;
        beforeEach(function (done) {
            // call something asynchronous
            loadFeed(0, function () {
                firstTitle = container.firstElementChild.innerText;
                done();
            });
        });

        it('actually changes the content', function (done) {
            loadFeed(2, function () {
                let secondTitle = container.firstElementChild.innerText;
                expect(secondTitle).not.toBe(firstTitle);
                done();
            });
        });
    });
}());


/**
 * A fancy function to check if an element is visible in the screen
 * https://stackoverflow.com/questions/31590552/jasmine-jquery-check-if-element-is-visible
 * @param elm
 * @returns {boolean}
 */
function checkVisible(elm) {
    let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight),
        viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth),
        rect = elm.getBoundingClientRect();
    return !(rect.bottom <= 0 || rect.top >= viewHeight || rect.left >= viewWidth || rect.right <= 0);
}
