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

    # Extract order items and total price from the request data
    order_items_data = data.get("orderItems", [])
    total_price = data.get("totalPrice", "0.00")

    # Create an order
    order = Order.objects.create(totalPrice=total_price,
                                 user=user
                                 )

    # Create order items
    for order_item_data in order_items_data:
        order_item = OrderItem.objects.create(
            product_id=order_item_data["id"],
            order=order,
            name=order_item_data["name"],
            price=order_item_data["price"],
            check_in_date=order_item_data["checkInDate"],
            check_out_date=order_item_data["checkOutDate"],
            # You may want to handle 'datesInRange' and 'totalNight' differently
            # based on your requirements
        )

    # Serialize the order and return the response
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    user = request.user 
    # Retrieve all orders for the current user
    orders = user.order_set.all()

    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)