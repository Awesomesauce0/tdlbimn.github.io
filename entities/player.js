function addPlayer(x,y, entities,wsx, wsy){
    
    return k.add([
            k.sprite("playa",{
                width:50,
                height:100
            }),
            k.pos(x,y),
            k.body(),
            k.area({ shape: new k.Rect(k.vec2(5,60), 40, 40),}),
            k.z(y),
            k.layer("game"),
            k.state("nully",["nully", "battle","hurty"]),
            k.health(3),
            k.color(),
            {
                speed: 200, //200
                freeze:false,
                camFreeze:false,
                ogPos: null,
                grab: "empty", //battleState
                flippy: 1,
                blinky:10,
                interact: true,
                camSetup:function(){
                    let xx = this.pos.x;
                    let yy = this.pos.y;
                    //setup
                    if (xx > wsx){
                        xx = wsx
                        
                    }
                    if (xx < 300){
                        xx = 300
                        
                    }
                    if (yy > wsy){
                        yy = wsy
                        
                    }
                    if (yy < 200){
                        yy = 200
                        
                    }
                    k.setCamPos(xx,yy)
                    
                    k.onUpdate(() => {
                        
                        if (this.freeze) return;
                        if (this.camFreeze) return;


                        if (this.pos.x < wsx && this.pos.x > 300){
                            
                            xx = this.pos.x; 
                        }
                        if (this.pos.y < wsy && this.pos.y > 200){
                            
                            yy = this.pos.y 

                        }
                        k.setCamPos(xx,yy)
                       
                    })

                    
                    
                },
                playerMove: function(){

                    this.z = this.pos.y + this.height
                    
                    let keys = {
                        "down": k.DOWN.scale(this.speed),
                        "up": k.UP.scale(this.speed),
                        "left": k.LEFT.scale(this.speed),
                        "right": k.RIGHT.scale(this.speed)
                    }
                    
                    //movement
                    this.onButtonDown(["up","down","left","right"], (key)=>{
                        //k.debug.log(key)

                        if (this.freeze) return;
                            this.move(keys[key])

                            if (key == "left"){
                                this.flipX = true
                                this.flippy = -1
                            }
                            if (key == "right"){
                                this.flipX = false
                                this.flippy = 1
                            }
                            this.z = this.pos.y + this.height
                            
                    })
                    
                    //animation
                    let anim = ["left", "right", "up", "down"].forEach((key) => {
                        k.onKeyPress(key, () => {
                            if (this.freeze) return;
                            this.play("run");
                        });
                        k.onKeyRelease(key, () => {
                            if (
                                !k.isKeyDown("left")
                                && !k.isKeyDown("right")
                                && !k.isKeyDown("up")
                                && !k.isKeyDown("down")
                            ) {
                                this.play("stand");
                            }
                        });
                    });

                },

                add(){
					
                    this.onStateEnter("battle",()=>{
                        this.color = k.WHITE
                        this.blinky = 10
                        let hitty = this.onCollideUpdate("Enemy", () => {
                            //this.hurt(1)
                            this.hp -= 1
                            this.enterState("hurty")
                            hitty.cancel()
                        })
                    })
                    this.onStateEnter("hurty",()=>{
                        entities.buddy.enterState("bounce")
                        k.wait(2, () => {
                            this.enterState("battle")
                        })
                    })
                    this.onStateUpdate("hurty",()=>{
                        this.blinky += 1
                        if (this.blinky >= 10 && this.color.b == 255){
                            this.blinky = 0
                            this.color = k.rgb(255,100,100)
                        }
                        if  (this.blinky >= 10 && this.color.b == 100){
                            this.blinky = 0
                            this.color = k.rgb(255,255,255)
                        }
                    })
                    this.on("death", ()=>{
                     k.go("dieLol")
                    })
                }
            },
            "playa"
        ])

}