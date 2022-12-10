from datetime import date
from pitapat.models import User, University, College, Major


def setup():
    university = University.objects.create(name='snu', location='seoul', email_domain='snu.ac.kr')
    university.save()
    college = College.objects.create(name='engineering', university=university)
    college.save()
    major = Major.objects.create(name='CS', college=college)
    major.save()
    User.objects.create(nickname='a', email='snu1@snu.ac.kr', university=university,
                                    college=college, major=major, birthday=date.today(),
                                    phone='000-0000-0000').save()
    User.objects.create(nickname='b', email='snu2@snu.ac.kr', university=university,
                                    college=college, major=major, birthday=date.today(),
                                    phone='010-0000-0000').save()
