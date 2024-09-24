const express = require('express');
const { spawn } = require('child_process');
const app = express();

app.use(express.json());



app.use(express.static('public'));



app.post('/execute', (req, res) => {

    const { command } = req.body;

    if (!command){
        return res.status(400).send('Command is required');
    }

    const terminal = spawn(command, { shell: true });

    let output = '';

    terminal.stdout.on('data', (data) => {
        output += data.toString();
    });

    terminal.stderr.on('data', (data) => {
        output += data.toString();
    });

    terminal.on('close', (code) => {
        res.send(output);
    });
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
