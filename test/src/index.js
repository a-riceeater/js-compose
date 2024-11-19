/*
 * Copyright (c) 2024 Elijah Bantugan
 * 
 * This software is licensed under the MIT License. 
 * See the LICENSE for more information.
 * 
 * js-compose test script
 */ 


function onCreate(window) {
    console.log(window)
    window.setContent({
        appTheme: [
            Text("Hello World", Modifier().setColor("red").setSize("32px")),
            Greeting(window.composable(), "elijah")
        ]
    })
}

function Greeting(Composable, name) {
    Composable.setContent([
        Text("Hello "+ name, Modifier().setColor("purple"))
    ])
    return Composable;
}