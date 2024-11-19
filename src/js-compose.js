/*
 * Copyright (c) 2024 Elijah Bantugan
 * 
 * This software is licensed under the MIT License. 
 * See the LICENSE for more information.
 * 
 * js-compose v0.0.1
 */ 

"use strict";

const __JETPACK_WINDOW = {};

document.addEventListener("DOMContentLoaded", (e) => {
    try {
        onCreate(__JETPACK_WINDOW)
    } catch (err) {
        throwJetpackError("onCreate function not found")
    }
})

__JETPACK_WINDOW.setContent = function (data) {
    console.log(data)
    if (!data.appTheme) return throwJetpackError("No app theme provided");
    if (typeof data.appTheme != Object) return throwJetpackError("Invalid app theme type. Type Object expected")
}

function throwJetpackError(error) {
    console.error("Jetpack Error:\n" + error)
}