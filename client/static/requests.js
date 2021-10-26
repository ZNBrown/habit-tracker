

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