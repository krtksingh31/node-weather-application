const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const forecastOutput1 = document.querySelector('#forecast-output-1')
const forecastOutput2 = document.querySelector('#forecast-output-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    forecastOutput1.textContent = 'Fetching forecast...'
    forecastOutput2.textContent = ''

    fetch('/weather?address=' + searchTerm.value).then(response => {
        response.json().then(data => {
            if (!data.error) {
                forecastOutput1.textContent = data.location
                forecastOutput2.textContent = data.summary + ' It is currently ' + Math.round(data.temperature) + 
                ' degrees in the city but will range from ' + Math.round(data.minTemperature) + ' to ' +
                Math.round(data.maxTemperature) + ' degrees throughout the day.'
                
            } else {
                forecastOutput1.textContent = ''
                forecastOutput2.textContent = data.error
            }
        })
    })
})