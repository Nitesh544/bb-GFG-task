const Router = require("express").Router();


const DirectorModel = require("../models/Director");


router.post("/", async (req, res) => {
    try {

        const director = new DirectorModel(req.body);
        const savedDirector = await director.save();
        res.status(201).json(savedDirector);

    } catch (err) {

        res.status(400).json({ error: err.message });

    }
});

router.put("/:id", async (req, res) => {
    try {

        const director = await DirectorModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }

        );

        if (!director) throw Error("Director not found");
        res.json(director);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {

        const director_id = req.params.id;
        const director = await DirectorModel.findOne({ director_id: director_id });

        if (!director) {
            return res.status(404).json({ message: "Director not found" });
        }

        res.json({ director });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {

        const director = await DirectorModel.findByIdAndDelete(req.params.id);

        if (!director) throw Error("Director not found");
        res.json({ message: "Director deleted" });

    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});



module.exports = Router;
