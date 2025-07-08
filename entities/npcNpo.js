function makeThing(spr,x,y, areaType, thetype){

    return k.add([
                k.sprite(spr),
                k.pos(x,y),
                k.z(),
                k.layer("game"),
                k.timer(),
                //theinteract boc
                k.area({ shape: new Rect(vec2(0,50), 50, 50),}),
                {
                    add(){
                        this.z = y + this.height
                        
                        //barrierblock
                            
                    }
                },
                "NPO",
                spr,
            

    ])
}

function makeNPC(spr,x,y, talkbox,hitbox){
    return k.add([
                k.sprite(spr,{
                    width:50,
                    height:100
                }),
                k.pos(x,y),
                k.z(),
                k.layer("game"),
                k.timer(),
                k.area(talkbox),
                {
                    add(){
                        k.onLoad(()=>{
                            this.z = y + this.height
                            
                            //barrierblock
                            this.add([
                                k.pos(),
                                k.area(hitbox),
                                k.body({isStatic: true})
                            ])

                            this.jump = function(hh,xx,yy,tt){
                                    k.tween(this.pos.y, this.pos.y - hh, tt, (p) => this.pos.y = p, easings.easeOutSine).onEnd(()=>{
                                        k.tween(this.pos.y, yy, tt, (p) => this.pos.y = p, easings.easeInSine)
                                    })
                                    k.tween(this.pos.x, xx, tt*2, (p) => this.pos.x = p)               
                            }
                        }) 
                    }
                },
                "NPC",
                spr,
            

    ])
}