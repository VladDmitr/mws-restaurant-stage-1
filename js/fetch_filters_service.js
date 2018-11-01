'use strict';

/**
 * @description Fetch filters service
 */
class FetchFiltersService {

    /**
     * @constructor
     */
    constructor() {
        this._neighborhoods = null;
        this._cuisines = null;
    }

    /**
     * @description Fetch all neighborhoods and set their HTML.
     */
    fetchNeighborhoods() {
        DBHelper.fetchNeighborhoods((error, neighborhoods) => {
            if (error) {
                throw new Error(error.toString());
            } else {
                this._neighborhoods = neighborhoods;
                this._fillNeighborhoodsHTML();
            }
        });
    }

    /**
     * @description Get neighborhoods select element
     * @returns {null|Element}
     */
    static getNeighborhoodsSelectElement() {
        return document.getElementById('neighborhoods-select');
    }

    /**
     * @description Set neighborhoods HTML.
     */
    _fillNeighborhoodsHTML() {
        const select = FetchFiltersService.getNeighborhoodsSelectElement();
        this._neighborhoods.forEach(neighborhood => {
            const option = document.createElement('option');
            option.innerHTML = neighborhood;
            option.value = neighborhood;
            select.append(option);
        });
    }

    /**
     * @description Fetch all cuisines and set their HTML.
     */
    fetchCuisines() {
        DBHelper.fetchCuisines((error, cuisines) => {
            if (error) {
                throw new Error(error.toString());
            } else {
                this._cuisines = cuisines;
                this._fillCuisinesHTML();
            }
        });
    }

    /**
     * @description Get cuisines select element
     * @returns {null|Element}
     */
    static getCuisinesSelectElement() {
        return document.getElementById('cuisines-select');
    }

    /**
     * @description Set cuisines HTML.
     */
    _fillCuisinesHTML() {
        const select = FetchFiltersService.getCuisinesSelectElement();
        this._cuisines.forEach(cuisine => {
            const option = document.createElement('option');
            option.innerHTML = cuisine;
            option.value = cuisine;
            select.append(option);
        });
    }
}