let id;
const setup = () => {
    const userName = document?.getElementById('userName');
    document.getElementById("createCard")?.addEventListener('submit', 
        event => {
            event.preventDefault();
            console.log('create card');
            createCard();
        });
    getUser()

}
const getUser = async () => {
    const requestOptions = {
        method :'GET',
      };
    const response = await fetch('/account/me', requestOptions);
    if (response.ok) {
    const user = await response.json();
    name = user.name ;
    id= user._id;
    }
    else {
    const error = await response.json();
    handleError(error);
    }
}
const createCard = async () => {
    const data = {
        name: document.getElementById('cardName').value,
        email: document.getElementById('cardEmail').value,
        phone: document.getElementById('cardPhone').value,
        company: document.getElementById('cardCompany').value,
        userId: id
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/account/addCard', requestOptions);
    if (response.ok) {
        console.log(response);
        window.location.href = '/account';
    }
    else {
        const error = await response.json();
        handleError(error);
    }

}
window.addEventListener('DOMContentLoaded', setup);