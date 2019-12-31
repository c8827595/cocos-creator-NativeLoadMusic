const AudioDownLoader = require('./AudioDownLoader');

cc.Class({
    extends: cc.Component,

    properties: {

    },


    start () {
        var item = {}
        item.url = "xxxxxxx.mp3";
        AudioDownLoader(item, function(err , clip){

            if(err){
                console.log("MusicUrl error==",err);
                return;
            }

            cc.audioEngine.play(clip.rawUrl, true, 1);
        });
        
    },
});
