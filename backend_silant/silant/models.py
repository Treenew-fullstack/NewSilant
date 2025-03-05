from django.db import models
from django.contrib.auth import get_user_model
from datetime import timedelta


class TechModel(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название техники')
    description = models.TextField(blank=True, null=True, verbose_name='Описание техники')

    class Meta:
        verbose_name = 'Модель техники'
        verbose_name_plural = 'Модель техники'

    def __str__(self):
        return self.name


class EngineModel(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название двигателя')
    description = models.TextField(blank=True, null=True, verbose_name='Описание двигателя')

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модель двигателя'

    def __str__(self):
        return self.name


class TransmissionModel(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название трансмиссии')
    description = models.TextField(blank=True, null=True, verbose_name='Описание трансмиссии')

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модель трансмиссии'

    def __str__(self):
        return self.name


class LeadingAxle(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название ведущего моста')
    description = models.TextField(blank=True, null=True, verbose_name='Описание ведущего моста')

    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модель ведущего моста'

    def __str__(self):
        return self.name


class ControlledAxle(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название управляемого моста')
    description = models.TextField(blank=True, null=True, verbose_name='Описание управляемого моста')

    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модель управляемого моста'

    def __str__(self):
        return self.name


class ServiceCompany(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название сервисной компании')
    description = models.TextField(blank=True, null=True, verbose_name='Описание сервисной компании')

    class Meta:
        verbose_name = 'Сервисная компания'
        verbose_name_plural = 'Сервисная компания'

    def __str__(self):
        return self.name


class Car(models.Model):
    User = get_user_model()

    machine_no = models.CharField(max_length=100, unique=True, verbose_name='Зав. № машины')
    tech_model = models.ForeignKey(TechModel, on_delete=models.CASCADE, verbose_name='Модель техники')
    engine = models.ForeignKey(EngineModel, on_delete=models.CASCADE, verbose_name='Модель двигателя')
    engine_no = models.CharField(max_length=100, verbose_name='Зав. № двигателя')
    transmission = models.ForeignKey(TransmissionModel, on_delete=models.CASCADE, verbose_name='Трансмиссия')
    transmission_no = models.CharField(max_length=100, verbose_name='Зав. № трансмиссии')
    leading_axle = models.ForeignKey(LeadingAxle, on_delete=models.CASCADE, verbose_name='Ведущий мост')
    leading_axle_no = models.CharField(max_length=100, verbose_name='Зав. № ведущего моста')
    controlled_axle = models.ForeignKey(ControlledAxle, on_delete=models.CASCADE, verbose_name='Управляемый мост')
    controlled_axle_no = models.CharField(max_length=100, verbose_name='Зав. № управляемого моста')
    supply_contract = models.CharField(max_length=200, verbose_name='Договор поставки №, дата')
    shipment_date = models.DateField(verbose_name='Дата отгрузки с завода')
    consignee = models.CharField(max_length=200, verbose_name='Грузополучатель (конечный потребитель)')
    delivery_address = models.CharField(max_length=200, verbose_name='Адрес поставки (эксплуатации)')
    eqiupment = models.CharField(max_length=200, verbose_name='Комплектация (доп. опции)')
    client = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Клиент')
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, verbose_name='Сервисная компания')

    class Meta:
        ordering = ['shipment_date']
        verbose_name = 'Машина'
        verbose_name_plural = 'Машины'

    def __str__(self):
        return f'№ Машины - {self.machine_no}'


class TypeMaintenance(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название ТО')
    description = models.TextField(blank=True, null=True, verbose_name='Описание ТО')

    class Meta:
        verbose_name = 'Тип ТО'
        verbose_name_plural = 'Типы ТО'

    def __str__(self):
        return self.name


class OrganizationMent(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название организации')
    description = models.TextField(blank=True, null=True, verbose_name='Описание организации')

    class Meta:
        verbose_name = 'Модель организации'
        verbose_name_plural = 'Организации'

    def __str__(self):
        return self.name


class Maintenance(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name='Машина')
    type_maintenance = models.ForeignKey(TypeMaintenance, on_delete=models.CASCADE, verbose_name='Вид ТО')
    date = models.DateField(verbose_name='Дата проведения ТО')
    operating_time = models.IntegerField(verbose_name='Нароботка, м/час')
    work_order_number = models.CharField(max_length=100, verbose_name='№ заказ-наряда')
    work_order_date = models.DateField(verbose_name='Дата заказ-наряда')
    organization_maintenance = models.ForeignKey(OrganizationMent, on_delete=models.CASCADE,
                                                 verbose_name='Организация, проводившая ТО',
                                                 null=True,
                                                 blank=True)
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, verbose_name='Сервисная компания')

    class Meta:
        ordering = ['date']
        verbose_name = 'Модель ТО'
        verbose_name_plural = 'ТО'

    def __str__(self):
        return f'ТО машины - {self.car}'


class FailureNode(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название узла отказа')
    description = models.TextField(blank=True, null=True, verbose_name='Описание узла отказа')

    class Meta:
        verbose_name = 'Модель узла отказа'
        verbose_name_plural = 'Узлы отказа'

    def __str__(self):
        return self.name


class RecoveryMethod(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название способа восстановления')
    description = models.TextField(blank=True, null=True, verbose_name='Описание способа восстановления')

    class Meta:
        verbose_name = 'Модель способа восстановления'
        verbose_name_plural = 'Способы восстановления'

    def __str__(self):
        return self.name


class Complaints(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, verbose_name='Машина')
    date_refusal = models.DateField(verbose_name='Дата отказа')
    operating_time = models.IntegerField(verbose_name='Нароботка, м/час')
    failure_node = models.ForeignKey(FailureNode, on_delete=models.CASCADE, verbose_name='Узел отказа')
    failure_desc = models.CharField(max_length=100, verbose_name='Описание отказа')
    recovery_method = models.ForeignKey(RecoveryMethod, on_delete=models.CASCADE, verbose_name='Способ восстановления')
    spare_parts = models.CharField(max_length=100, verbose_name='Используемые запасные части')
    date_restoration = models.DateField(verbose_name='Дата восстановления')
    car_downtime = models.IntegerField(verbose_name='Время простоя техники', default=0)
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, verbose_name='Сервисная компания')

    class Meta:
        ordering = ['date_refusal']
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'

    def __str__(self):
        return f'Рекламация машины - {self.car}'

    def save(self, *args, **kwargs):
        self.car_downtime = (self.date_restoration - self.date_refusal).days
        super().save(*args, **kwargs)
