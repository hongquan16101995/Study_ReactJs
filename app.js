const express = require("express");
const app = express();
let cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(8080, () => {
    console.log("Server running on port 8080");
});
let index = 3

const species = [
    {
        id: 1,
        name: "Dog"
    },
    {
        id: 2,
        name: "Cat"
    }
];

const animals = [
    {
        id: 1,
        name: 'Pit bull',
        image: 'https://firebasestorage.googleapis.com/v0/b/animal-demo-2c19f.appspot.com/o/image%2Favatar_1675242065874?alt=media&token=8472a74c-794a-4338-bc15-e59e765379f3',
        age: 2,
        price: 20000000,
        quantity: 3,
        species: {
            id: 1,
            name: "Dog"
        }
    },
    {
        id: 2,
        name: "Phốc sóc",
        image: 'https://firebasestorage.googleapis.com/v0/b/animal-demo-2c19f.appspot.com/o/image%2Favatar_1675242065874?alt=media&token=8472a74c-794a-4338-bc15-e59e765379f3',
        age: 1,
        price: 15000000,
        quantity: 5,
        species: {
            id: 1,
            name: "Dog"
        }
    },
    {
        id: 3,
        name: 'Anh thuần chủng',
        image: 'https://firebasestorage.googleapis.com/v0/b/animal-demo-2c19f.appspot.com/o/image%2Favatar_1675242065874?alt=media&token=8472a74c-794a-4338-bc15-e59e765379f3',
        age: 1.5,
        price: 25000000,
        quantity: 2,
        species: {
            id: 2,
            name: "Cat"
        }
    }
];

//getAll
app.get("/animal", (req, res) => {
    res.json(animals);
});
//searchByName
app.post("/animal/search", (req, res) => {
    res.json(searchAnimalByName(req.body.search));
});
//getAllSpecies
app.get("/animal/species", (req, res) => {
    res.json(species);
});
//getById
app.get("/animal/:id", (req, res) => {
    const id = +req.params.id;
    const index = findAnimalIndex(id);
    if (index !== -1) {
        res.json(animals[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
//getSpeciesById
app.get("/animal/species/:id", (req, res) => {
    const id = +req.params.id;
    const index = findSpeciesIndex(id);
    if (index !== -1) {
        res.json(species[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
//create - update (do không muốn sửa form hiện có)
app.post("/animal", (req, res) => {
    if (+req.body.id === 0) {
        const animal = {
            id: ++index,
            name: req.body.name,
            image: req.body.image,
            age: req.body.age,
            price: req.body.price,
            quantity: req.body.quantity,
            species: species[findSpeciesIndex(+req.body.species.id)]
        }
        animals.push(animal);
        res.json(animal);
    } else {
        const animal = animals[findAnimalIndex(+req.body.id)];
        animal.id = +req.body.id;
        animal.name = req.body.name;
        animal.image = req.body.image;
        animal.age = +req.body.age;
        animal.price = +req.body.price;
        animal.quantity = +req.body.quantity;
        animal.species = species[findSpeciesIndex(+req.body.species.id)]
        res.json(animal);
    }

});
//delete
app.delete("/animal/:id", (req, res) => {
    const id = +req.params.id;
    const index = findAnimalIndex(id);
    if (index !== -1) {
        animals.splice(index, 1);
        res.json({message: 'Animal deleted successfully', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

function findAnimalIndex(id) {
    for (let i = 0; i < animals.length; i++) {
        if (animals[i].id === id) {
            return i;
        }
    }
    return -1;
}

function findSpeciesIndex(id) {
    for (let i = 0; i < species.length; i++) {
        if (species[i].id === id) {
            return i;
        }
    }
    return -1;
}

function searchAnimalByName(name) {
    let arr = []
    for (let i = 0; i < animals.length; i++) {
        if (animals[i].name.toUpperCase().includes(name.toUpperCase())) {
            arr.push(animals[i])
        }
    }
    return arr;
}
