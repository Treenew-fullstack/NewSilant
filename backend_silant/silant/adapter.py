from allauth.account.adapter import DefaultAccountAdapter
from django.shortcuts import redirect


class MyAccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request):
        return False
