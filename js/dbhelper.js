'use strict';

/**
 * @description Common database helper functions.
 */
class DBHelper {

    /**
     * @description Database URL. Change this to restaurants.json file location on your server.
     */
    static get DATABASE_URL() {
        const port = 8887; // Change this to your server port
        return `http://localhost:${port}/data/restaurants.json`;
    }

    /**
     * @description Fetch all restaurants.
     * @param {function} callback
     */
    static fetchRestaurants(callback) {
        fetch(DBHelper.DATABASE_URL).then(function (response) {
            return response.text();
        }).then(function (text) {
            const json = JSON.parse(text);
            callback(null, json.restaurants);
        }).catch(function (error) {
            callback(error.message, null);
        });
    }

    /**
     * @description Fetch a restaurant by its ID.
     * @param {string} id
     * @param {function} callback
     */
    static fetchRestaurantById(id, callback) {
        // fetch all restaurants with proper error handling.
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                const restaurant = restaurants.find(r => r.id === parseInt(id));
                if (restaurant) { // Got the restaurant
                    callback(null, restaurant);
                } else { // Restaurant does not exist in the database
                    callback('Restaurant does not exist', null);
                }
            }
        });
    }

    /**
     * @description Fetch restaurants by a cuisine type with proper error handling.
     * @param {string} cuisine
     * @param {function} callback
     */
    static fetchRestaurantByCuisine(cuisine, callback) {
        // Fetch all restaurants  with proper error handling
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Filter restaurants to have only given cuisine type
                const results = restaurants.filter(r => r.cuisine_type === cuisine);
                callback(null, results);
            }
        });
    }

    /**
     * @description Fetch restaurants by a neighborhood with proper error handling.
     * @param {string} neighborhood
     * @param {function} callback
     */
    static fetchRestaurantByNeighborhood(neighborhood, callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Filter restaurants to have only given neighborhood
                const results = restaurants.filter(r => r.neighborhood === neighborhood);
                callback(null, results);
            }
        });
    }

    /**
     * @description Fetch restaurants by a cuisine and a neighborhood with proper error handling.
     * @param {string} cuisine
     * @param {string} neighborhood
     * @param {function} callback
     */
    static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                let results = restaurants;
                if (cuisine !== 'all') { // filter by cuisine
                    results = results.filter(r => r.cuisine_type === cuisine);
                }
                if (neighborhood !== 'all') { // filter by neighborhood
                    results = results.filter(r => r.neighborhood === neighborhood);
                }
                callback(null, results);
            }
        });
    }

    /**
     * @description Fetch all neighborhoods with proper error handling.
     * @param {function} callback
     */
    static fetchNeighborhoods(callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Get all neighborhoods from all restaurants
                const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
                // Remove duplicates from neighborhoods
                const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) === i);
                callback(null, uniqueNeighborhoods);
            }
        });
    }

    /**
     * @description Fetch all cuisines with proper error handling.
     * @param {function} callback
     */
    static fetchCuisines(callback) {
        // Fetch all restaurants
        DBHelper.fetchRestaurants((error, restaurants) => {
            if (error) {
                callback(error, null);
            } else {
                // Get all cuisines from all restaurants
                const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
                // Remove duplicates from cuisines
                const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) === i);
                callback(null, uniqueCuisines);
            }
        });
    }

    /**
     * @description Restaurant page URL.
     * @param {object} restaurant
     * @returns {string}
     */
    static urlForRestaurant(restaurant) {
        return (`./restaurant.html?id=${restaurant.id}`);
    }

    /**
     * @description Restaurant image URL.
     * @param {object} restaurant
     * @param {string} size
     * @returns {string}
     */
    static imageUrlForRestaurant(restaurant, size) {
        return (`/img/${restaurant.images[size]}`);
    }

    /**
     * @description Map marker for a restaurant.
     * @returns {object}
     */
    static mapMarkerForRestaurant(restaurant, map) {
        // https://leafletjs.com/reference-1.3.0.html#marker
        const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
            {
                title: restaurant.name,
                alt: restaurant.name,
                url: DBHelper.urlForRestaurant(restaurant)
            });
        marker.addTo(map);
        return marker;
    }
}
