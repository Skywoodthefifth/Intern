from django.contrib.auth.models import Group, User
from rest_framework import serializers

from gamezone.models import Review


class UserSerializer(serializers.HyperlinkedModelSerializer):
    reviews = serializers.HyperlinkedRelatedField(
        many=True, view_name="review-detail", read_only=True
    )

    class Meta:
        model = User
        fields = ["url", "id", "username", "reviews"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Review
        fields = [
            "url",
            "id",
            "title",
            "body",
            "rating",
            "owner",
        ]
