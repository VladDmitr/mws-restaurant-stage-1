'use strict';

/**
 * @description Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const mapDto = new MapDto();
    mapDto
        .setLatitude(40.722216)
        .setLongitude(-73.987501)
        .setZoom(12);

    const mapBox = new MapBox(mapDto, new MapLayerDto());

    const restaurantReviewsService = new RestaurantReviewsService(mapBox);
    restaurantReviewsService.updateRestaurants();

    const fetchFiltersService = new FetchFiltersService();
    fetchFiltersService.fetchNeighborhoods();
    fetchFiltersService.fetchCuisines();

    FetchFiltersService.getCuisinesSelectElement().onchange = () => {
        restaurantReviewsService.updateRestaurants();
    };

    FetchFiltersService.getNeighborhoodsSelectElement().onchange = () => {
        restaurantReviewsService.updateRestaurants();
    };
});