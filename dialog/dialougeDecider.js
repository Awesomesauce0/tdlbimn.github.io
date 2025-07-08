function dialougeDecider(who, movie){
    if (!GS.talkedTo.includes(who.tags[2])){
        GS.talkedTo.push(who.tags[2])
    }

    switch(who.tags[1]) {
      case "NPC":
          try {
            
            let myState = eval("GS.npcState." + who.tags[2])
            
            let old = myState.talkState
            myState.talkState = myState.switchy[myState.talkState]
            
            return old
          } catch(error) {
              return "lol"
          }
        
      break;
        
      case "Event":
        switch(who.tags[1]) {
            default:
                return who.tags[2];
        }
        break;   

      case "Enemy":
        return who.tags[2];
        break;   
        
      case "Talkbox":
        if(GS.talkboxSwitch.hasOwnProperty(who.tags[2])){
            let myState = eval("GS.talkboxSwitch." + who.tags[2])
            
            let old = myState.talkState
            myState.talkState = myState.switchy[myState.talkState] 
            console.log(myState.talkState )
            return old

        } else {
            try {
              return who.tags[2];
            } catch(error) {
              return "lol";
            }
        }

        break;   
        
      case "Item":  
        return who.tags[2]; 
        
      case "NPO":  
        return who.tags[2]; 
        
      default:
        return "lol"
    }
};