# backend/tasks/views.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import Task
from .serializers import TaskSerializer
import logging

logger = logging.getLogger(__name__)

@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        logger.debug('GETリクエエストを受け取りました。')
        tasks = Task.objects.all()
        logger.info('Task.objects.all()を実行しました。タスク数: %d', tasks.count())
        # logger.info('Task.objects.all()を変数tasksに代入します。tasks=', tasks)
        serializer = TaskSerializer(tasks, many=True)
        logger.debug('シリアライズされたデータをレスポンスとして返します。データ: %s', serializer.data)
        # logger.debug('serializer.data=', serializer.data)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        logger.debug('POSTリクエストを受け取りました。')
        serializer = TaskSerializer(data=request.data)
        # logger.debug('serializerを定義:', serializer)
        if serializer.is_valid():
            logger.debug('serializerが有効だったので、データベースに保存します。')
            serializer.save()
            logger.info('新しいタスクが作成されました: %s', serializer.data)
            # logger.debug('POSTリクエストの内容をデータベースに保存しました。')
            # logger.debug('保存した内容:', serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # logger.error('BAD Requestを検知。エラーレスポンスを送信します。')
        # logger.error('serializer.errors:', serializer.errors)
        logger.error('バリデーションエラー: %s', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk)
        logger.debug('タスクを取得しました: %s', task)
        # logger.debug('primary-keyに基づき、データを取得しました。')
        # logger.debug('pk(primary-key) = ', pk)
        # logger.debug('pkに基づいて取得したtask:', task)
    except Task.DoesNotExist:
        # logger.info('pkが一致するtaskが見つからないため、404エラーを送信します。')
        logger.info('タスクが見つかりません: %s', pk)
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        # logger.debug('GETリクエストを受け付けました。pkは「', pk, '」です')
        logger.debug('タスク詳細を取得します: %s', pk)
        serializer = TaskSerializer(task)
        logger.debug('正常なレスポンス(タスク詳細)を送信します。')
        # logger.debug('レスポンスに含めるserializer.data: ', serializer.data)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        # logger.debug('PUTリクエストを受け付けました。pkは「, 'pk ,'」です。')
        logger.debug('タスクを更新します: %s', pk)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            # logger.debug('serializerが有効だったため、データベースに保存します。')
            serializer.save()
            # logger.debug('PUTリクエストの内容をデータベースに保存しました。')
            # logger.debug('保存した内容:', serializer.data)
            logger.info('タスクが更新されました: %s', serializer.data)
            return Response(serializer.data)
        logger.error('バリデーションエラー: %s', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        logger.debug('DELETEリクエストを受け付けました。')
        # logger.debug('pkが', pk, 'のtask:', task, 'を削除します')
        logger.info('タスクを削除します: %s', pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

