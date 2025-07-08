
k.scene("game", async (area) =>{
//entities  
    let entities = {
      //blue: null,
      //green: null,
      player: null,
      //buddy: null,
      //lucas: null,
      //worriedKid: null,
      //smartKid:null,
      enemy: {
      },
      wipe: k.add([ k.rect(k.width(),k.height()), k.color(0,0,0), k.fixed(), k.pos(0,0), k.layer("wipe"), k.opacity(1) ])

    }
//bg
k.onDraw(()=>{
        k.drawSprite({
            sprite: area,
        })
    })
//data

//mapdata
    let  mapData = JSON.parse(levelData[area]) 
    
    GS.playerState.curArea = area

//thingies
    let things =  []
    
    
//Savey
    let savey = k.add([
        k.sprite("Save"),
        k.pos(540,10),
        k.fixed(),
        k.layer("save"),
        k.area(),
        "savey",
        {
            add(){
                this.onClick((savey)=>{
                    k.debug.log('woah')
                    //k.debug.log(saveStuff())
                })
            
            }
        }
    ])
    
    
//WORLD CREATION
    function afterBattleDialouge(call){
        dialog.paused = false
        Dreset = call
        k.pressButton("dialog")   
    }
    
    makeWorld(entities, mapData, things, area, afterBattleDialouge)
    await k.wait(0.1)

//UI
    let textbox;
    let dialogText;
    let dialogImage;
    let lines; //
    let curText = 0;//
    let startDialog = true;
    let objWho; 
    let objCollected;
    let areaTo;
    let isBattle;
    let Dreset = null;
//extra callback functs

    
    function dialogCallback(calls){
        if (calls.includes("Item")){
            collect.paused = false
            k.pressButton("collect");
            collect.paused = true
        }
        if (calls.includes("show")){
            textbox.opacity = 1
            dialogText.opacity = 1
            dialogImage.opacity = 1
        }
        if (calls.includes("hide")){
            textbox.opacity = 0
            dialogText.opacity = 0
            dialogImage.opacity = 0
        }
        if (calls.includes("go")){
            dialog.paused = false
            k.pressButton("dialog")
        }
        if (calls.includes("battle")){
            isBattle = true;
            dialogCallback("go")
        }
        if (calls.includes("lights")){
            k.setBackground(0, 0, 20)
            entities.wipe.opacity = 0.75
            entities.wipe.pos = k.vec2(0,0)
            entities.player.layer = "battle"
            objWho.layer = "battle"
            entities.buddy.layer = "battle"
            
            k.wait(1, ()=>{
                dialog.paused = false
                k.pressButton("dialog") 
            })
        }
        if (calls.includes("resetObjWho")){
            objWho = eval(calls[1])
        }
        if (calls.includes("RESET")){
            k.destroy(textbox);
            dialog.paused = false
            startDialog = true
            Dreset = calls[1]
            k.pressButton("dialog")
        }
        
    } 
    let movie = addMovie(entities, dialogCallback, objWho)   
    await k.wait(0.1)
    let dialogLines = addLines(movie)
  

    //dialog
    let dialog = k.onButtonPress("dialog", () =>{ 
        if (startDialog){
            curText = -1;
            entities.player.collisionIgnore = ["textbox", "Buddy", "collider"];
            //collide.paused = true
            //decollide.paused = true
            entities.player.interact = false
            entities.player.freeze = true;
            savey.pos = k.vec2(540,-100);
            if (!Dreset){
                lines = dialougeDecider(objWho, movie);
            } else {
                lines = Dreset;
            }
            textbox = k.add([
                k.rect(540, 160, { radius: 4 }),
                k.pos(30, 250),
                k.outline(4),
                k.layer("textbox"),
                k.fixed(),
                k.opacity(),
                k.z(5),
                "textbox"
            ]);
            dialogText = textbox.add([
                k.text("", {
                    width: textbox.width - 115,
                    size: 24
                }),
                k.pos(115,5),
                k.color(0,0,0),
                k.layer("textbox"),
                k.area(),
                k.opacity(),
				k.z(6),
                "textbox"
            ]);
            dialogImage = textbox.add([
                k.sprite("DialogIcons"),
                k.pos(60,70),
                k.anchor("center"),
                k.layer("textbox"),
				k.z(6),
                "textbox"
            ])
            Dreset = null;
            startDialog = false;
        };
        if (!startDialog){
            curText += 1
            if (dialogLines[lines][curText][0] === "END"){
                GS.movie.now = false; //cancel cutscene
                startDialog = true; //reset dialouge

                //makes sure player can't start dialouge if isn't touching npc
                //dialog.paused = true;
                //if (entities.player.isColliding(objWho)){
                //    dialog.paused = false;
                //} 
                //KILL TEXTBOX
                k.destroy(textbox);
                
                //ends dialouge or starts battle
                if (!isBattle){
                    entities.player.interact = true
                    //collide.paused = false
                    //decollide.paused = false
                    entities.player.collisionIgnore = [];
                    entities.player.freeze = false;
                    savey.pos = k.vec2(540,10)
                    return;
                } else {
                    
                    dialog.paused = true;
                    entities.player.interact = false
                    //collide.paused = true
                    //decollide.paused = true
                    setupBattle(entities, objWho)
                    isBattle = false
                    return;
                }
            }
            if (typeof dialogLines[lines][curText][1] === "string"){ 
                //set current textz
                dialogText.text = dialogLines[lines][curText][1];
                //ICON
                
                try {
                    dialogImage.play(dialogLines[lines][curText][0])
                } catch(error){
                    dialogImage.play("empty")
                }
            } 
            if (typeof dialogLines[lines][curText][1] === "function"){
                //START EVENT
                dialog.paused = true;
                dialogLines[lines][curText][1](entities, dialogCallback)
            };
        };
    });
    
    //doors
    let nextSpawn;
    let openable = k.onButtonPress("openable", () => { 

        //dialougeChanges
        if (GS.talkboxSwitch.BowlOwnerTB.talkState == "GetABall" ){
            GS.talkboxSwitch.BowlOwnerTB.talkState = "StillHere"
        }

        entities.player.freeze = true;
        entities.wipe.pos = k.vec2(0,0)
        GS.playerState.spawn = nextSpawn
        k.tween(0, 1, 1, (x) => (entities.wipe.opacity = x)).onEnd(()=>{
            //k.debug.log('wow')
            k.go("game", areaTo)
        })

    });
    //items
    let collect = k.onButtonPress("collect", () =>{
        GS.playerState.items.push(objCollected.tags[2]);
        GS.itemSpawn[objCollected.tags[2]] = false
        k.destroy(objCollected)
        k.debug.log(GS.playerState.items)
    });
    

    
    dialog.paused = true;
    openable.paused = true;
    collect.paused = true;
    
//collison     
    
    let collide = entities.player.onCollideUpdate((obj) => {
        if (entities.player.interact){
            if (obj.tags[1] == "NPC" || 
                obj.tags[1] == "NPO" || 
                obj.tags[1] == "Enemy"||
                obj.tags[1] == "Talkbox"){
                objWho = obj;
                dialog.paused = false;
            }
            if (obj.tags[1] == "Door"){
                nextSpawn = obj.tags[3]
                areaTo = obj.tags[2];
                openable.paused = false;
            }
            if (obj.tags[1] == "Item"){
                objCollected = obj;
                objWho = obj;
                dialog.paused = false;
            }
            if (obj.tags[1] == "Event"){
                objWho = obj;
                GS.events[obj.tags[2]] = false
                dialog.paused = false;
                k.pressButton("dialog");
                k.destroy(obj)

            }
            if (obj.tags[1] == "InstaDoor"){
                openable.paused = false;
                nextSpawn = obj.tags[3]
                areaTo = obj.tags[2];
                collide.paused = true;
                k.pressButton("openable");
            }
        }
        
    })
    
    let decollide = entities.player.onCollideEnd((obj) => {
        if (entities.player.interact){
            //k.debug.log("j")
            dialog.paused = true;
            openable.paused = true;
            collect.paused = true;
        }
    })

//Cutscene Enabler
    if (GS.movie.scene == area && GS.movie.now == true){
        dialog.paused = false
        Dreset = GS.movie.mov
        k.pressButton("dialog")
    }

    entities.wipe.pos = k.vec2(0,400)
    let datastuff = k.add([
        k.pos(0,0),
        k.text("",{
            size: 24, // 48 pixels tall
 // it'll wrap to next line when width exceeds this value
            font: "sans-serif", // specify any font you loaded or browser built-in
        }),
        k.layer("save"),
        k.fixed(),
        k.color(k.RED)
    ])
    k.onUpdate(()=>{
        datastuff.text = "POS:"+ entities.player.pos
    })

})

