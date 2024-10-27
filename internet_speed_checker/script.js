document.getElementById('start-btn').addEventListener('click', startSpeedTest);

function startSpeedTest() {
    const downloadSpeedElement = document.getElementById('download-speed');
    const uploadSpeedElement = document.getElementById('upload-speed');
    const resultsDiv = document.getElementById('results');
    const errorMessageElement = document.getElementById('error-message');
    const startButton = document.getElementById('start-btn');
    const loader = document.getElementById('loader');

    resultsDiv.style.display = 'none';
    errorMessageElement.style.display = 'none';
    downloadSpeedElement.textContent = '0';
    uploadSpeedElement.textContent = '0';
    startButton.disabled = true;
    startButton.textContent = "Checking..."; // Change button text
    loader.style.display = 'block'; // Show loader

    simulateDownloadSpeedTest(downloadSpeedElement, 2000, loader);
    simulateUploadSpeedTest(uploadSpeedElement, 2000, loader);
}

function simulateDownloadSpeedTest(element, delay, loader) {
    setTimeout(() => {
        const simulatedSpeed = Math.random() * 100 / 2;
        element.textContent = simulatedSpeed.toFixed(2);
        document.getElementById('results').style.display = 'block';
        loader.style.display = 'none'; // Hide loader
        document.getElementById('start-btn').disabled = false;
        document.getElementById('start-btn').textContent = "Start Test"; // Reset button text
    }, delay);
}

function simulateUploadSpeedTest(element, delay, loader) {
    setTimeout(() => {
        const simulatedSpeed = Math.random() * 100 / 8;
        element.textContent = simulatedSpeed.toFixed(2);
        document.getElementById('results').style.display = 'block';
        loader.style.display = 'none'; // Hide loader
        document.getElementById('start-btn').disabled = false;
        document.getElementById('start-btn').textContent = "Start Test"; // Reset button text
    }, delay);
}
