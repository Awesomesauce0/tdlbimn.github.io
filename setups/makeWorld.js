function makeWorld(entities, mapData, things, area, afterBattleDialouge){
    //junk
    for (const layer of mapData.layers) {
        if (layer.type === "tilelayer"){continue};
        
        if (layer.name === "Colliders") {
            for (const object of layer.objects) {
                if ("polygon" in object){
                    let shapes = [];
                    for (let i = 0; i < 3;i++){
                        shapes.push(k.vec2(object.polygon[i].x, object.polygon[i].y))
                    }
                    console.log(shapes)
                    k.add([
                        k.pos(object.x, object.y),
                        //k.choose([k.polygon(shapes)]),
                        k.area({shape: new k.Polygon(shapes) }),
                        k.body({ isStatic: true }),
                        "collider"
                    ]);
                } else {
                    k.add([
                        k.pos(object.x, object.y),
                        k.area({ shape: new k.Rect(k.vec2(0), object.width, object.height),}),
                        k.body({ isStatic: true }),
                        "collider"
                    ]);
                }
                continue;
            }
        };
        
        if (layer.name === "Door" || layer.name === "InstaDoor") {
                  for (const object of layer.objects) {

                        k.add([
                          k.pos(object.x, object.y),
                          k.area({ shape: new k.Rect(k.vec2(0), object.width, object.height),}),
                          layer.name,
                          object.name,
                          object.type,

                        ]);
                        continue;
                    }
                  continue;
        };
        
        if (layer.name === "Event") {
            for (const object of layer.objects) {
              if (GS.events[object.name] === true ){
                k.add([
                    k.pos(object.x, object.y),
                    k.area({ shape: new k.Rect(k.vec2(0), object.width, object.height),}),
                    "Event",
                    object.name
                ])
                continue;
              } 
            }
              continue;
        };
        
        if (layer.name === "Talkbox") {
            for (const object of layer.objects) {

                if (GS.talkboxSwitch[object.name].show === true){
                    k.add([
                        k.pos(object.x, object.y),
                        k.area({ shape: new k.Rect(k.vec2(0), object.width, object.height),}),
                        "Talkbox",
                        object.name
                    ]);
                } 
            }
            continue;
        };
        
        if (layer.name === "Item") {
            for (const object of layer.objects) {
                if (GS.itemSpawn[object.name]){
        
                    k.add([
                        k.sprite(object.name),
                        k.pos(object.x, object.y),
                        k.layer("game"),
                        k.area(),
                        k.z(),
                        "Item",
                        object.name,
                        {
                            add(){
                                this.z = object.y + this.height
                            }
                        }
                    ])
                }
                continue;
            }
            continue;
        };

        if (layer.name === "Barriers") {
            for (const object of layer.objects) {
                if (GS.barriers.includes(object.name)){
        
                    k.add([
                        k.pos(object.x, object.y),
                        k.area({ shape: new k.Rect(k.vec2(0), object.width, object.height),}),
                        k.body({ isStatic: true }),
                        "TempBarrier",
                        object.name,
                    ])
                }
                continue;
            }
            continue;
        };

        if (layer.name === "Spawn") {
            for (const object of layer.objects) {
                //player
                if (object.name === GS.playerState.spawn){
                    let w = mapData.width
                    let h = mapData.height
                    let ts = mapData.tilewidth
                    let sw = k.width()/2
                    let sh = k.height()/2
                    entities.player = addPlayer(object.x, object.y, entities,w*ts-sw, h*ts-sh);
                    entities.player.playerMove()
                    entities.player.camSetup()

                    continue;
                }
                continue;
            };  
        };
        
        if (layer.name === "LayeredObjects") {
            for (const object of layer.layers) {
            
                k.add([
                    k.sprite(object.name),
                    k.pos(object.offsetx, object.offsety),
                    k.z(),
                    k.layer("game"),
                    {
                        add(){
                            k.onLoad(()=>{
                                switch(object.name) {
                                  case "coolHouse" || "house":
                                    this.z = this.pos.y + 350
                                    break;
                                    
                                  case "bowlingBuilding":
                                    this.z = this.pos.y + 350
                                    break;
                                    
                                  case "tree":
                                    this.z = this.pos.y + 250
                                    break;
                                    
                                  default:
                                    this.z = this.pos.y + this.height
                                }
                            })
                        }
                    }
                ])
                
            };  
        };

    };
    //npcs

    for (let i = 0; i < Object.keys(GS.npcState).length; i++){
        let getState = eval( "GS.npcState." + Object.keys(GS.npcState)[i])
        let name = Object.keys(GS.npcState)[i]
        if (getState.scene == area){
            entities[name] = makeNPC(getState.name, getState.spawnPos[0], getState.spawnPos[1], getState.talkbox, getState.hitbox)
        }
    };

    for (var obj in GS.enemySpawn) {
        if (GS.enemySpawn.hasOwnProperty(obj)) {
            if (GS.enemySpawn[obj] == area){
                entities.enemy[obj] = monsters[obj](entities, afterBattleDialouge)
            }
        }
    };
    //buddy
    if(GS.othaStuff.spawnBuddy){
        entities.buddy = addBuddy(entities);
    };
    
    
}