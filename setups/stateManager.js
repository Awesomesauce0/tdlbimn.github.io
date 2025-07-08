let GS = {
    movie: {
        now: false, //(true for begining game)
        scene: "bowlingAlley",//bedroom
        mov: "SaveBowling"//HelloWorld
        
    },
    playerState:{
        spawn: "SpawnStart", //SpawnBegin
        curArea: "Suburb",
        items: []
    },
    npcState:{
        blue:{
            name: "blue",
            talkState: "YouSuck",
            switchy:{
                "YouSuck":"YouSuckAgain",
                "YouSuckAgain":"YouSuckAgain"
            },
            scene: "bedroom",
            spawnPos: [100,150],
            bookGiven: false,
            talkbox: { shape: new k.Rect(k.vec2(0,50), 50, 50),},
            hitbox: { shape: new k.Rect(k.vec2(1,51), 48, 48),}
        },
        green:{
            name: "green",
            talkState: "NiceDay",
            scene: "Suburb", 
            spawnPos: [743.75, 381.25]
            //red never survived, only we live to tell the tale
        },
        lucas:{
            name: "lucas",
            talkState: "StartBowlingQuest",
            switchy:{
                "StartBowlingQuest":"WinningSoHard",
                "WinningSoHard":"NothingMuch",
                "GiveTrophy":"DoinChewin",
                "DoinChewin":"DoinChewin",
            },
            scene: "suburb", 
            spawnPos: [1400,1300],
            talkbox: { shape: new k.Rect(k.vec2(0,50), 50, 50),},
            hitbox: { shape: new k.Rect(k.vec2(1,51), 48, 48),},
            
        },
        worriedKid:{

            name: "worriedKid",
            talkState: "StartWKQuest",
            switchy:{
                "StartWKQuest":"WorriedKidTreeStare",
                "WorriedKidTreeStare":"WorriedKidTreeStare",
                
                "GetTickets":"AfterTakingTickets",
                "AfterTakingTickets":"AfterTakingTickets",
            },
            scene: "suburb",
            spawnPos: [1980,1450],
            talkbox: { shape: new k.Rect(k.vec2(0,50), 50, 50),},
            hitbox: { shape: new k.Rect(k.vec2(1,51), 48, 48),}

        },
        smartKid:{
            name: "smartKid",
            talkState: "TestBounce",
            switchy:{
                "TestBounce":"TestBounce",
            },
            scene: "suburb",
            spawnPos: [-100,-100],
            talkbox: { shape: new k.Rect(k.vec2(0,50), 50, 50),},
            hitbox: { shape: new k.Rect(k.vec2(1,51), 48, 48),}
        },

    },
    events:{
        HelloEV: true
    },
    talkboxSwitch:{
        "HidingKidTB": {
            show: true,
            talkState: "FindBoy",
            switchy:{
            "FindBoy":"NoBoy",
            "NoBoy":"NoBoy",
            },
        },
        "NthHereTB": {
            show: true,
            talkState: "NthHere",
            switchy:{
            "NthHere":"NthHere",
            },
        },      
        "TomTreeTB": {
            show: true,
            talkState: "Tom",
            switchy:{
            "Tom":"Tom2",
            "Tom2":"Tom2",
            },
        }, 
        "BowlMachineTB": {
            show: true,
            talkState: "NoBalls",
            switchy:{
            "NoBalls":"StillNoBalls",
            "StillNoBalls":"StillNoBalls",
            },
        }, 
        "BowlOwnerTB": {
            show: true,
            talkState: "BowlOwner1",
            switchy:{
            "BowlOwner1":"GetABall",
            "GetABall":"GetABall",
            "StillHere":"GetABall",
            "BowlOwner2":"BowlOwner2",
            "BowlOwner3":"BowlOwner3"       
            },
        }, 
        "EvilTrashcanTB":{
            show: true,
            talkState: "ItLooksAtYou",
            switchy:{
            "ItLooksAtYou":"ItLooksAtYou",
            "QuarterGot":"More", 
            "More":"ItLooksAtYou2", 
            "ItLooksAtYou2":"ItLooksAtYou2", 

            },
        },
        "HidingKidTB": {
            show: true,
            talkState: "FindBoy",
            switchy:{
            "FindBoy":"NoBoy",
            "NoBoy":"NoBoy",
            },
    
        },
        "BeachGateTB": {
            show: true,
            talkState: "CantBeach",
            switchy:{
            "CantBeach":"StillCantBeach",
            "StillCantBeach":"StillCantBeach",
            "CanBeach":"CanBeach",
            },
        },
        "BeachSpotTB": {
            show: true,
            talkState: "CantBeach",
            switchy:{
            "CantBeach":"CantBeach",
            "CanBeach":"CanBeach",
            },
        },
    },
    itemSpawn:{
        BookItem: true,
        Tweezers: true,
    },
    enemySpawn:{
        "pin": "bowlingAlley",
        "gumhing":"orangeStore"
    },
    barriers:["BeachGate"],
    othaStuff:{
        bname: "Lingo",
        spawnBuddy: true,
        noBowlingBalls: false,
        haveBall: false
    },
    talkedTo:[]

}


function saveStuff(l){
    if (!l){
    //savedata
    
        console.log(JSON.stringify(GS))
    } else {
    //load data
        GS = JSON.parse(l)
    }
}