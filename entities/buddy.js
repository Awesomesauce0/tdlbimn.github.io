function addBuddy(entities){
    return k.add([
        k.sprite("Buddy",{
            width:50,
            height:100
        }),
        k.pos(entities.player.pos),
        k.layer("game"),
        k.z(),
        k.area({ shape: new k.Rect(k.vec2(5,40), 40, 60),}),
        k.opacity(),
        k.state("idle", ["idle", "running", "bounce", "grabby", "thrown", "nully","fly"]),
        {
            trailList: [],
            dirList: [],
            oldDist: 0,
            distance: 30,
            flippy: 1,
            ogPos: null,
            track: function(){
                this.distance = this.pos.dist(entities.player.pos)
                if (this.distance !== this.oldDist){
                    this.oldDist = this.distance
                    this.trailList.push(entities.player.pos);
                    this.dirList.push(entities.player.flipX);
                }  
            },
            add(){
				
                this.onStateEnter("idle", () =>{
                    this.z = this.pos.y + this.height
                    this.play("stand");
                })
                this.onStateUpdate("idle", ()=>{
                    this.track()
                    if (this.distance >= 100){
                        this.enterState("running");
                    };
                })
                this.onStateEnter("running", ()=>{
                    this.play("run");
                })
                this.onStateUpdate("running", ()=>{
                    this.track()
                    if (this.trailList.length > 30 ){
                        this.trailList.shift();
                        this.dirList.shift()
                        this.pos = this.trailList[0];
                        this.flipX = this.dirList[0];
                        
                        this.z = this.pos.y + this.height
                    }
                    if (this.distance <= 100){
                        this.enterState("idle");
                    }
                })
                this.onStateEnter("bounce", () =>{
                    this.play("beg");
                })
                this.onStateUpdate("bounce", () =>{
                    if (k.isKeyPressed("z") && this.isColliding(entities.player)){
                        this.enterState("grabby");
                    }
                })
                this.onStateEnter("grabby", () =>{
                    this.play("grabby");
                })
                this.onStateUpdate("grabby", () =>{
                    this.z = entities.player.z + 1
                    //this.pos = entities.player.pos.add(10*entities.player.flippy,30)
                    k.Vec2.addc(entities.player.pos,20*entities.player.flippy,-15,this.pos)
                    this.flipX = entities.player.flipX
                        if (k.isKeyPressed("z")){
                            this.flippy = entities.player.flippy
                            this.enterState("thrown")
                        }
                })
                this.onStateEnter("thrown", () =>{
                    let hitty = this.onCollide("Enemy", (en)=>{
                        if (en.tags[3] == "Hittable"){
                            this.enterState("fly");
                            if (en.tags[2] == "Goon" || en.tags[2] == "Pins" ){
                                entities.enemy.pin.hitty(en)
                                hitty.cancel();
                            } else {
                                //normal
                                en.hp -= 1;
                                hitty.cancel();
                            }
                        }
                    })
                })
                this.onStateUpdate("thrown", () =>{
                    this.move(500 * this.flippy ,0)
                    if (this.pos.x >= k.getCamPos().x + 400 
                     || this.pos.x <= k.getCamPos().x - 400){
                        this.enterState("fly")
                    } 
                })
               
                
                this.onStateEnter("fly", () =>{
					this.z = k.getCamPos().y + 200
					let xx = getFixedPos(k.rand(0,550), null)
					k.tween(this.pos, k.vec2(this.pos.x, getFixedPos(null, -100)), 1, (val) => (this.pos = val)).onEnd(()=>{

                        
						if (this.state !== "nully"){
						  k.tween(k.vec2(xx, -100), getFixedPos(xx,k.rand(0,350)), 1, (val) => (this.pos = val)).onEnd(()=>{
						    this.enterState("bounce");
						  })
						}
					})
                })

            },
        },
        "Buddy",
        ])
}