# Generated by Django 4.2.14 on 2024-07-16 22:21

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('task_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_id', models.CharField(max_length=100)),
                ('task', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=20)),
                ('deadline', models.DateField()),
                ('memo', models.CharField(blank=True, max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=20)),
            ],
        ),
    ]
