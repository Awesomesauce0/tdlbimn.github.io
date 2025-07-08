const monsters = {
    pin: function createpin(entities, afterBattleDialouge){
    return k.add([
        k.sprite("pins", {
            height: 100,
            width:50
        }),
        k.pos(-300,150),
        k.layer("game"),
        k.z(),
        k.area({ shape: new k.Rect(k.vec2(10,20), 30, 80),}),
        k.health(1),
        k.opacity(1),
        k.state("nully",["nully","intro","move","align"]),
        k.timer(),
        {
            intro: true,
            ogPos: this.pos, //required
            killForever: true, //required
            me: "pin", //required
            add(){
                k.onLoad(()=>{
                //important
                let gangstasDead = 0;
                let gang = {
                    numba0:null,
                    numba1:null,
                    numba2:null,
                    numba3:null,
                    numba4:null,
                };
                let dir = {
                    "left": 450,
                    "right": 100
                };
                let curDir = "right";
                let antiSpeed = 1;
                let main = this;
                
                this.hitty = function(t){
                    t.play("die")
                    t.untag("Hittable")
                    antiSpeed += -0.05
                    gangstasDead += 1
                    if (gangstasDead > 5){
						GS.talkboxSwitch.BowlOwnerTB.talkState = "BowlOwner3"
                        main.paused = true
                        endBattle(entities, main, afterBattleDialouge, "SaveBowling")
                        k.wait(0.5,()=>{
                            for (let i = 0; i < 5; i++){
                                k.tween(1,0,0.5, (val) => (gang["numba" + i].opacity = val))
                            }
                            k.tween(1,0,0.5, (val) => (main.opacity = val)).onEnd(()=>{
                                GS.enemySpawn[main.me] = null;
                                k.destroy(main);
                                
                            })
                        })
                }
                }
                //stuff
                this.z = this.pos.y + this.height
                this.flipX = true
                
                //states
                this.onStateEnter("intro",()=>{
                    k.tween(this.pos, getFixedPos(450,50), 1, (val) => (this.pos = val)).onEnd(()=>{
                        //flip
                        this.flipX = !this.flipX
                        for (let i = 0; i < 5; i++){
                            gang["numba" + i].flipSmooth()
                        }
                        
                        k.wait(1,()=>{
                            startBattle(entities, this)
                            this.enterState("move")
                        })
                    })
                })
                
                this.onStateEnter("move", ()=>{
                    //forward
                    
                        this.tween(this.pos.x, dir[curDir], 1.5*antiSpeed, (val) => (this.pos.x = val)).onEnd(()=>{
                            this.enterState("align")
                        })
                        
                    
                    
                })
                    
                this.onStateEnter("align",()=>{
                    this.flipX = !this.flipX
                    for (let i = 0; i < 5; i++){
                        gang["numba" + i].flipSmooth()
                    }
                    
                    k.wait(0.5,()=>{
                        this.tween(this.pos.y, entities.player.pos.y, 1*antiSpeed, (val) => (this.pos.y = val)).onEnd(()=>{
                            if (curDir == "right"){
                                curDir = "left"
                            } else {
                                curDir = "right"
                            }
                            this.enterState("move")
                        })
                        
                    })
                })
                
                
                //create gang
                for (let i = 0; i < 5; i++){
                    let pos = [
                        k.vec2(-50,-25),
                        k.vec2(-50,25),
                        k.vec2(-100,-50),
                        k.vec2(-100,0),
                        k.vec2(-100,50),
                        ]
                    gang["numba" + i] = this.add([
                            k.sprite("pins", {
                                height: 100,
                                width:50,
                                flipX: true
                            }),
                            k.pos(pos[i]),
                            k.layer("battle"),
                            k.z(),
                            k.area({ shape: new k.Rect(k.vec2(10,20), 30, 80),}),
                            k.health(1),
                            k.opacity(1),
                            k.timer(),
                            {
                                flipSmooth: function(){
                                    this.flipX = !this.flipX
                                    k.tween(this.pos.x, this.pos.x*-1, 0.5, (val) => (this.pos.x = val), k.easings.easeOutSine)
                                },
                                //add(){
                                    //this.on("death", ()=>{
                                    //    k.debug.log("hitgoon")
                                    //    hitty(this)
                                    //})
                                //}
                            },
                            "Enemy",
                            "Goon",
                            "Hittable"
                        ])
                }
                    

                })
                
            }
        },
        "Enemy",
        "Pins",
        "Hittable"
    ])
},
    gumhing: function creategumhing(entities, afterBattleDialouge){
return k.add([
        k.sprite("gumhing"),
        k.pos(270,230), //270,230
        k.layer("game"),
        k.z(),
        k.area({ shape: new k.Rect(k.vec2(60,48), 30, 100),}),
        k.health(1),
        k.state("nully",["nully","intro","move","align"]),
        k.timer(),
        {
            intro: true,
            ogPos: this.pos, //required
            killForever: true, //required
            me: "pin", //required
            add(){
                k.onLoad(()=>{
                //important
                this.z = this.y + this.height
                                k.debug.log("hi")
                })
                this.onStateEnter("intro",()=>{
                    k.tween(this.pos, getFixedPos(450,50), 1, (val) => (this.pos = val)).onEnd(()=>{

                            startBattle(entities, this)
                            this.enterState("move")
                    })
                })
            }
        },
        "Enemy",
        "Gumhing",
        "Hittable"
    ])
    }
    
}