from django.db import models


class Review(models.Model):
    title = models.TextField()
    body = models.TextField()
    rating = models.IntegerField()

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created"]

    owner = models.ForeignKey(
        "auth.User", related_name="reviews", on_delete=models.CASCADE
    )
