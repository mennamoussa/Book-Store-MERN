const mongose = require('mongoose');

const DBcon = async () => {
    try {
        const conn = await mongose.connect(process.env.CONNECTION_STRING);
        console.log(`Database connected:${conn.connection.host}, ${conn.connection.name}`);
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}


module.exports = DBcon;