const ewelink = require('ewelink-api');

(async () => {

    const connection = new ewelink({
        email: 'maxpavlovdpvideo@gmail.com',
        password: 'xxx',
        region: 'eu',
    });

    /* get all devices */
    // const devices = await connection.getDevices();
    // console.log(connection)
    // console.log(devices);

    const p3 = await connection.getDevice("100169010c")

    if (p3.params.power > 500) {
        const status = await connection.setDevicePowerState('10017c642b', 'on');
        console.log(status)
    }

    if (p3.params.power < 500) {
        const status = await connection.setDevicePowerState('10017c642b', 'off');
        console.log(status)
    }
})();
