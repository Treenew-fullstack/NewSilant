from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model


User = get_user_model()


class TechModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechModel
        fields = '__all__'


class EngineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineModel
        fields = '__all__'


class TransmissionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransmissionModel
        fields = '__all__'


class LeadingAxleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadingAxle
        fields = '__all__'


class ControlledAxleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlledAxle
        fields = '__all__'


class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    tech_model_name = serializers.CharField(source='tech_model.name', read_only=True)
    tech_model_desc = serializers.CharField(source='tech_model.description', read_only=True)
    engine_name = serializers.CharField(source='engine.name', read_only=True)
    engine_desc = serializers.CharField(source='engine.description', read_only=True)
    transmission_name = serializers.CharField(source='transmission.name', read_only=True)
    transmission_desc = serializers.CharField(source='transmission.description', read_only=True)
    leading_axle_name = serializers.CharField(source='leading_axle.name', read_only=True)
    leading_axle_desc = serializers.CharField(source='leading_axle.description', read_only=True)
    controlled_axle_name = serializers.CharField(source='controlled_axle.name', read_only=True)
    controlled_axle_desc = serializers.CharField(source='controlled_axle.description', read_only=True)
    client_name = serializers.CharField(source='client.first_name', read_only=True)
    service_company_name = serializers.CharField(source='service_company.name', read_only=True)
    service_company_desc = serializers.CharField(source='service_company.description', read_only=True)

    class Meta:
        model = Car
        fields = ('id', 'machine_no', 'tech_model_name', 'engine_name', 'engine_no', 'transmission_name',
                  'transmission_no', 'leading_axle_name', 'leading_axle_no', 'controlled_axle_name',
                  'controlled_axle_no', 'supply_contract', 'shipment_date', 'consignee', 'delivery_address',
                  'eqiupment', 'client_name', 'service_company_name', 'tech_model_desc', 'engine_desc',
                  'transmission_desc', 'leading_axle_desc', 'controlled_axle_desc', 'service_company_desc')


class FailureNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FailureNode
        fields = '__all__'


class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = '__all__'


class ComplaintsSerializer(serializers.ModelSerializer):
    car_no = serializers.CharField(source='car.machine_no', read_only=True)
    failure_node_name = serializers.CharField(source='failure_node.name', read_only=True)
    failure_node_desc = serializers.CharField(source='failure_node.description', read_only=True)
    recovery_method_name = serializers.CharField(source='recovery_method.name', read_only=True)
    recovery_method_desc = serializers.CharField(source='recovery_method.description', read_only=True)
    service_company_name = serializers.CharField(source='service_company.name', read_only=True)
    service_company_desc = serializers.CharField(source='service_company.description', read_only=True)

    class Meta:
        model = Complaints
        fields = ('id', 'car', 'car_no', 'date_refusal', 'operating_time', 'failure_node_name', 'failure_desc',
                  'recovery_method_name', 'spare_parts', 'date_restoration', 'car_downtime', 'service_company_name',
                  'failure_node_desc', 'recovery_method_desc', 'service_company_desc', 'failure_node',
                  'recovery_method', 'service_company')

    def create(self, validated_data):
        complaints = Complaints.objects.create(**validated_data)
        return complaints


class TypeMaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeMaintenance
        fields = '__all__'


class MaintenanceSerializer(serializers.ModelSerializer):
    car_no = serializers.CharField(source='car.machine_no', read_only=True)
    type_maintenance_name = serializers.CharField(source='type_maintenance.name', read_only=True)
    type_maintenance_desc = serializers.CharField(source='type_maintenance.description', read_only=True)
    service_company_name = serializers.CharField(source='service_company.name', read_only=True)
    service_company_desc = serializers.CharField(source='service_company.description', read_only=True)

    class Meta:
        model = Maintenance
        fields = ('id', 'car', 'car_no', 'type_maintenance_name', 'date', 'operating_time', 'work_order_number',
                  'work_order_date', 'service_company_name', 'type_maintenance_desc', 'service_company_desc',
                  'type_maintenance', 'service_company')

    def create(self, validated_data):
        maintenance = Maintenance.objects.create(**validated_data)
        return maintenance


class CustomUserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'is_staff')
