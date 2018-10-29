'use strict';

class FetchFiltersService {

    constructor() {
        this._neighborhoods = null;
        this._cuisines = null;
    }

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

    static getNeighborhoodsSelectElement() {
        return document.getElementById('neighborhoods-select');
    }

    _fillNeighborhoodsHTML() {
        const select = FetchFiltersService.getNeighborhoodsSelectElement();
        this._neighborhoods.forEach(neighborhood => {
            const option = document.createElement('option');
            option.innerHTML = neighborhood;
            option.value = neighborhood;
            select.append(option);
        });
    }

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

    static getCuisinesSelectElement() {
        return document.getElementById('cuisines-select');
    }

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