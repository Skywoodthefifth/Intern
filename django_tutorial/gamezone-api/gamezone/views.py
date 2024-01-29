from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets

from gamezone.serializers import GroupSerializer, UserSerializer, ReviewSerializer
from gamezone.models import Review
from gamezone.permissions import IsOwnerOrReadOnly

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated, TokenHasScope]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrReadOnly,
        TokenHasReadWriteScope,
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
