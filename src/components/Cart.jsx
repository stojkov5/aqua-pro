import React from "react";
import "../styles/Cart.css";
import { Row, Col } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const submitOrder = async (order) => {
  const response = await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Failed to send order.");
  }
  return data;
};

const Cart = () => {
  const queryClient = useQueryClient();

  const getStoredCart = () => {
    try {
      const saved = localStorage.getItem("aquaProCart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getStoredCart,
  });

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    localStorage.setItem("aquaProCart", JSON.stringify(updated));
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  const clearCart = () => {
    localStorage.removeItem("aquaProCart");
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  const parsePrice = (description) => {
    const match = description.match(/(\d+)\s*EUR/);
    return match ? parseFloat(match[1]) : 0;
  };

  const getCartSummary = () => {
    const groupedItems = {};
    cart.forEach((item) => {
      const key = `${item.id}_${item.size || "NoSize"}`;
      if (!groupedItems[key]) {
        groupedItems[key] = { ...item, quantity: 1 };
      } else {
        groupedItems[key].quantity += 1;
      }
    });

    const cart_items = Object.values(groupedItems).map((item) => {
      const unitPrice = parsePrice(item.description);
      return {
        id: item.id,
        name: item.name,
        size: item.size || "N/A",
        quantity: item.quantity,
        price: `${unitPrice} EUR`,
        subtotal: `${unitPrice * item.quantity} EUR`,
      };
    });

    const total_price = cart_items.reduce((sum, item) => {
      const val = parseFloat(item.subtotal.replace(" EUR", ""));
      return sum + val;
    }, 0);

    return { cart_items, total_price };
  };

  const { total_price } = getCartSummary();

  return (
    <Row justify="center" className="cart-section py-30">
      <Col span={20}>
        <div className="cart-container">
          <h2 className="cart-title">Cart</h2>

          {cart.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((item, index) => (
                  <li key={index} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-img"
                    />
                    <div className="cart-details">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      {item.size && <p>Size: {item.size}</p>}
                      <button
                        onClick={() => removeFromCart(index)}
                        className="cart-remove"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cart-total text-right mt-4 text-lg font-semibold">
                Total: {total_price.toFixed(2)} EUR
              </div>

              <div className="cart-form mt-6">
                <Formik
                  initialValues={{
                    fullName: "",
                    email: "",
                    phone: "",
                    website: "",
                  }}
                  validationSchema={Yup.object({
                    fullName: Yup.string().required("Full Name is required"),
                    email: Yup.string()
                      .email("Invalid email")
                      .required("Email is required"),
                    phone: Yup.string().required("Phone number is required"),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    const { cart_items } = getCartSummary();

                    submitOrder({
                      fullName: values.fullName,
                      email: values.email,
                      phone: values.phone,
                      website: values.website,
                      items: cart_items.map((item) => ({
                        id: item.id,
                        size: item.size === "N/A" ? null : item.size,
                        quantity: item.quantity,
                      })),
                    })
                      .then(({ orderNumber }) => {
                        toast.success(
                          `Order #${orderNumber} sent! Check your email for confirmation.`
                        );
                        resetForm();
                        clearCart();
                      })
                      .catch((error) => {
                        console.error("Order error:", error);
                        toast.error(error.message);
                      })
                      .finally(() => {
                        setSubmitting(false);
                      });
                  }}
                >
                  {({ isValid, dirty, isSubmitting }) => (
                    <Form className="flex flex-col items-center gap-4">
                      {/* Honeypot for spam bots — hidden from real visitors */}
                      <Field
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        style={{ position: "absolute", left: "-9999px" }}
                      />
                      <div className="form-group w-full md:w-1/2">
                        <Field
                          name="fullName"
                          type="text"
                          placeholder="Full Name"
                          className="cart-input"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="cart-error"
                        />
                      </div>
                      <div className="form-group w-full md:w-1/2">
                        <Field
                          name="email"
                          type="email"
                          placeholder="Email"
                          className="cart-input"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="cart-error"
                        />
                      </div>
                      <div className="form-group w-full md:w-1/2">
                        <Field
                          name="phone"
                          type="text"
                          placeholder="Phone Number"
                          className="cart-input"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="cart-error"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={!(isValid && dirty) || isSubmitting}
                        className="shop-button mt-4"
                      >
                        Order Now
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Cart;
