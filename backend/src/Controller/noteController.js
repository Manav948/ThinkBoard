import Note from '../model/Note.js'
export async function getNotes(req, res) {
    try {
        const allNote = await Note.find().sort({ createdAt: -1 })

        res.status(200).json({
            message: 'All Notes Get Succesfully',
            allNote,
        })
    } catch (error) {
        console.error('Error in getNotes', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getNotesByid(req, res) {
    try {
        const notes = await Note.findById(req.params.id);
        res.status(200).json({
            notes
        })
    } catch (error) {
        console.error('Error in getNotes', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
export async function createNotes(req, res) {
    try {
        const { title, content } = req.body;
        const notes = new Note({
            title,
            content
        });
        await notes.save();
        res.status(201).json({
            message: 'Note Added Successfully',
            notes
        })
    } catch (error) {
        console.error('Error in createNotes', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateNotes(req, res) {
    try {
        const { title, content } = req.body;
        const updateNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

        if (!updateNote) {
            return res.status(404).json({ message: 'Note not Found' });
        }
        res.status(200).json({ message: 'Note Updated Successfully' });
    } catch (error) {
        console.error('Error in updateNotes', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteNotes(req, res) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);

        if (!deleteNote) {
            return res.status(404).json({ message: 'Note not Found' });
        }
        res.status(200).json({ message: 'Note Deleted Successfully' });
    } catch (error) {
        console.error('Error in updateNotes', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}