const express = require('express');
const router = express.Router();


let songs = [
    {
        id: '1',
        name: 'Buscándote',
        single: 'Mike Bahía',
        genre: 'Pop'
    },
    {
        id: '2',
        name: 'Hasta que el cuerpo aguante',
        single: 'Mago de Oz',
        genre: 'Heavy metal, Metal progresivo, Rock en español, Rock'
    },
    {
        id: '3',
        name: 'Quiero cantarle a ella',
        single: 'Paolo Plaza',
        genre: 'Música tropical, Bachata'
    }
];


//router.get('/songs', (req, res) => {
  //  res.json(songs);
//});


router.get('/songs', (req, res) => {
    res.json(songs);
    console.log('Query parameters:', req.query);
});

router.get('/songs/:id', (req, res) => {
    const song = songs.find(m => m.id === parseInt(req.params.id));
    if (!song) return res.status(404).send('The canción not fund');
    res.json(song);
});

router.post('/songs', (req, res) => {
    console.log(req.body);
    const newSong = {
        id: songs.length + 1,
        name: req.body.name,
        single: req.body.single,
        genre: req.body.genre
    };
    songs.push(newSong);
    res.status(201).json(newSong);
});


router.put('/songs/:id', (req, res) => {
    const song = songs.find(m => m.id === parseInt(req.params.id));
    if (!song) return res.status(404).send('The song not fund');

    song.name = req.body.name,
    song.single = req.body.single,
    song.genre = req.body.genre,
    res.json(song);
});


router.delete('/songs/:id', (req, res) => {
    const songIndex = songs.findIndex(m => m.id === parseInt(req.params.id));
    if (songIndex === -1) return res.status(404).send('The song not fund');

    const deletedSong = songs.splice(songIndex, 1);
    res.json(deletedSong);
});




module.exports = router;
