// e2e-tests/taskManager.spec.ts
import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3003'; // フロントエンドのURLをここに設定する

test('Task Manager E2E Tests', async ({ page }) => {
  // ページを開く
    await page.goto(baseURL);

  // タスクが初期表示されていることを確認
    await expect(page.locator('h1')).toHaveText('Task Manager');

  // タスクの追加
    await page.click('button:has-text("Add Task")');
    await page.waitForSelector('input[name="task_name"]');
    await page.fill('input[name="task_name"]', 'Sample Task');
    await page.click('button:has-text("Save")');
    await page.waitForSelector('h1:has-text("Task Manager")'); // ホームページに戻る

  // 追加されたタスクが表示されていることを確認
    await expect(page.locator('.task-card')).toHaveText('Sample Task');

  // タスクのステータスを更新
    await page.click('button:has-text("In Progress")');
    await page.click('button:has-text("Done")');
    await page.waitForSelector('button:has-text("Not Started")');

  // タスクの削除
    await page.click('button:has-text("Delete")');
    await page.waitForSelector('h1:has-text("Task Manager")'); // ホームページに戻る

  // タスクが削除されていることを確認
    await expect(page.locator('.task-card')).not.toHaveText('Sample Task');
});
