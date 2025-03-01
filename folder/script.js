document.addEventListener("DOMContentLoaded", function () {
    // Fetch all vehicles from the server and display them
    fetchVehicles();

    // Handle the form submission to add a new vehicle
    document.getElementById("vehicle-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const model = document.getElementById("model").value;
        const license_plate = document.getElementById("license_plate").value;
        const price = document.getElementById("price").value;
        const status = document.getElementById("status").value;

        const newVehicle = {
            model,
            license_plate,
            price,
            status
        };

        // Send data to the server to add a new vehicle
        fetch('/api/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newVehicle)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Vehicle added:', data);
            fetchVehicles(); // Refresh the vehicle list
        })
        .catch(error => console.error('Error adding vehicle:', error));
    });
});

// Function to fetch and display all vehicles
function fetchVehicles() {
    fetch('/api/vehicles')
        .then(response => response.json())
        .then(data => {
            const vehicleList = document.getElementById("vehicle-list");
            vehicleList.innerHTML = ''; // Clear existing rows
            data.forEach(vehicle => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${vehicle.id}</td>
                    <td>${vehicle.model}</td>
                    <td>${vehicle.license_plate}</td>
                    <td>${vehicle.price}</td>
                    <td>${vehicle.status}</td>
                    <td><button onclick="deleteVehicle(${vehicle.id})">Delete</button></td>
                `;
                vehicleList.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching vehicles:', error));
}

// Function to delete a vehicle (optional, to extend the functionality)
function deleteVehicle(vehicleId) {
    fetch(`/api/vehicles/${vehicleId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => fetchVehicles())
        .catch(error => console.error('Error deleting vehicle:', error));
}
