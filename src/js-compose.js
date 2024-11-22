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
    if (!data.appTheme || data.appTheme.length == 0) return throwJetpackError("No app theme provided");
    if (typeof data.appTheme != 'object') return throwJetpackError("Invalid app theme type. Type object expected")

    function enumerateContent(els) {
        for (let i = 0; i < els.length; i++) {
            const element = els[i];
            switch (element.type) {
                case "error":
                    throwJetpackError("Ended execution due to invalid element supplied.")
                    return
                case "text":
                    __createTextElement(element.text, element.properties)
                    break
                case "composable":
                    // loop through the tokens returned from composable function
                    enumerateContent(element.__elements)
                    break
                case "button":
                    __createButtonElement(element.text, element.properties)
                    break
                case "checkbox":
                    __createCheckboxElement(element.checked, element.properties)
                    break
            }
        }
    }
    enumerateContent(data.appTheme)
    
}

__JETPACK_WINDOW.composable = function () {
    const c = {
        type: "composable",
        __elements: [],
        setContent: function (data) {
            if (!data || data.length == 0) return throwJetpackError("No app theme provided");
            if (typeof data != 'object') return throwJetpackError("Invalid app theme type. Type Array expected");
            
            this.__elements = data;
            return c;
        }
    }
    return c;
}

function throwJetpackError(error, keyword) {
    console.error(`Jetpack Error [Error Type ${keyword}]:\n${error}`)
    return { type: "error", keyword: keyword }
}

function Modifier() {
    const m = {
        __color: "",
        __fontSize: "",
        __cursor: "",
        setColor: function (color) {
            this.__color = color;
            return m
        },
        setSize: function (size) {
            this.__fontSize = size
            return m
        },
        setFontFamily: function (family) {
            this.__fontFamily = family
            return m
        },
        setCursor: function (cursor) {
            this.__cursor = cursor;
            return m
        }
    }
    return m
}


function Text(text, properties = {}) {
    if (!text) return throwJetpackError("Missing text content", "undefined");

    const modifier = properties.modifier;

    return { type: "text", text: text, modifier: modifier, properties: properties }
}

function __createTextElement(text, properties = {}) {
    const element = document.createElement("p")
    element.innerText = text;

    // apply properties from modifier
    Object.entries(properties).forEach(([key, value]) => {
        if (key == "modifier") {
            Object.entries(value).forEach(([key, value]) => {
                if (typeof value == "string") {
                    element.style[key.replace("__", "")] = value;
                }
            })
        }
        if (key == "onClick") {
            if (typeof value == "function") {
                element.addEventListener("click", value)
            } else return throwJetpackError("Expected type function for onClick")
        }

    })

    document.body.appendChild(element);
}

function Button(text, properties = {}) {
    if (!text) return throwJetpackError("Missing text content", "undefined");

    const modifier = properties.modifier;

    return { type: "button", text: text, modifier: modifier, properties: properties }
}

function __createButtonElement(text, properties) {
    const element = document.createElement("button");
    element.innerText = text;

    // apply properties from modifier
    Object.entries(properties).forEach(([key, value]) => {
        if (key == "modifier") {
            Object.entries(value).forEach(([key, value]) => {
                if (typeof value == "string") {
                    element.style[key.replace("__", "")] = value;
                }
            })
        }
        if (key == "onClick") {
            if (typeof value == "function") {
                element.addEventListener("click", value)
            } else return throwJetpackError("Expected type function for onClick")
        }

    })

    document.body.appendChild(element);
}

function Checkbox(checked = false, properties = {}) {
    const modifier = properties.modifier;

    return { type: "checkbox", checked: checked, modifier: modifier, properties: properties }
}

function __createCheckboxElement(checked, properties) {
    const element = document.createElement("input");
    element.type = "checkbox"
    element.checked = checked

    element.addEventListener("change", properties.onCheckedChange);

    document.body.appendChild(element);
}