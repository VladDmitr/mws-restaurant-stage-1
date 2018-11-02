'use strict';

/**
 * @description Service worker DTO
 */
class ServiceWorkerDto {

    /**
     * @description Set self
     * @param {object} self
     * @returns {ServiceWorkerDto}
     */
    setSelf(self) {
        this._self = self;
        return this;
    }

    /**
     * @description Get self
     * @returns {object}
     */
    getSelf() {
        return this._self;
    }

    /**
     * @description Set cache name
     * @param {string} cacheName
     * @returns {ServiceWorkerDto}
     */
    setCacheName(cacheName) {
        this._cacheName = cacheName;
        return this;
    }

    /**
     * @description Get cache name
     * @returns {string}
     */
    getCacheName() {
        return this._cacheName;
    }

    /**
     * @description Set cache urls
     * @param {array} cachedURIs
     * @returns {ServiceWorkerDto}
     */
    setCachedURIs(cachedURIs) {
        this._cachedURIs = cachedURIs;
        return this;
    }

    /**
     * @description Get cache urls
     * @returns {array}
     */
    getCachedURIs() {
        return this._cachedURIs;
    }
}

/**
 * @description Service worker
 */
class ServiceWorker {

    /**
     * @constructor
     * @param {ServiceWorkerDto} config
     */
    constructor(config) {
        this._config = config;
    }

    /**
     * @description Service worker setup
     */
    setup() {
        const self = this;
        this._config.getSelf().addEventListener('install', function (event) {
            event.waitUntil(
                caches.open(self._config.getCacheName()).then(function (cache) {
                    return cache.addAll(self._config.getCachedURIs());
                })
            );
        });

        this._config.getSelf().addEventListener('fetch', function (event) {
            event.respondWith(caches.open(self._config.getCacheName()).then(function (cache) {
                    return caches.match(event.request, {'ignoreSearch': true}).then(function (response) {
                            return response || fetch(event.request).catch(function (error) {
                            });
                        }
                    )
                }
            ));

            event.waitUntil(caches.open(self._config.getCacheName()).then(function (cache) {
                    return fetch(event.request).then(function (response) {
                        return cache.put(event.request, response);
                    }).catch(function (error) {
                    });
                }
            ));
        });
    }
}

const serviceWorkerDto = new ServiceWorkerDto();
serviceWorkerDto
    .setSelf(self)
    .setCacheName(Math.random().toString(36).substring(7))
    .setCachedURIs(['/', '/restaurant.html', '/data/restaurants.json', '/css/styles.css']);
const serviceWorker = new ServiceWorker(serviceWorkerDto);
serviceWorker.setup();