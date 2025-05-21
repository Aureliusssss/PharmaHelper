# PharmaHelper | Assignment 1

PharmaHelper intends to simuilate the process of inventory & prescription management within any pharmaceutical store.

Inspired by numerous pharmacies that often go to, it allows users to add, retrieve, delete and update types of medicines alongside the creation of orders and information regaridng them.

## Getting Started

### Prerequisites

You will require node.js to run this node module.

- [node.js](https://nodejs.org/en)

### Installation

Create a file called "app.js" within the installation folder.

Add `const pharmahelper = require("./Aurelius_pharmahelper.js");` at the very top of the file.

To utilise module functions, call them by using "pharmacy.(function)".

A few examples would be

```js
pharmahelper.createInventoryReport();
pharmahelper.addPrescription("John", "Paracetamol", 3);
```

All functions can be found within the module itself, along with comments explaining them.

Run the program by using the "node app.js" command in the terminal.

```bash
node app.js
```

## Module Reference

### Arrays

`medications`

Each object represents a drug and contains:

- `id` (Number): Unique identifier.
- `name` (String): Name of the medication.
- `stock` (Number): Quantity available in stock.
- `price` (Number): Price per unit.

`prescriptions`

Each object represents a patient purchase and contains:

- `patientName` (String): Name of the patient.
- `medName` (String): Name of the medication purchased.
- `quantity` (Number): Quantity purchased.
- `total` (Number): Total cost of the prescription.

### Function List

`createPrescriptionReport()`

Prints out all records found in the Prescription array.

`createInventoryReport()`

Prints out all records found in the Medication array.

`addPrescription(patientName, medName, quantity)`

Adds a prescription record to the prescription array using the given (mandatory) arguments

`addMedicine(name, stock, price)`

Adds a medicine record to the medicine array using the given (mandatory) arguments

`calculateTotalMedicationsSold()`

Prints out the total amount of medication and revenue earned using the entries in prescription.

`restockMedication(medName, quantity)`

Allows the user to add to a medicine's stock value by adding the quantity given.

`searchMedication(medName)`

Allows the user to search for a medication's information by querying its name.

`updateMedication(id, newName, newPrice)`

Allows the user to delete a medication (if expired, no longer in production, etc.)

`checkLowStock()`

Prints out any entries of medicines which stock is below the provided threshold in the module

## References

- [Watsons Singapore](https://www.watsons.com.sg)
- [Unity Pharmacy](https://www.unity.com.sg)
- [Guardian Singapore](https://www.guardian.com.sg)
