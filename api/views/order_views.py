from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime


from api.models import Product, Order, OrderItem, BookedDate
from api.serializers import ProductSerializer, OrderSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    booked_dates = data["bookedDates"]
    total_price = data["totalPrice"]

    # 1) create a new order
    order = Order.objects.create(user=user, totalPrice=total_price)

    # 2) create booked date and set order to bookedDate relationship
    for booked_date in booked_dates:
        product = Product.objects.get(id=booked_date["id"])

        for date_str in booked_date["dates"]:
            date_instance = datetime.strptime(date_str, "%Y-%m-%d").date()

            date_obj = BookedDate.objects.create(
                date=date_instance, order=order, product=product
            )

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)
