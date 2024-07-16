# データベースのテーブル設定
from django.db import models
import uuid


class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=100)
    task = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    deadline = models.DateField()
    memo = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(str):
        return f"task_id: {self.task_id}, user_id: {self.user_id}, task: {self.task}, category: {self.category}, status: {self.status}, deadline: {self.deadline}, memo: {self.memo}, created_at: {self.created_at}, updated_at: {self.updated_at}"

class User(models.Model):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=20)

    def clean(self):
        if len(self.password) < 8:
            raise ValidationError('パスワードは8文字以上20文字以内で設定してください')
    
    def __str__(self):
        return f"user_id: {self.user_id}, name: {self.name}, email: {self.email}"
    
# class AnotherModel(models.Model):
#     # 新しいモデルの定義
#     field1 = models.CharField(max_length=50)
#     field2 = models.IntegerField()

#     def __str__(self):
#         return f"field1: {self.field1}, field2: {self.field2}"