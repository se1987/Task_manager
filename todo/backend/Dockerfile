# python:3.8の公式 image をベースの image として設定
FROM python:3.8

# 作業ディレクトリの作成: 不要
# RUN mkdir /backend

# 作業ディレクトリの設定（以後の RUN は WORKDIR で実行）
# WORKDIR /backend
WORKDIR /usr/src/app

# 同一ディレクトリ内のファイルを全てコピー
COPY . .

# pipでrequirements.txtに指定されているパッケージを追加する
RUN pip install -r requirements.txt

# 起動(今回はなし)
# CMD python3 manage.py runserver 0.0.0.0:8000
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
