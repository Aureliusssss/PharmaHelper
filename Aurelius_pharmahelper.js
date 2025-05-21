module.exports = {

    // array that holds medicine json object (medicine name, stock amount and price per unit)
    medications: [
        { id: 1, name: "Paracetamol", stock: 50, price: 1.20 },
        { id: 2, name: "Ibuprofen", stock: 30, price: 1.50 },
    ],

    // array that holds patient name and what medicine they purchased (name, stock, price) (json object)
    prescriptions: [
        { patientName: "John Doe", medName: "Paracetamol", quantity: 3, total: 3.60 },
        { patientName: "Jane Smith", medName: "Ibuprofen", quantity: 2, total: 3.00 },
    ],

    // Called when giving out a prescription
    // Outputs a warning whenever stock of a medicine drops below 10
    // Ya thats it
    checkLowStock: function () {
        const threshold = 10;
        const lowStockMeds = this.medications.filter(function (med) {
            return med.stock <= threshold;
        });

        if (lowStockMeds.length > 0) {
            console.log("Warning: Low stock on the following medications:");
            lowStockMeds.forEach(function (med) {
                console.log(`${med.name}: ${med.stock} units left`);
            });
        }
    },

    // Function that lists all prescriptions that currently exist within the array. If there is none found, inform user that none currently exist. Else, return patient & info.
    createPrescriptionReport: function () {
        console.log("\nPrescription Report:");
        if (this.prescriptions.length == 0) {
            console.log("No prescriptions found.");
            return;
        }

        this.prescriptions.forEach(function (p, index) {
            // Ensure total shows 2 decimals
            console.log(`${index + 1}. Patient: ${p.patientName}, Medication: ${p.medName}, Quantity: ${p.quantity}, Total: $${p.total.toFixed(2)}`);
        });
    },

    // Function that lists all medications that currently exist within the array. Added medications during a specific use instance will show up in here.
    createInventoryReport: function () {
        console.log("\nInventory Report:");
        this.medications.forEach(function (m) {
            // Format price with 2 decimals
            console.log(`${m.name} Stock: ${m.stock} Price: $${Number(m.price).toFixed(2)}`);
        });
    },

    // Allows the user to add a json object that holds a patient & their goods into the prescriptions array
    // If stock is insufficient and/or medication does not exist, output an error
    // If successful, deduct stock from inventory (medications)
    addPrescription: function (patientName, medName, quantity) {
        const med = this.medications.find(m => m.name.toLowerCase() == medName.toLowerCase());

        if (!med) {
            console.log(`Medication '${medName}' not found.`);
            return;
        }

        if (med.stock < quantity) {
            console.log(`Not enough stock for '${medName}'. Available: ${med.stock}`);
            return;
        }

        const total = parseFloat((med.price * quantity).toFixed(2));
        this.prescriptions.push({
            patientName: patientName,
            medName: medName,
            quantity: quantity,
            total: total
        });

        med.stock -= quantity;

        console.log(`Prescription added for ${patientName}: ${quantity} x ${medName} ($${total.toFixed(2)})`);

        // checkLowStock();
    },

    // Prompts user for name, stock and price.
    // If name matches name of another medicine in the array, throws an error (as duplicates are not allowed)
    // If this check is failed, program continues to add medicine into the array.
    // Id is created by taking highest number from the array and adding 1 to it
    addMedicine: function (name, stock, price) {
        const existingMed = this.medications.find(m => m.name.toLowerCase() == name.toLowerCase());
        if (existingMed) {
            console.log(`Medication '${name}' already exists.`);
            return;
        }

        const maxId = this.medications.reduce(function (max, m) {
            return m.id > max ? m.id : max;
        }, 0);

        const newId = maxId + 1;
        this.medications.push({ id: newId, name: name, stock: stock, price: parseFloat(parseFloat(price).toFixed(2)) });
        console.log(`Added new medication: ${name} (Stock: ${stock}, Price: $${parseFloat(price).toFixed(2)})`);
    },

    // Function that calculates the amount of medications sold (using prescriptions to check how much units of medicine have been sold) and checking how much profits have been generated.
    calculateTotalMedicationsSold: function () {
        let totalSold = 0;
        let totalRevenue = 0;

        this.prescriptions.forEach(function (p) {
            totalSold += parseInt(p.quantity);
            totalRevenue += parseFloat(p.total);
        });

        totalRevenue = parseFloat(totalRevenue.toFixed(2));

        console.log("\nTotal medications sold: " + totalSold);
        console.log("Total revenue collected: $" + totalRevenue.toFixed(2));
    },

    // Allows the user to change the amount of units of medicine available.
    // If the medication does not exist, output an error.
    restockMedication: function (medName, quantity) {
        const med = this.medications.find(m => m.name.toLowerCase() == medName.toLowerCase());

        if (!med) {
            console.log(`Error: Medication '${medName}' not found.`);
            return;
        }

        med.stock += parseInt(quantity);
        console.log(`Restocked ${quantity} units of '${med.name}'. New stock: ${med.stock}`);
    },

    // Allows the user to search up a specific medicine and see its information.
    // If the medication does not exist, output an error.
    searchMedication: function (medName) {
        const med = this.medications.find(m => m.name.toLowerCase().includes(medName.toLowerCase()));

        if (!med) {
            console.log(`No medication found matching '${medName}'.`);
            return;
        }

        console.log(`Found Medication: ${med.name}, Stock: ${med.stock}, Price: $${Number(med.price).toFixed(2)}`);
    },

    // Allows the user to update a medication's information.
    // If the medication does not exist, output an error.
    updateMedication: function (id, newName, newPrice) {
        const med = this.medications.find(m => m.id == id);

        if (!med) {
            console.log(`Medication with ID ${id} not found.`);
            return;
        }
        if (newName) {
            med.name = newName;
        }
        if (newPrice !== undefined && !isNaN(newPrice)) {
            // Keep price as number, not string
            med.price = parseFloat(parseFloat(newPrice).toFixed(2));
        }

        console.log("Medication updated:", med);
    },

    // Allows the user to delete a medication (if expired, no longer in production, etc.)
    deleteMedication: function (id) {
        const index = this.medications.findIndex(m => m.id == id);
        if (index == -1) {
            console.log(`Medication with ID ${id} not found.`);
            return;
        }
        const removed = this.medications.splice(index, 1)[0];
        console.log("Deleted medication:", removed.name);
    }

};
