

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {

    const city = search.value;
    const url = 'http://localhost:5000/weather?city=' + city;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '';
    fetch(url)
        .then((res) => {
            res.json()
                .then((data) => {
                    
                    if (data.error) {
                        messageOne.textContent = data.error;
                    } else {
                        messageOne.textContent = data.city;
                        messageTwo.textContent = data.forecast;
                    }
                })
        })

    e.preventDefault();
})