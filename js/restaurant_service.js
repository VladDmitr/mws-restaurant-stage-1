'use strict';

class RestaurantReviewsService {

    constructor() {
        this._restaurant = null;
    }

    /**
     * Get current restaurant from page URL.
     */
    fetchRestaurant() {
        const id = RestaurantReviewsService.getParameterByName('id');
        if (!id) {
            throw new Error('No restaurant id in URL');
        } else {
            DBHelper.fetchRestaurantById(id, (error, restaurant) => {
                if (!restaurant) {
                    throw new Error(error.toString());
                }
                this._restaurant = restaurant;
                this._fillRestaurantHTML();
                this._fillBreadcrumb();
                DBHelper.mapMarkerForRestaurant(this._restaurant, this._getMap());
            });
        }
    }

    /**
     * Create restaurant HTML and add it to the web page
     */
    _fillRestaurantHTML() {
        const name = document.getElementById('restaurant-name');
        name.innerHTML = this._restaurant.name;

        const address = document.getElementById('restaurant-address');
        address.innerHTML = this._restaurant.address;

        const image = document.getElementById('restaurant-img');
        image.className = 'restaurant-img';
        image.src = DBHelper.imageUrlForRestaurant(this._restaurant, '800');
        image.alt = this._restaurant.name;

        for (let value of ['800', '600', '400', '270']) {
            let source = document.getElementById('restaurant-img-' + value);
            source.srcset = DBHelper.imageUrlForRestaurant(this._restaurant, value);
        }

        const cuisine = document.getElementById('restaurant-cuisine');
        cuisine.innerHTML = this._restaurant.cuisine_type;

        // fill operating hours
        if (this._restaurant.operating_hours) {
            this._fillRestaurantHoursHTML();
        }
        // fill reviews
        this._fillReviewsHTML();
    }

    /**
     * Create restaurant operating hours HTML table and add it to the web page.
     */
    _fillRestaurantHoursHTML() {
        const hours = document.getElementById('restaurant-hours');
        const operatingHours = this._restaurant.operating_hours;
        for (let key in operatingHours) {
            const row = document.createElement('tr');

            const day = document.createElement('td');
            day.innerHTML = key;
            row.appendChild(day);

            const time = document.createElement('td');
            time.innerHTML = operatingHours[key];
            row.appendChild(time);

            hours.appendChild(row);
        }
    }

    /**
     * Create all reviews HTML and add them to the web page.
     */
    _fillReviewsHTML() {
        const container = document.getElementById('reviews-container');
        const title = document.createElement('h2');
        const reviews = this._restaurant.reviews;
        title.innerHTML = 'Reviews';
        container.appendChild(title);

        if (!reviews) {
            const noReviews = document.createElement('p');
            noReviews.innerHTML = 'No reviews yet!';
            container.appendChild(noReviews);
            return;
        }
        const ul = document.getElementById('reviews-list');
        reviews.forEach(review => {
            ul.appendChild(RestaurantReviewsService.createReviewHTML(review));
        });
        container.appendChild(ul);
    }

    /**
     * Add restaurant name to the breadcrumb navigation menu
     */
    _fillBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumb');
        const li = document.createElement('li');
        li.innerHTML = this._restaurant.name;
        breadcrumb.appendChild(li);
    }

    _getMap() {
        const mapDto = new MapDto();
        mapDto
            .setLatitude(this._restaurant.latlng.lat)
            .setLongitude(this._restaurant.latlng.lng)
            .setZoom(16);

        const mapBox = new MapBox(mapDto, new MapLayerDto());
        return mapBox.create().createLayer().getMap();
    }

    /**
     * Create review HTML and add it to the web page.
     */
    static createReviewHTML(review) {
        const li = document.createElement('li');
        const userInfo = document.createElement('div');
        const name = document.createElement('div');
        name.innerHTML = review.name;
        userInfo.appendChild(name);

        const date = document.createElement('div');
        date.innerHTML = review.date;
        userInfo.appendChild(date);
        userInfo.classList.add('user-info');
        li.appendChild(userInfo);

        const rating = document.createElement('div');
        rating.classList.add('rating');
        rating.innerHTML = `<div>Rating: ${review.rating}</div>`;
        li.appendChild(rating);

        const comments = document.createElement('p');
        comments.innerHTML = review.comments;
        li.appendChild(comments);

        return li;
    }

    /**
     * Get a parameter by name from page URL.
     */
    static getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(url);
        let parameter = null;
        if (results && results[2]) {
            parameter = decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
        return parameter;
    }
}