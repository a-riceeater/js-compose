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
        console.error(err)
        throwJetpackError("onCreate function not found")
    }
})

__JETPACK_WINDOW.setContent = function (data) {
    console.log(data, typeof data.appTheme)
    if (!data.appTheme || data.appTheme.length == 0) return throwJetpackError("No app theme provided");
    if (typeof data.appTheme != 'object') return throwJetpackError("Invalid app theme type. Type Array expected")

    for (let i = 0; i < data.appTheme.length; i++) {
        const element = data.appTheme[i];
        console.log(element)
        switch (element.type) {
            case "error":
                throwJetpackError("Ended execution due to invalid element supplied.")
                return
            case "text":
                __createTextElement(element.text, element.modifier)
        }
    }
}

function throwJetpackError(error, keyword) {
    console.error(`Jetpack Error [Error Type ${keyword}]:\n${error}`)
    return { type: "error", keyword: keyword }
}

function Modifier() {
    const m = {
        __color: "",
        __fontSize: "",
        setColor: function(color) {
            this.__color = color;
            return m
        },
        setSize: function(size) {
            this.__fontSize = size
            return m
        }
    }
    console.log(m)
    return m
}


function Text(text, modifier) {
    if (!text) return throwJetpackError("Missing text content", "undefined")
    return { type: "text", text: text, modifier: modifier }
}

function __createTextElement(text, modifier) {
    const element = document.createElement("p")
    element.innerText = text;
    console.log(modifier)    
    // apply properties from modifier
    Object.entries(modifier).forEach(([key, value]) => {
        if (typeof value == "string") { 
            element.style[key.replace("__", "")] = value; }
    })

    document.body.appendChild(element);
}