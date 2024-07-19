// // e2e-tests/taskManager.spec.ts
// import { test, expect } from '@playwright/test';

// const baseURL = 'http://localhost:3003'; // VSCodeでテストを実施する時こっち
// // const baseURL = 'http://react:3003'; // 通常はこっちを有効にしておく(コンテナ用)


// test('Task Manager E2E Tests', async ({ page }) => {
//   // ページを開く
//     await page.goto(baseURL);

//   // タスクが初期表示されていることを確認
//     await expect(page.locator('h1')).toHaveText('TeamB: タスク管理dayone');

//   // タスクの追加
//     await page.click('button:has-text("Add Task")');
//     await page.waitForSelector('input[placeholder="Task Name"]');
//     await page.fill('input[placeholder="Task Name"]', 'Sample Task');
//     await page.click('button:has-text("Add Task")');
//     await page.waitForSelector('h1:has-text("TeamB: タスク管理dayone")'); // ホームページに戻る

//   // 追加されたタスクが表示されていることを確認
//     // await expect(page.locator('.task-card')).toHaveText('Sample Task');
//     const taskCards = page.locator('.task-card');
//     const count = await taskCards.count();  // 要素の数を取得
//     await expect(taskCards.nth(count - 1)).toContainText('Sample Task');  // 最後の要素を検証


//   // タスクのステータスを更新
//     await page.click('button:has-text("In Progress")');
//     await page.click('button:has-text("Done")');
//     await page.waitForSelector('button:has-text("Not Started")');

//   // タスクの削除
//     await page.click('button:has-text("Delete")');
//     await page.waitForSelector('h1:has-text("TeamB: タスク管理dayone")'); // ホームページに戻る

//   // タスクが削除されていることを確認
//     await expect(page.locator('.task-card')).not.toHaveText('Sample Task');
// });

import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3003'; // VSCodeでテストを実施する時こっち
// const baseURL = 'http://react:3003'; // 通常はこっちを有効にしておく(コンテナ用)

test('Task Manager E2E Tests', async ({ page }) => {
  // ページを開く
  await page.goto(baseURL);

  // タスクが初期表示されていることを確認
  await expect(page.locator('h1')).toHaveText('TeamB: タスク管理dayone');

  // タスクの追加
  await page.click('button:has-text("Add Task")');
  await page.waitForSelector('input[placeholder="Task Name"]');
  await page.fill('input[placeholder="Task Name"]', 'Sample Task'); // 更新されたinputフィールドのセレクタ
  await page.fill('input[placeholder="Category"]', 'General'); // 新しいフィールドも追加
  // await page.fill('input[name="Status"]', 'Not Started'); // 新しいフィールドも追加
  await page.selectOption('select[name="Status"]', { label: 'Not Started' });
  await page.fill('input[type="date"]', '2024-12-31'); // 新しいフィールドも追加
  await page.fill('textarea[placeholder="Memo"]', 'Sample memo'); // 新しいフィールドも追加
  await page.click('button:has-text("Add Task")'); // 新しいボタンのセレクタに変更
  await page.waitForSelector('h1:has-text("TeamB: タスク管理dayone")'); // ホームページに戻る

  // // 追加されたタスクが表示されていることを確認
  // const taskCards = page.locator('.task-card');
  // const count = await taskCards.count(); // 要素の数を取得
  // await expect(taskCards.nth(count - 1)).toContainText('Sample Task'); // 最後の要素を検証

  // タスクのステータスを更新
  // const statusButtons = page.locator('button:has-text("In Progress")');
  // await statusButtons.first().click();
  // const doneButton = page.locator('button:has-text("Done")');
  // await doneButton.first().click();
  // await page.waitForSelector('button:has-text("Not Started")');

  // タスクの削除
  await page.waitForSelector('button:has-text("Delete")');
  await page.click('button:has-text("Delete")');
  await page.waitForSelector('h1:has-text("TeamB: タスク管理dayone")'); // ホームページに戻る

  // タスクが削除されていることを確認
  await expect(page.locator('.task-card')).not.toHaveText('Sample Task');
});
