async function fetchUserData() {
  const request = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'GET',
  });

  console.log(request.body);
}

fetchUserData();
