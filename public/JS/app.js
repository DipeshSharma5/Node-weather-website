console.log('LOADED JS SUCSSESSFULLY')

const button = document.querySelector('button')
const add = document.querySelector('input')

function fetching(event)
{
    document.getElementById('res').innerHTML = "Loading...";
    event.preventDefault()
    const loc = document.querySelector('input').value;
    fetch('http://localhost:3000/weather?address=' + loc).then(response => {
        response.json().then(data =>{
            if(data.error)
            {
                document.getElementById('err').innerHTML = data.error;
                document.getElementById('res').innerHTML = "";
            }
            else
            {
                document.getElementById('err').innerHTML = '';
                document.getElementById('res').innerHTML = 'Temperature: ' + data.forecastdata + " Location: " + data.location;
            }
        })
    })
}