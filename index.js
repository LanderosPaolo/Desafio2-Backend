const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Servidor funcionando en http://localhost:${PORT}`));

app.use(express.json());

app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json'));
    res.send(canciones)
});

    //post para agregar canciones
app.post('/canciones', (req, res) => {
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
    canciones.push(cancion)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 4))
    res.send('Cancion agregada correctamente')
});

    //delete para borrar canciones
app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 4))
    res.send('Cancion borrada correctamente')
})

    //put para modificar canciones
app.put('/canciones/:id', (req, res) => {
const { id } = req.params
const cancion = req.body
const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
const index = canciones.findIndex(c => c.id == id)
canciones[index] = cancion
fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 4))
res.send('Cancion modificada con exito')
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})