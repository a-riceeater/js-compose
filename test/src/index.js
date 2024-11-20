/*
 * Copyright (c) 2024 Elijah Bantugan
 * 
 * This software is licensed under the MIT License. 
 * See the LICENSE for more information.
 * 
 * js-compose test script
 */ 


function onCreate(window) {
    window.setContent({
        appTheme: [
            Text("Hello World", { modifier: Modifier().setColor("red").setSize("32px") }),
            Greeting(window.composable(), "elijah")
        ]
    })
}

function Greeting(Composable, name) {
    Composable.setContent([
        Text("Hello " + name, { modifier: Modifier().setColor("blue") })
    ])
    return Composable;
}