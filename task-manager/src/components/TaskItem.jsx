import { useState } from "react";
import { motion } from "framer-motion";

function TaskItem({ task, setTasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const toggleComplete = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const saveEdit = () => {
    if (editedText.trim() === "") return;
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, text: editedText } : t))
    );
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedText(task.text);
    setIsEditing(false);
  };

  return (
    <motion.div
      className="task-item"
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
      />

      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="edit-input"
        />
      ) : (
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.text}
        </span>
      )}

      <div className="task-buttons">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={saveEdit}>
              Save
            </button>
            <button className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-btn" onClick={deleteTask}>
              Delete
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default TaskItem;
