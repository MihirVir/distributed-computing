import React, { useState } from 'react';
import './OrderCreationComponent.css'; // 引入 CSS 文件

const OrderCreationComponent = () => {
  // ...省略其他代码

  return (
    <div className="order-creation">
      <input
        className="order-input"
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
      />
      <input
        className="order-input"
        type="text"
        name="flightNumber"
        placeholder="Flight Number"
        onChange={handleFlightMapChange}
      />
      {/* 更多输入字段 */}
      <button className="order-button" onClick={handleSubmit}>Create Order</button>
    </div>
  );
};

export default OrderCreationComponent;
