/* Json Server */
const urlEndPoint = 'http://localhost:4000';

/* GET method */
const getCampers = async (item) => {
    try {
        const response = await fetch(`${urlEndPoint}/campers`, {
            method: 'GET',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const campers = await response.json()
        return campers;
    }
    catch (err) {
        console.log(err);
    }
}

/* POST method */

/* DELETE method */

/* Show all Campers */
async function showAllCampers() {
    try {
        const campersContainer = document.getElementById('.container-all-campers');
        const allCampers = await getCampers();

        const template = allCampers.map((camper) => {
            return `
              <div class="camper">
                <img class="camper-img" src='${camper.image}' onerror="this.src='./img/usuario.png'  ">
                <div class="camper-details">
                   <p class="camper-id">Id: ${camper.id}</p>
                   <h3 class="camper-name">${camper.name}</h3>
                   <p class="camper-phone">Phone: ${camper.phone}</p>
                   <p class="camper-email">Email: ${camper.email}</p>
                   <p class="camper-address">Address: ${camper.address}</p>
                   <p class="camper-team">Team: ${camper.team}</p>
                   <button class="camper-add" id="${camper.id}"><span>Add</span></button>
                </div>
              </div>
            `;
        });
        campersContainer.innerHTML = template.join('');
    }
    catch (err) {
        console.error(err);
    }
}
