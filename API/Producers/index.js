const Router = require("express").Router();


const ProducerModel = require("../../Database/producer");


router.post("/producer", async (req, res) => {
    try {

        const newProducer = req.body;
        const producer = await ProducerModel.create(newProducer);
        res.status(201).json({ producer });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.put("/producer/:producer_id", async (req, res) => {
    try {
        const producerId = req.params.producerId;
        const updatedProducer = req.body;
        const producer = await ProducerModel.findByIdAndUpdate(
            producerId,
            updatedProducer,
            { new: true }

        );
        if (!producer) {
            return res.status(404).json({ message: "Producer not found" });
        }
        res.json({ producer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get("/producer/:producer_id", async (req, res) => {
    try {
        const producerId = req.params.producerId;
        const producer = await ProducerModel.findById(producer_id);

        if (!producer) {
            return res.status(404).json({ message: "Producer not found" });
        }
        res.json({ producer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete("/producer/:producerId", async (req, res) => {
    try {
        const producerId = req.params.producer_id;
        const producer = await ProducerModel.findByIdAndDelete(producerId);
        if (!producer) {
            return res.status(404).json({ message: "Producer not found" });
        }
        res.json({ producer, message: "Producer deleted" });

    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});



module.exports = router;


