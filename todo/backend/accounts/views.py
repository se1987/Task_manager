# backend/accounts/views.py

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.http import JsonResponse
import jwt

# # ログイン（トークン適用）
# def login_view(request):
#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(request, username=username, password=password)
#         # 認証が成功
#         if user is not None:
#             login(request, user)
#             token = jwt.encode({'user_id': user.id}, 'your-secret-key', algorithm='HS256')
#             response = JsonResponse({'token': token})
#             response.set_cookie('auth_token', token, httponly=True, secure=True)
#             return response
#         # 認証が失敗
#         else:
#             return JsonResponse({'error': 'Invalid credentials'}, status=400)
#     # POST以外からのリクエストの場合
#     return JsonResponse({'error': 'POST request required'}, status=400)

# # ログイン（トークン適用前）
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('http://localhost:3003')  # ログイン後のリダイレクト先
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})

# ログアウト
def logout_view(request):
    logout(request)
    return redirect('login')

# 新規登録（トークン実装前）
def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('login')  # 登録後のリダイレクト先
    else:
        form = UserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})
