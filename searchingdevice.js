const noble = require('noble');

noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        console.log('Scanning for Bluetooth devices...');
        noble.startScanning([], true); // Empty array scans for all devices
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', (peripheral) => {
    console.log(`Found device: ${peripheral.advertisement.localName || 'Unknown'} - ${peripheral.uuid}`);
});
