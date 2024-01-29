from django.contrib import admin

from .models import Review


class ReviewAdmin(admin.ModelAdmin):
    fields = [
        "title",
        "body",
        "rating",
        "owner",
    ]
    list_display = ["title", "body", "rating", "owner"]


admin.site.register(Review, ReviewAdmin)


# Register your models here.
