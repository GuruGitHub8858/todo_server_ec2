import todoCollection from "../Model/todoModel.js";

// store my todo    req.body  hello luffy
export const addTodo = async (req, res) => {
    try {
        const { todo } = req.body;

        // validation
        if (!todo || typeof todo !== "string") {
            return res.status(400).json({
                message: "todo must be a non-empty string"
            });
        }

        const data = new todoCollection({
            todo: todo.trim()
        });

        await data.save();

        res.status(201).json({
            message: "data has been stored",
            data
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getTodo = async (req, res) => {
    try {
        const data = await todoCollection.find();
        res.json(data)
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const data = await todoCollection.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(data)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        await todoCollection.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "todo has been deleted" })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}