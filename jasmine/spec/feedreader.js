/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have valid URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have valid names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* This is a new test suite named "The menu" */
    describe('The menu', function() {

        /* This is a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            var menuHiddenElements = $('.menu-hidden');
            expect(menuHiddenElements.length).toBe(1);
        });

        /* This is a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toggles visibility on menu icon click', function() {
            var menuIcons = $('.menu-icon-link');
            expect(menuIcons.length).toBe(1);

            menuIcons[0].click();
            var menuHiddenElements = $('.menu-hidden');
            expect(menuHiddenElements.length).toBe(0);

            menuIcons[0].click();
            menuHiddenElements = $('.menu-hidden');
            expect(menuHiddenElements.length).toBe(1);
        });
    });

    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* This a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            /* Load the feed randomly. */
            var feedId = Math.floor(Math.random() * allFeeds.length)
            loadFeed(feedId, function() {
                done();
            });
        });

        it('have at least a single entry element within the .feed container', function() {
            var entries = $('.entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        /* Load a feed randomly in beforeAll then record its id and title for latter comparison. */
        var oldTitle;
        var oldFeedId;
        beforeAll(function(done) {
            oldFeedId = Math.floor(Math.random() * allFeeds.length);
            loadFeed(oldFeedId, function() {
                oldTitle = $('.header-title')[0].innerText;
                done();
            });
        });

        /* Load a different feed in beforeEach for latter comparison. */
        beforeEach(function(done) {
            var newFeedId = (oldFeedId + 1) % allFeeds.length;
            loadFeed(newFeedId, function() {
                done();
            });
        });

        it('has content actually changed', function() {
            var newTitle = $('.header-title')[0].innerText;
            expect(newTitle !== oldTitle).toBeTruthy();
        });
     });
}());
