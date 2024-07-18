# データベース設計

## User
|カラム|user_id|name|email|password|
|-----|-----|-----|-----|-----|
|データ型|uuid|string(100)|email(100)|string(8-20)|
|サンプル|wryi987gkm6|sayoko|sayoko@gmail.com|sayoko9999を暗号化したい（できてない）|

## Task

|カラム|task_id|user_id|task|category|status|deadline|memo|created_at|updated_at|
|-----|-------|------|-----|--------|------|--------|-----|---------|----------|
|データ型|number(Int)|string(uuid)|string(100)|string(100)|string(20)|Date|string(255),null,blank|Date|Date|
|サンプル|1|asd123hjk876gbn|API設計書作成|チーム開発|not started|2024-7-17|(null)|2024-7-16|2024-7-16|