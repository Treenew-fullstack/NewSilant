from django.shortcuts import redirect
from rest_framework import viewsets, permissions
from .models import Car, Maintenance, Complaints, TypeMaintenance, ServiceCompany, RecoveryMethod, FailureNode
from .serializers import (CarSerializer, MaintenanceSerializer, ComplaintsSerializer, CustomUserDetailSerializer,
                          TypeMaintenanceSerializer, ServiceCompanySerializer, RecoveryMethodSerializer,
                          FailureNodeSerializer)
from dj_rest_auth.views import UserDetailsView


class CarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            if user.is_staff:
                return Car.objects.all()

            cars_by_service_company = Car.objects.filter(service_company__name=user.first_name)
            if cars_by_service_company.exists():
                return cars_by_service_company

            cars_by_client = Car.objects.filter(client__first_name=user.first_name)
            if cars_by_client.exists():
                return cars_by_client

            return Car.objects.none()
        else:
            machine_no = self.request.query_params.get('machine_no', None)
            if machine_no is not None:
                return Car.objects.filter(machine_no=machine_no)
            else:
                return Car.objects.none()


class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Maintenance.objects.all()

        maintenance_cars_by_service_company = Maintenance.objects.filter(car__service_company__name=user.first_name)
        if maintenance_cars_by_service_company.exists():
            return maintenance_cars_by_service_company

        maintenance_cars_by_client = Maintenance.objects.filter(car__client__first_name=user.first_name)
        if maintenance_cars_by_client.exists():
            return maintenance_cars_by_client

        return Maintenance.objects.none()


class ComplaintsViewSet(viewsets.ModelViewSet):
    queryset = Complaints.objects.all()
    serializer_class = ComplaintsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Complaints.objects.all()

        complaints_cars_by_service_company = Complaints.objects.filter(car__service_company__name=user.first_name)
        if complaints_cars_by_service_company.exists():
            return complaints_cars_by_service_company

        complaints_cars_by_client = Complaints.objects.filter(car__client__first_name=user.first_name)
        if complaints_cars_by_client.exists():
            return complaints_cars_by_client

        return Complaints.objects.none()


class CustomUserDetailsView(UserDetailsView):
    serializer_class = CustomUserDetailSerializer


class TypeMaintenanceView(viewsets.ReadOnlyModelViewSet):
    queryset = TypeMaintenance.objects.all()
    serializer_class = TypeMaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]


class ServiceCompanyView(viewsets.ModelViewSet):
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer
    permission_classes = [permissions.IsAuthenticated]


class RecoveryMethodView(viewsets.ModelViewSet):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer
    permission_classes = [permissions.IsAuthenticated]


class FailureNodeView(viewsets.ModelViewSet):
    queryset = FailureNode.objects.all()
    serializer_class = FailureNodeSerializer
    permission_classes = [permissions.IsAuthenticated]
