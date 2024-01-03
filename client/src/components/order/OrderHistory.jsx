import React, { useState, useEffect } from 'react';
import './OrderHistoryComponent.css'; // 引入 CSS 文件

const OrderHistoryComponent = ({ onOrderSelect, userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const history = await getOrderHistory(userId);
        setOrders(history);
      } catch (error) {
        console.error('Failed to fetch order history:', error);
        // 可以设置错误状态，并在UI中显示错误信息
      }
    };

    fetchOrderHistory();
  }, [userId]); // 如果userId是props的一部分，请将其添加到依赖数组中

  return (
    <div className="order-history">
      {orders.map((order) => (
        <div key={order.order_id} onClick={() => onOrderSelect(order.order_id)} className="order-item">
          {/* 展示订单信息，可以进一步样式化 */}
        </div>
      ))}
    </div>
  );
};
export default OrderHistoryComponent;
