from .auth import AuthEmailViewSet, AuthVerifyViewSet
from .chatroom import ChatroomParticipantViewSet
from .pitapat import PitapatViewSet
from .block import BlockViewSet
from .photo import PhotoCreateViewSet, PhotoDetailViewSet
from .tag import TagViewSet
from .university import UniversityViewSet, MajorUniversityViewSet, CollegeUniversityViewSet, MajorCollegeViewSet
from .user import UserViewSet, UserDetailViewSet, UserExistenceCheckViewSet
from .user_chatroom import UserChatroomViewSet
from .user_introduction import UserIntroductionViewSet
from .user_pitapat import PitapatToUserViewSet, PitapatFromUserViewSet
from .user_block import BlockFromUserViewSet
from .user_tag import UserTagViewSet
from .user_photo import UserPhotoViewSet
