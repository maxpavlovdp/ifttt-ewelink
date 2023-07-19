const ewelink = require('ewelink-api');
const {getSunrise, getSunset} = require('sunrise-sunset-js')
const props = require('./props');


// 1 - no risk
// 5 - 100% risk
const OVER_GENERATION_RISK = 1
const GENERATION_MAX_POWER = 380

const COUNTER_DEVICE = "100169010c"
const GENERATION_DEVICE = '1001d97df7'

async function toggleGeneration(connection, state) {
    const status = await connection.setDevicePowerState(GENERATION_DEVICE, state);
    console.log(status)
}

(async () => {
    const connection = new ewelink({
        email: 'maxpavlovdpvideo@gmail.com',
        password: props.password,
        region: 'eu',
    });

    /* get all devices */
    // const devices = await connection.getDevices();
    // console.log(connection)
    // console.log(devices);

    const generation = await connection.getDevice(GENERATION_DEVICE)
    const counter = await connection.getDevice(COUNTER_DEVICE)

    const generationState = generation.params.switch
    console.log("generationState: " + generationState)

    const generationPower = generation.params.power
    console.log("generationPower: " + generationPower)
    // always positive
    const counterPower = counter.params.power
    console.log("counterPower: " + counterPower)

    const now = new Date()
    console.log("now: " + now)
    const sunset = getSunset(50.432394, 30.616584)
    console.log("sunset: " + sunset)
    const sunrise = getSunrise(50.432394, 30.616584)
    console.log("sunrise: " + sunrise)
    const isDaytime = sunrise < now && now < sunset
    console.log("isDaytime: " + isDaytime)

    if (isDaytime &&
        (counterPower < 140 || counterPower > GENERATION_MAX_POWER / OVER_GENERATION_RISK)
    ) {
        await toggleGeneration(connection, "on")
    } else {
       // check how much we can await toggleGeneration(connection, "off")
    }
})();
