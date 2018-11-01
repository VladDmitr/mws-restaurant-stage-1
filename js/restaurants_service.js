'use strict';

/**
 * @description Restaurant reviews service
 */
class RestaurantReviewsService {

    /**
     * @constructor
     * @param {MapBox} mapBox
     */
    constructor(mapBox) {
        this._mapBox = mapBox.create().createLayer();
        this._restaurants = [];
        this._markers = [];
    }

    /**
     * @description Update page and map for current restaurants.
     */
    updateRestaurants() {
        const cSelect = FetchFiltersService.getCuisinesSelectElement();
        const nSelect = FetchFiltersService.getNeighborhoodsSelectElement();

        const cIndex = cSelect.selectedIndex;
        const nIndex = nSelect.selectedIndex;

        const cuisine = cSelect[cIndex].value;
        const neighborhood = nSelect[nIndex].value;

        DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
            if (error) {
                throw new Error(error.toString());
            } else {
                this._restaurants = restaurants;
                this._resetRestaurants();
                this._fillRestaurantsHTML();
            }
        })
    }

    /**
     * @description Get restaurants list element
     * @returns {null|Element}
     */
    static getRestaurantsListElement() {
        return document.getElementById('restaurants-list');
    }

    /**
     * @description Clear current restaurants, their HTML and remove their map markers.
     */
    _resetRestaurants() {
        const ul = RestaurantReviewsService.getRestaurantsListElement();
        ul.innerHTML = '';

        // Remove all map markers
        if (this._markers) {
            this._markers.forEach(marker => marker.remove());
        }
        this._markers = [];
    }

    /**
     * @description Create all restaurants HTML and add them to the webpage.
     */
    _fillRestaurantsHTML() {
        const ul = RestaurantReviewsService.getRestaurantsListElement();
        this._restaurants.forEach(restaurant => {
            ul.append(RestaurantReviewsService.createRestaurantHTML(restaurant));
        });
        this._addMarkersToMap();
    }

    /**
     * @description Create restaurant HTML.
     *  @param {object} restaurant
     * @returns {Element}
     */
    static createRestaurantHTML(restaurant) {
        const li = document.createElement('li');
        li.title = 'Restaurant ' + restaurant.name;
        li.tabIndex = 0;

        const image = document.createElement('img');
        image.className = 'restaurant-img';
        image.src = DBHelper.imageUrlForRestaurant(restaurant, '270');
        image.alt = restaurant.name;
        li.append(image);

        const name = document.createElement('h1');
        name.innerHTML = restaurant.name;
        li.append(name);

        const neighborhood = document.createElement('p');
        neighborhood.innerHTML = restaurant.neighborhood;
        li.append(neighborhood);

        const address = document.createElement('p');
        address.innerHTML = restaurant.address;
        li.append(address);

        const more = document.createElement('a');
        const moreName = 'View Details';
        more.title = moreName + ' of ' + restaurant.name;
        more.setAttribute('role', 'button');
        more.innerHTML = moreName;
        more.href = DBHelper.urlForRestaurant(restaurant);
        li.append(more);

        return li
    };

    /**
     * @description Add markers for current restaurants to the map.
     */
    _addMarkersToMap() {
        this._restaurants.forEach(restaurant => {
            // Add marker to the map
            const marker = DBHelper.mapMarkerForRestaurant(restaurant, this._mapBox.getMap());
            marker.on('click', () => {
                window.location.href = marker.options.url;
            });
            this._markers.push(marker);
        });
    }
}