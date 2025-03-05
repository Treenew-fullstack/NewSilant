from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (CarViewSet, MaintenanceViewSet, ComplaintsViewSet, TypeMaintenanceView, ServiceCompanyView,
                    RecoveryMethodView, FailureNodeView)

router = DefaultRouter()
router.register(r'machines', CarViewSet)
router.register(r'maintenance', MaintenanceViewSet)
router.register(r'complaints', ComplaintsViewSet)
router.register(r'typemaintenance', TypeMaintenanceView)
router.register(r'servicecompany', ServiceCompanyView)
router.register(r'recoverymethod', RecoveryMethodView)
router.register(r'failurenode', FailureNodeView)

urlpatterns = [
    path('', include(router.urls)),
]
