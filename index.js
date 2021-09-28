//Sparksammy's VC server code
//note to self: audio-to-midi ./this_is_a_test.wav -b 120 -t 30
const { exec } = require("child_process")
var express = require('express');
const { Midi } = require('@tonejs/midi')
const multer  = require('multer')
const https = require('https');
const fs = require('fs')
const upload = multer();
let app = express();


function process(userid) {
    exec(`audio-to-midi ./uploads/${userid}.wav -b 120 -t 30`)
    let midiPath = `./uploads/${userid}.wav.mid`
    let midiFileRead = fs.readFileSync(midiPath)
    let tonejsStuff = new Midi(midiFileRead)
    let tonesjsJSON = JSON.stringify(tonejsStuff)
    res.status(200).send(`${tonesjsJSON}`);
};

app.get('/vc', function (req,res) {
    res.sendFile("index.html")
});

app.post('/vc/uploadAndProcess', upload.single('soundBlob'), function (req, res, next) {
    let uploadLocation = __dirname + '/uploads/' + req.query.uid + ".wav"
    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
    try {
        process(req.query.uid);
    } catch {
        res.sendStatus(500)
    }
    
})

app.listen(80);