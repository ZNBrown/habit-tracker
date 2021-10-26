// const URL = window.location.hostname.includes('localhost')
// 	? 'http://localhost:3000'
// 	: 'https://.herokuapp.com';

//request to log in
async function requestLogin(data) {
	try {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		};
		const response = await fetch(`${URL}/login`, options);
		const responseJson = await response.json();
		if (!responseJson.success) {
			throw new Error('Login not authorised');
		}
		login(responseJson.token);
	} catch (err) {
		window.alert(err.message);
		console.warn(err);
	}
};

// delete a habit
async function deleteHabit(id){
    try {
        const options = { method: 'DELETE' }
        await fetch(`http://localhost:3000/habit/${id}`, options);
        window.location.hash = `#habit`
    } catch (err) {
        console.warn(err);
    }
}