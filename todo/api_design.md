# API設計書

## リソース一覧
- **users** : ユーザー情報
- **tasks** : 管理するタスク

## エンドポイント一覧と対応可能なメソッド
### 1. `/user`
- GET, PUT, DELETE
### 2. `/task`
- GET, POST, PUT, DELETE
### 3. `/signup`
- POST
### 4. `/login`
- POST
### 5. `/logout`
- POST

## HTTPメソッドごとの設計内容
### `/user`
|メソッド|パラメーター|処理|
|-------|----------|----|
|GET| - | 全てのユーザー情報を取得|
|GET|`/:id`|指定したIDのユーザー情報を取得|
|PUT|`/:id`|ユーザー情報の変更/更新|
|DELETE|`/:id`|指定したIDのユーザーの削除|


### `/task`
|メソッド|パラメーター|処理|
|------|-----------|---|
|GET|-|全てのタスクデータを取得|
|GET|`/:id`|指定したIDのタスクを取得|
|POST|-|新規のタスク登録|
|PUT|`/:id`|指定したIDのタスクを編集・更新|
|DELETE|`/:id`|指定したIDのタスク削除|

### `/signup`
|メソッド|パラメーター|処理|
|------|-----------|---|
|POST|-|新規のユーザー登録|


### `/login`
|メソッド|パラメーター|処理|
|------|-----------|---|
|POST|-|ログインのための認証情報送信|

### `/logout`
|メソッド|パラメーター|処理|
|------|-----------|---|
|GET or POST|-|ログアウト処理実行のリクエスト送信|

## データ形式( request, response )
- Request : JSON
- Response : JSON

## リソースごとのrequest;/responseの例
**GET: /user**
```json
// request

// response
[
    {
    user_id: string/uuid,
    name: string,
    email: string,
    // userにはpasswordも含まれるがそれはresponseに含めない
    },
    {
        user_id: string/uuid,
        name: string,
        email: string,
    },
    ...
]

```

**GET: /user/:id**
```json
// request
// params = user_id
// response
{
    user_id: string/uuid,
    name: string,
    email: string,
    // userにはpasswordも含まれるがそれはresponseに含めない
}
```

**PUT: /user/:id**
```json
// request
// params = user_id
{
    name: string,
    email: string
}
// response
{
    status: 200,
    message: `更新が完了しました`,
    data: updatedUser: {
        user_id: ...,
        name: ...,
        email: ...,
    }
}

```

**DELETE: /user/:id**
```json
// request
// params = user_id
// response
{
    status: 200,
    message: `削除が完了しました`,
}
```


**GET: /task**
```json
// request

// response
[
    {
        task_id: number/int,
        user_id: uuid/string,
        task_name: string,
        category: string,
        status: string,
        deadline: Date,
        memo?: string|null|undefined,
        created_at: Date,
        updated_at: Date,
    },
    {
        task_id: number/int,
        user_id: uuid/string,
        task_name: string,
        category: string,
        status: string,
        deadline: Date,
        memo?: string|null|undefined,
        created_at: Date,
        updated_at: Date,
    },
    ...
]

```

**GET: /task/:id**
```json
// request
// params = task_is
// response
{
    task_id: number/int,
    user_id: uuid/string,
    task_name: string,
    category: string,
    status: string,
    deadline: Date,
    memo?: string|null|undefined,
    created_at: Date,
    updated_at: Date,
}
```

**POST: /task**
```json
// request
{
    user_id: uuid/string,
    task_name: string,
    category: string,
    status: string,
    deadline: Date,
    memo?: string|null|undefined,
}

// response
{
    status: 201,
    message: `タスクを登録しました`,
    data: newTask: {
        task_id: number/int,
        user_id: uuid/string,
        task_name: string,
        category: string,
        status: string,
        deadline: Date,
        memo?: string|null|undefined,
        created_at: Date,
        updated_at: Date,
    }
}

```

**PUT: /tasks/:id**
```json
// request
// params = task_id
{
    user_id: uuid/string,
    task_name: string,
    category: string,
    status: string,
    deadline: Date,
    memo?: string|null|undefined,
}

// response
{
    status: 200,
    message: `タスクを更新しました`,
    data: updatedTask: {
        task_id: number/int,
        user_id: uuid/string,
        task_name: string,
        category: string,
        status: string,
        deadline: Date,
        memo?: string|null|undefined,
        created_at: Date,
        updated_at: Date,
    }
}

```

**DELETE: /tasks/:id**
```json
// request

// response
{
    status: 200,
    message: `タスクを削除しました`
}

```

**POST: /signup**
```json
// request
{
    name: string,
    email: string,
    password: string,
}

// response
{
    status: 201,
    message: `ユーザーの新規登録が完了しました`,
    data: newUser: {
        user_id: uuid/string,
        name: string,
        email: string,
        // passwordはresponseに載せない
    }🇰,
}

```

**POST: /login**
```json
// request
{
    email: string,
    password: string
}

// response
{
    status: 200,
    message: `ログインに成功しました`,
    token: string, // 任意の文字列などが自動発行される想定・前提で。
    user: {
        user_id: uuid/string,
        name: string,
        email: string
    }
}

```

**GET or POST: /logout**
```json
// request
// POSTの場合
{
    token: string,
}

// response
{
    status: 200,
    message: `ログアウトしました`
}

```