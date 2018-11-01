'use strict';

/**
 * @description ServiceWorker registration
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service_worker.js', {scope: '/'}).then(function (reg) {
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function (error) {
        console.log('Registration failed with ' + error);
    });
}