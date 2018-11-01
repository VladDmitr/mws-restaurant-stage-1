'use strict';

/**
 * @description Initialize map and fetch restaurant as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const restaurantInfoService = new RestaurantInfoService();
    restaurantInfoService.fetchRestaurant();
});