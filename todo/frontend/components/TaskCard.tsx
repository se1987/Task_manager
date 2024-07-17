// import React from 'react';

// type Task = {
//   task_id: number;
//   user_name: string;
//   task_name: string;
//   category: string;
//   status: string;
//   deadline: string;
//   memo: string;
// };

// type TaskCardProps = {
//   task: Task;
//   onMove: (id: number, newStatus: string) => void;
//   onDelete: (id: number) => void;
// };

// const TaskCard: React.FC<TaskCardProps> = ({ task, onMove, onDelete }) => {
//   return (
//     <div className="task-card">
//       <div>
//         <strong>Task:</strong> {task.task_name}
//       </div>
//       <div>
//         <strong>Category:</strong> {task.category}
//       </div>
//       <div>
//         <strong>User:</strong> {task.user_name}
//       </div>
//       <div>
//         <strong>Deadline:</strong> {task.deadline}
//       </div>
//       <div>
//         <strong>Status:</strong> {task.status}
//       </div>
//       <div>
//         <button onClick={() => onMove(task.task_id, 'in progress')}>In Progress</button>
//         <button onClick={() => onMove(task.task_id, 'done')}>Done</button>
//         <button onClick={() => onDelete(task.task_id)}>Delete</button>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;