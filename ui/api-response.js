fetch('/api/').then(res => res.text())
  .catch(error => console.error('Error:', error))
  .then(response => {
    document.getElementById('heading').innerHTML = response;
    console.log('Success:', response);
  });

fetch('/api/defaultCount').then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    console.log('Success:', response);
  });