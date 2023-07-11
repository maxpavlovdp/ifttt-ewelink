const ewelink = require('ewelink-api');

const generationMaxPower = 300

const COUNTER_DEVICE = "100169010c";
const GENERATION_DEVICE = '1001d97df7';

async function toggleGeneration(connection, state) {
    const status = await connection.setDevicePowerState(GENERATION_DEVICE, state);
    console.log(status)

}
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

    const generation = await connection.getDevice(GENERATION_DEVICE)
    const counter = await connection.getDevice(COUNTER_DEVICE)

    const generationState = generation.params.switch;
    console.log("generationState: " + generationState)

    const generationPower = generation.params.power
    console.log("generationPower: " + generationPower)

    // always positive
    const counterPower = counter.params.power
    console.log("counterPower: " + counterPower)


    // 1 - no risk
    // 15 - 100% risk
    const overgenerationRiskCoef = 4;
    if (counterPower < 50 || counterPower > generationMaxPower / overgenerationRiskCoef) {
        await toggleGeneration(connection, "on")
    } else {
        await toggleGeneration(connection, "off")
    }
})();
