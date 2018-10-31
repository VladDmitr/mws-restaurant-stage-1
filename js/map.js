'use strict';

class MapDto {

    constructor() {
        this._scrollWheelZoom = false;
    }

    setLatitude(latitude) {
        this._latitude = latitude;
        return this;
    }

    getLatitude() {
        return this._latitude;
    }

    setLongitude(longitude) {
        this._longitude = longitude;
        return this;
    }

    getLongitude() {
        return this._longitude;
    }

    setZoom(zoom) {
        this._zoom = zoom;
        return this;
    }

    getZoom() {
        return this._zoom;
    }

    setScrollWheelZoom(scrollWheelZoom) {
        this._scrollWheelZoom = scrollWheelZoom;
        return this;
    }

    getScrollWheelZoom() {
        return this._scrollWheelZoom;
    }
}

class MapLayerDto {

    constructor() {
        this._id = 'mapbox.streets';
        this._token = 'pk.eyJ1IjoidmxhZGRtaXRyIiwiYSI6ImNqbjBxNmJxeDFjd2MzcXFvaDJ3cWJmeWgifQ.sS_7QVLjyDEtu31guRmHxA';
        this._attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/" tabindex="-1">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/" tabindex="-1">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/" tabindex="-1">Mapbox</a>';
        this._maxZoom = 18;
    }

    setId(id) {
        this._id = id;
        return this;
    }

    getId() {
        return this._id;
    }

    setToken(token) {
        this._token = token;
        return this;
    }

    getToken() {
        return this._token;
    }

    setMaxZoom(maxZoom) {
        this._maxZoom = maxZoom;
        return this;
    }

    getMaxZoom() {
        return this._maxZoom;
    }

    setAttribution(attribution) {
        this._attribution = attribution;
        return this;
    }

    getAttribution() {
        return this._attribution;
    }
}

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

    create() {
        this._map = L.map('map', {
            center: [this._mapDto.getLatitude(), this._mapDto.getLongitude()],
            zoom: this._mapDto.getZoom(),
            scrollWheelZoom: this._mapDto.getScrollWheelZoom()
        });
        return this;
    }

    createLayer() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
            mapboxToken: this._mapLayerDto.getToken(),
            maxZoom: this._mapLayerDto.getMaxZoom(),
            attribution: this._mapLayerDto.getAttribution(),
            id: this._mapLayerDto.getId()
        }).addTo(this._map);
        return this;
    }

    getMap() {
       return this._map;
    }
}