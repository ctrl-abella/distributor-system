import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Backend is running!" });

});

app.listen(3000, () => {
    console.log("Server running on por 3000");
});