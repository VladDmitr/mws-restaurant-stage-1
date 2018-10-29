'use strict';

/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const restaurantReviewsService = new RestaurantReviewsService();
    restaurantReviewsService.fetchRestaurant();
});