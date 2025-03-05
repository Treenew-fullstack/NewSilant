from django.contrib import admin
from .models import *

admin.site.register(Car)
admin.site.register(Maintenance)
admin.site.register(Complaints)

admin.site.register(TechModel)
admin.site.register(EngineModel)
admin.site.register(TransmissionModel)
admin.site.register(LeadingAxle)
admin.site.register(ControlledAxle)
admin.site.register(ServiceCompany)
admin.site.register(TypeMaintenance)
admin.site.register(OrganizationMent)
admin.site.register(FailureNode)
admin.site.register(RecoveryMethod)
