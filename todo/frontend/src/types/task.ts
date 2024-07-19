export type Task = {
    task_id: number;
    user_id?: string;
    user_name?: string;
    task: string;
    category: string;
    status: string;
    deadline: string;
    memo: string | null;
  };
  