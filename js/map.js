'use strict';

/**
 * @description Map DTO
 */
class MapDto {

    /**
     * @constructor
     */
    constructor() {
        this._scrollWheelZoom = false;
    }

    /**
     * @description Set latitude
     * @param {float} latitude
     * @returns {MapDto}
     */
    setLatitude(latitude) {
        this._latitude = latitude;
        return this;
    }

    /**
     * @description Get latitude
     * @returns {null|float}
     */
    getLatitude() {
        return this._latitude;
    }

    /**
     * @description Set longitude
     * @param {float} longitude
     * @returns {MapDto}
     */
    setLongitude(longitude) {
        this._longitude = longitude;
        return this;
    }

    /**
     * @description Get longitude
     * @returns {null|float}
     */
    getLongitude() {
        return this._longitude;
    }

    /**
     * @description Set zoom
     * @param {int} zoom
     * @returns {MapDto}
     */
    setZoom(zoom) {
        this._zoom = zoom;
        return this;
    }

    /**
     * @description Get zoom
     * @returns {null|int}
     */
    getZoom() {
        return this._zoom;
    }

    /**
     * @description Set scroll wheel zoom
     * @param {boolean} scrollWheelZoom
     * @returns {MapDto}
     */
    setScrollWheelZoom(scrollWheelZoom) {
        this._scrollWheelZoom = scrollWheelZoom;
        return this;
    }

    /**
     * @description Get scroll wheel zoom
     * @returns {boolean}
     */
    getScrollWheelZoom() {
        return this._scrollWheelZoom;
    }
}

/**
 * @description Map layer DTO
 */
class MapLayerDto {

    /**
     * @constructor
     */
    constructor() {
        this._id = 'mapbox.streets';
        this._token = 'pk.eyJ1IjoidmxhZGRtaXRyIiwiYSI6ImNqbjBxNmJxeDFjd2MzcXFvaDJ3cWJmeWgifQ.sS_7QVLjyDEtu31guRmHxA';
        this._attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/" tabindex="-1">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/" tabindex="-1">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/" tabindex="-1">Mapbox</a>';
        this._maxZoom = 18;
    }

    /**
     * @description Set id
     * @param {string} id
     * @returns {MapLayerDto}
     */
    setId(id) {
        this._id = id;
        return this;
    }

    /**
     * @description Get id
     * @returns {string}
     */
    getId() {
        return this._id;
    }

    /**
     * @description Set token
     * @param {string} token
     * @returns {MapLayerDto}
     */
    setToken(token) {
        this._token = token;
        return this;
    }

    /**
     * @description Get token
     * @returns {string}
     */
    getToken() {
        return this._token;
    }

    /**
     * @description Set max zoom
     * @param {int} maxZoom
     * @returns {MapLayerDto}
     */
    setMaxZoom(maxZoom) {
        this._maxZoom = maxZoom;
        return this;
    }

    /**
     * @description Get max zoom
     * @returns {int}
     */
    getMaxZoom() {
        return this._maxZoom;
    }

    /**
     * @description Set attribution
     * @param {string} attribution
     * @returns {MapLayerDto}
     */
    setAttribution(attribution) {
        this._attribution = attribution;
        return this;
    }

    /**
     * @description Get attribution
     * @returns {string}
     */
    getAttribution() {
        return this._attribution;
    }
}

/**
 * @description Map box
 */
class MapBox {

    /**
     * @constructor
     * @param {MapDto} mapDto
     * @param {MapLayerDto} mapLayerDto
     */
    constructor(mapDto, mapLayerDto) {
        this._mapDto = mapDto;
        this._mapLayerDto = mapLayerDto;
        this._map = null;
    }

    /**
     * @description Create map
     * @returns {MapBox}
     */
    create() {
        this._map = L.map('map', {
            center: [this._mapDto.getLatitude(), this._mapDto.getLongitude()],
            zoom: this._mapDto.getZoom(),
            scrollWheelZoom: this._mapDto.getScrollWheelZoom()
        });
        return this;
    }

    /**
     * @description Create map layer
     * @returns {MapBox}
     */
    createLayer() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
            mapboxToken: this._mapLayerDto.getToken(),
            maxZoom: this._mapLayerDto.getMaxZoom(),
            attribution: this._mapLayerDto.getAttribution(),
            id: this._mapLayerDto.getId()
        }).addTo(this._map);
        return this;
    }

    /**
     * @description Get map
     * @returns {object}
     */
    getMap() {
       return this._map;
    }
}