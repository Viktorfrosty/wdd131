const currentYear = new Date().getFullYear();
const lastModifiedDate = document.lastModified;

const temperature = 10;
const windSpeed = 5;
const windChillOutput = document.getElementById("windchill");

const calculateWindChill = (temp, speed) => 
  (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);

if (temperature <= 10 && windSpeed > 4.8) {
  windChillOutput.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
  windChillOutput.textContent = "N/A";
}

document.getElementById("currentyear").textContent = currentYear;
document.getElementById("lastModified").textContent = `Last Modification: ${lastModifiedDate}`;