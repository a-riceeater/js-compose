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
    console.log(data, typeof data.appTheme)
    if (!data.appTheme || data.appTheme.length == 0) return throwJetpackError("No app theme provided");
    if (typeof data.appTheme != 'object') return throwJetpackError("Invalid app theme type. Type Array expected")

    for (let i = 0; i < data.appTheme.length; i++) {
        
    }
}

function throwJetpackError(error, keyword) {
    console.error(`Jetpack Error [Error Type ${keyword}]:\n${error}`)
    return { type: "error", keyword: keyword }
}

function Modifier() {
    return {
        color: "",
        size: ""
    }
}


function Text(text, modifier) {
    if (!text) return throwJetpackError("Missing text content", "undefined")
    return { type: "text-element", modifier: modifier }
}

function __createTextElement() {

}