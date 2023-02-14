from django.contrib import admin
import rest_framework_simplejwt.token_blacklist as token_blacklist

# Allow outstanding tokens to be deleted
class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):
    def has_delete_permission(self, *args, **kwargs):
        return True

admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)