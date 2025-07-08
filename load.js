const k = kaplay({
    width: 600,
    height: 400,
    font: "sans-serif",
    canvas: document.querySelector("#myKaCanvas"),
    global: false,
    debugKey: "y",/*FAT Y */
    background: [32, 74, 34],
    font: "happy",
    buttons:{
        down: {
            keyboard: ['s', 'down'],
        },
        up: {
            keyboard: ['w', 'up'],
        },
        left: {
            keyboard: ['a', 'left'],
        },
        right: {
            keyboard: ['d', 'right'],
        },
        dialog: {
            keyboard: ['z', 'l'],
        },
        openable: {
            keyboard: ['z', 'l'],
        },
        collect: {
            keyboard: ['z', 'l'],
        },
    },
    letterbox: true
});
k.setLayers(["game", "wipe", "battle", "textbox", "save"],"game")

k.loadBitmapFont("happy", addFont(), 31, 40);

k.loadSpriteAtlas(addTileset(), {
    "green": {
        x: 400,
        y: 50,
        width: 50,
        height: 100,
        sliceX: 1,
 
    },
    "blue": {
        x: 450,
        y: 50,
        width: 50,
        height: 100,
        sliceX: 1,
 
    },
    "red": {
        x: 350,
        y: 50,
        width: 50,
        height: 100,
        sliceX: 1,
 
    },
    "Tree": {
        x: 100,
        y: 0,
        width: 50,
        height: 100,
        sliceX: 1,

    },
    "House": {
        x: 150,
        y: 0,
        width: 150,
        height: 150,
        sliceX: 1,

    },
    "Lamp": {
        x: 300,
        y: 0,
        width: 50,
        height: 50,
        sliceX: 1,

    },
    "BookItem": {
        x: 300,
        y: 0,
        width: 50,
        height: 50,
        sliceX: 1,

    },
    "Save": {
        x: 100,
        y: 150,
        width: 50,
        height: 50,
        sliceX: 1,

    },

})

//main2
k.loadSprite("playa", "https://codehs.com/uploads/0c8da03f0c11ca91b3630edba180b030", {
    sliceX: 2,
    anims: {
        "stand": 0,
        "run": {from:0, to: 1, loop: true},
    },
    
});
k.loadSprite("Buddy", "https://file.garden/YrjIkQcm7i6LYrDg/LGImages/Buddy2.png", {
    sliceX: 5,
    anims: {
        "stand": 0,
        "run": {from:0, to: 1, loop: true},
        "beg":{from:2, to: 3, loop: true},
        "grabby": 4,
    },
    
});

k.loadSprite("timmy", timmySprite(), {
    sliceX: 6,
    anims: {
        "stand": 0,
        "form": {from:0, to: 2, loop: false, speed: 3},
        "jiggle": {from:2, to: 3, loop: true, speed: 1},
        "ouchie":4
    },
    
});

//npc
k.loadSprite("lucas", "https://codehs.com/uploads/41357076b891445803fd921082b58c11")
k.loadSprite("DialogIcons", "https://codehs.com/uploads/3468fe1163533c5b432f3b5071f48175",{
    anims: {
        "empty":0
    }
})
k.loadSprite("tinyTim", "https://codehs.com/uploads/13443d78aca97a87bfe7d85f1cce0ad6")
k.loadSprite("bow", "https://codehs.com/uploads/28095611ce4018e5cb1257416e7a5052")

k.loadSprite("worriedKid", "https://file.garden/YrjIkQcm7i6LYrDg/LGImages/worriedBrother_test.png")
k.loadSprite("smartKid", "https://file.garden/YrjIkQcm7i6LYrDg/LGImages/smartkid_test.png")
//OBJECTS
	k.loadSprite("tree", "https://codehs.com/uploads/3966ae18fb70db07a5c92fc4df6b9d99")//https://codehs.com/uploads/fb95f3fc641a566d83c2e619acbd72d0
	k.loadSprite("house", "https://codehs.com/uploads/20258280a3638c789ade7814758ee7e9")
	k.loadSprite("coolHouse", "https://codehs.com/uploads/678cc808fc495b220b7249dbf9d72c11")
	k.loadSprite("bowlingBuilding", "https://codehs.com/uploads/7a204594248208b75c25c5182a1ec736")
	k.loadSprite("bowlyThingy", "https://file.garden/YrjIkQcm7i6LYrDg/LGImages/bowlingThingy.png")
	k.loadSprite("Bed", "https://codehs.com/uploads/ee2894bf0bdef12703896556ca60e219")

	//orange store
	k.loadSprite("stockShelf", "https://file.garden/YrjIkQcm7i6LYrDg/LGImages/stockShelf_test.png")
	k.loadSprite("gumballMachine", "https://codehs.com/uploads/327acb7e53fffc56547afa3d01ce7ef7")
	k.loadSprite("orangeManStand", "https://file.garden/YrjIkQcm7i6LYrDg/LGImages/orangeManStand_test.png")
    //uproad
	k.loadSprite("orangeTownBuilding", "https://file.garden/YrjIkQcm7i6LYrDg/LGImages/orangeTown_test.png")
    //library
    k.loadSprite("libraryBuilding","https://file.garden/YrjIkQcm7i6LYrDg/LGImages/t_library.png")
    k.loadSprite("trophy","https://codehs.com/uploads/42c77030a4901a27c05d79f0fc1802fb",{
        sliceX: 2,
        anims: {
            "empty": 0,  
            "full": 1
        }
    })
    //bowl
    k.loadSprite("RicoPic","https://codehs.com/uploads/68de24a888c872649ac5cc202e406f3b")
    k.loadSprite("yardsale", "https://codehs.com/uploads/3038a7313099c67b273f65a6052602ee")
    k.loadSprite("Tweezers", "https://codehs.com/uploads/dc87fdcdd4361d1530339e690ac168da")


//enemies
k.loadSprite("pins", "https://codehs.com/uploads/a4d94f570cbc85242da223122e689c9a",{
    sliceX: 5,
    anims:{
        "alive": 0,
        "die": {from: 1, to:4}
    }
})
k.loadSprite("gumhing","https://codehs.com/uploads/e1a9255b72c2b7f771870d39cc0104b7",{
    sliceX: 6,
    sliceY: 6,
    anims:{
        "hiding": 0,
        "rise": {from: 0, to:5,speed:10},

    }
})
//bg


k.loadSprite("Death", deathSprite())
k.loadSprite("Home", addHome())
k.loadSprite("bedroom", "https://codehs.com/uploads/2f322a6e4ad5a1270b38e2503e8aa5b2")
k.loadSprite("livingroom", "https://codehs.com/uploads/94212f45df0e0e18032b4b23f4b39968")
k.loadSprite("suburb", "https://lghost.neocities.org/img/bg_suburbwip.png")
k.loadSprite("bowlingAlley", "https://file.garden/YrjIkQcm7i6LYrDg/LGImages/bg_bowlingAlley.png")
k.loadSprite("orangeStore", "https://file.garden/YrjIkQcm7i6LYrDg/LGImages/orangeStore_test22.png")
k.loadSprite("uproad","https://file.garden/YrjIkQcm7i6LYrDg/LGImages/uproad1.png")
k.loadSprite("library","https://file.garden/YrjIkQcm7i6LYrDg/LGImages/library_test.png")
k.loadSprite("landfill","https://codehs.com/uploads/971b5e80e1befd9257dfcc332474a220")
//stuff