k.scene("dieLol",() =>{
    let simp = k.add([
        k.sprite("Death"),
        k.pos(30,30),
        k.opacity(0)
    ])
    
    let texty = k.add([
        k.text("You died \n lol"),
        k.color(RED),
        k.pos(350,50),
        k.opacity(0)
    ])
    
    let pressZ = k.add([
        k.text("PRESS Z TO GO TO LAST SAVED \n OK?"),
        k.color(WHITE),
        k.pos(0,250),
        k.opacity(0),
        k.scale(0.75)
    ])
    
    let orD = k.add([
        k.text("or D to quit and die forever"),
        k.color(100,100,100),
        k.pos(100,350),
        k.opacity(0),
        k.scale(0.50)
    ])
    
    
    k.tween(0, 1, 1, (val) => (simp.opacity = val))
    
    k.wait(1, ()=>{
            k.tween(0, 1, 1, (val) => (texty.opacity = val))
    })

    k.wait(3, ()=>{
            k.tween(0, 1, 1, (val) => (pressZ.opacity = val))
    })
    
    k.wait(4, ()=>{
            k.tween(0, 1, 1, (val) => (orD.opacity = val))
    })
    
    k.onKeyPress("z",()=>{
        
        k.go("game", GS.playerState.curArea)
    })
})