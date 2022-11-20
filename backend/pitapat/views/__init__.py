from .pitapat import PitapatViewSet
from .photo import PhotoViewSet, PhotoDetailViewSet
from .tag import TagViewSet
from .university import UniversityViewSet, CollegeViewSet, MajorViewSet
from .user import UserViewSet, UserDetailViewSet, UserChatroomParticipantViewSet, UserIntroductionViewSet
from .chatroom import UserChatroomViewSet
from .user_pitapat import PitapatToUserViewSet, PitapatFromUserViewSet
from .user_tag import UserTagViewSet
from .auth import AuthViewSet, AuthVerifyViewSet
