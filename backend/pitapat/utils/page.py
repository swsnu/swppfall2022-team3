from rest_framework.response import Response


def paginate(queryset, paginate_queryset, serializer, get_paginated_response):
    page = paginate_queryset(queryset)
    if page is not None:
        serializer = serializer(page, many=True)
        return get_paginated_response(serializer.data)
    return Response(serializer(queryset, many=True).data)
