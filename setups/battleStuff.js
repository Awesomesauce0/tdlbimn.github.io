function getFixedPos(xx,yy){
    let bCamPos = k.getCamPos()
    bCamPos = k.vec2(bCamPos.x - 300, bCamPos.y - 200)
    if (xx == null){
        return bCamPos.y + yy
    } else if (yy == null){
        return bCamPos.x + xx
    } else{
        return k.vec2(bCamPos.x + xx, bCamPos.y + yy) 
    }
}

function endBattle(entities, objWho, afterBattleDialouge, line){
    entities.player.freeze = true;
    entities.player.enterState("nully");
    entities.player.collisionIgnore = ["NPC", "NPO", "collider", "Enemy" ];
    entities.buddy.enterState("nully");
    entities.buddy.play("stand");
    
    k.destroyAll("tempEn");
    k.destroyAll("Barrier");
    k.wait(1.5, ()=>{
            //wipe
                k.tween(entities.wipe.opacity, 0 ,1, (val) => (entities.wipe.opacity = val)).onEnd(()=>{
                    entities.wipe.pos = k.vec2(0,400)
                });
            //bg
                k.tween(k.getBackground(), k.rgb(32, 74, 34), 1, (val) => k.setBackground(val));
            //player
                k.tween(entities.player.pos,entities.player.ogPos,1, (val) => (entities.player.pos = val)).onEnd(()=>{
                    entities.player.layer = "game";
                    entities.player.z = entities.player.pos.y + entities.player.height;
                    entities.player.collisionIgnore = [];
                    entities.player.interact = true

                    entities.buddy.z = entities.buddy.ogPos.y + entities.buddy.height
                    
                    let poopah = entities.buddy.ogPos.add(0,-600)
                    
                    k.tween(poopah, entities.buddy.ogPos,1, (val) => (entities.buddy.pos = val)).onEnd(()=>{
                        entities.buddy.enterState("idle")
                        afterBattleDialouge(line)
                        //entities.player.freeze = false;
                        //entities.player.camFreeze = false;
                    })

                    
                })
            
    })
    
    
    
}

function setupBattle(entities, objWho){
    //barriers
    k.add([
        k.pos(getFixedPos(-50,0)),
        k.area(),
        k.body({ isStatic: true }),
        k.rect(50,450),
        "Barrier"
        ])
    k.add([
        k.pos(getFixedPos(600,0)),
        k.area(),
        k.body({ isStatic: true }),
        k.rect(50,450),
        "Barrier"
        ])
    k.add([
        k.pos(getFixedPos(0,-50)),
        k.area(),
        k.body({ isStatic: true }),
        k.rect(600,50),
        "Barrier"
        ])
    k.add([
        k.pos(getFixedPos(0,450)),
        k.area(),
        k.body({ isStatic: true }),
        k.rect(600,50),
        "Barrier"
        ])
    //player stuff
    entities.player.camFreeze = true; 
    entities.player.collisionIgnore = ["NPC", "NPO", "collider", "Enemy",];
    entities.player.ogPos = entities.player.pos

    entities.buddy.ogPos = k.vec2(entities.buddy.pos.x, entities.buddy.pos.y)
    entities.buddy.enterState("bounce")


    //moving
    objWho.enterState("intro")
    k.tween(entities.player.pos, getFixedPos(50,200), 1, (val) => (entities.player.pos = val))
}

function startBattle(entities, objWho){
    entities.player.freeze = false
    entities.player.enterState("battle")
    entities.player.collisionIgnore = ["NPC", "NPO", "collider",];
    objWho.unuse("body")
}