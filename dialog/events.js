function addMovie(entities, dialogCallback,objWho){
    return {
    move: function() {
        dialogCallback(["hide"]);
        entities.player.collisionIgnore.push("NPC")
        entities.red.tween(k.vec2(500,300), k.vec2(350,300), 1, (val) => (entities.red.pos = val)).onEnd(()=>{
        entities.red.tween(k.vec2(350,300), k.vec2(350,130), 1, (val) => (entities.red.pos = val)).onEnd(()=>{
                k.destroy(entities.red)
                GS.redState.scene = "Suburb"
                GS.blueState.spawnPos = [430,300]
                GS.greenState.spawnPos = [570,300]
                GS.blueState.talkState = "BlueNoise"
                GS.greenState.talkState = "GreenNoise"
        k.wait(0.5, ()=>{
                dialogCallback(["show", "go"])
                entities.player.collisionIgnore.pop()
        });
        });

        });
        
    },
    begin: function(){
        dialogCallback(["hide"])
        entities.player.freeze = true;
        entities.player.pos = k.vec2(250, -250) 
        k.wait(1, ()=>{
            k.tween(k.vec2(250,-250), k.vec2(250,200), 3, (val) => (entities.player.pos = val)).onEnd(()=>{

                dialogCallback(["show", "go"])
            })
        })
        
    },
    setupbattle: function(){
        dialogCallback(["hide", "battle"])
    },
    lights: function(){
        dialogCallback(["lights"])
        
    },
    timform: function(){
        dialogCallback(["hide"]);
        entities.enemy.timmy.play("form", {onEnd: function(){
            
            dialogCallback(["show", "go"])   
        }})

        //callback(["lights"])
        
    },
    noBowlingBalls: function(){
        GS.talkboxSwitch.BowlOwnerTB.talkState = "BowlOwner2"
        dialogCallback(["go"])
    },
    moveInPins: function(){
        dialogCallback(["hide"]);
        
        dialogCallback(["resetObjWho", "entities.enemy.pin"]) 
        entities.player.flipX = true
        k.tween(entities.enemy.pin.pos, k.vec2(300,150), 1, (p) => entities.enemy.pin.pos = p)
        
        dialogCallback(["show", "go"])   
    },

    //worried kid quest
    kidBounce: function(){
        dialogCallback(["hide"])  
        entities.smartKid.flipX = true
        entities.smartKid.pos = k.vec2(850,1450)
        entities.smartKid.jump(50,750,1600,0.5)
        k.wait(2,()=>{
            entities.smartKid.flipX = false
            dialogCallback(["show", "go"])  
            
        })
    },
    kidRunToShop: async function(){
        dialogCallback(["hide"])  
        await k.tween(entities.smartKid.pos.y, 1250,2,(p) => entities.smartKid.pos.y = p)
        entities.smartKid.pos = k.vec2(1300,640)
        GS.npcState.smartKid.spawnPos = [1300,640]
        dialogCallback(["show", "go"])  
    },

    getBeachBall: function(){ 
        GS.playerState.items.push("BeachBall");

        if (!GS.talkedTo.includes("worriedKid")){
            GS.npcState.worriedKid.talkState = "StartWKQuest";
        } else {
            //continue as normal
            GS.npcState.worriedKid.talkState = "GetTickets";
        }
        dialogCallback(["show", "go"])  
    },
    
    endBallQuestEarly: function(){
        
        if (GS.playerState.items.includes("BeachBall")){
            GS.npcState.worriedKid.talkState = "AfterTakingTickets"
            dialogCallback(["RESET", "GetTickets"]) 
        } else {
            //continue as normal
            dialogCallback(["show", "go"]) 
        }
    },
    worriedKidFlip: function(){
        entities.worriedKid.flipX = !entities.worriedKid.flipX
        dialogCallback(["show", "go"])  
    },
    worriedKidFlipLeft: function(){
        entities.worriedKid.flipX = true
        dialogCallback(["show", "go"])  
    },
    getTickets: function(){
        GS.playerState.items.push("Tickets");
        dialogCallback(["show", "go"]) 
        
    }, 
    RicoPic: function(){
        dialogCallback(["hide"]) 
        let pic = k.add([
            k.sprite("RicoPic"),
            k.pos(0,0),
            k.layer("wipe"),
        ])
        k.wait(3,()=>{
            k.destroy(pic)
            dialogCallback(["show", "go"]) 
        })
        
    }, 
    getProducts: function(){
        GS.playerState.items.push("orangeProducts");
        GS.talkboxSwitch.EvilTrashcanTB.talkState = "QuarterGot"
        dialogCallback(["show", "go"])         
    },
    trophyFall: async function(){
        dialogCallback(["hide"])  
        let trophyTemp = k.add([
            k.sprite("trophy"),
            k.pos(0,0),
            k.z(),
            "trophyTemp"
        ])
        
        trophyTemp.z = entities.buddy.z + 1
        let bp = entities.buddy.pos
        await k.tween(k.vec2(bp.x - 55, bp.y - 800), k.vec2(bp.x - 55, bp.y - 100),1,(p) => trophyTemp.pos = p)
        await k.wait(0.5)
        dialogCallback(["show", "go"])           
    },
    getTrophy: function(){
        GS.playerState.items.push("trophy");
        GS.npcState.lucas.talkState = "GiveTrophy"
        dialogCallback(["show", "go"])         
    },
    gumhingRise: function(){
        dialogCallback(["hide"])     
        entities.enemy.gumhing.play("rise")
        dialogCallback(["resetObjWho", "entities.enemy.gumhing"]) 
        k.wait(2,()=>{
            dialogCallback(["show", "go"])     
        })
    },
    gumhingShake: function(){
        dialogCallback(["hide"])   
        let offset = 4
        let gx = entities.enemy.gumhing.pos.x
        let shake = k.loop(0.01,()=>{
            offset = offset * -1
            entities.enemy.gumhing.pos.x = gx + offset
            console.log(entities.enemy.gumhing.pos.x)
        })
        k.wait(2,()=>{
            shake.cancel()
            entities.enemy.gumhing.pos.x = gx  
            dialogCallback(["show", "go"])   
        })
    },
    getTweezers: function(){
        GS.playerState.items.push("Tweezers");
        k.destroyAll("Tweezers")
        GS.itemSpawn.Tweezers = false
        GS.talkboxSwitch.BeachGateTB.talkState = "CanBeach"
        dialogCallback(["show", "go"])   
    },
    beachBarrier: function(){
        k.destroyAll("BeachGate")
        GS.barriers.pop("BeachGate")
        k.destroyAll("Tweezers")
        k.destroyAll("BeachGateTB")
        GS.talkboxSwitch.BeachGateTB.show = false
        dialogCallback(["show", "go"])   
    }
}
}