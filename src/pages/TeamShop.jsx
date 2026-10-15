import React, { useState } from "react";
import { Row, Col, Modal, Select, Carousel } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import "../styles/TeamShop.css";
import { fetchProducts } from "../lib/products";

// General clothing sizes
const generalSizes = [
  "S", "M", "L", "XL",
  "4yo", "6yo", "8yo", "10yo", "12yo", "14yo (XS)"
];

// Male swimsuit sizes (Low waist)
const maleSizes = [
  "20 (60 cm)", "22 (65 cm)", "24 (70 cm)", "26 (75 cm)", "28 (80 cm)",
  "30 (85 cm)", "32 (90 cm)", "34 (95 cm)", "36 (100 cm)", "38 (105 cm)", "40 (110 cm)"
];

// Female swimsuit sizes (Chest / Hips)
const femaleSizes = [
  "20 (Гради 55 / Колкови 65)", "22 (60 / 70)", "24 (65 / 75)", "26 (70 / 80)",
  "28 (75 / 85)", "30 (80 / 90)", "32 (85 / 95)", "34 (90 / 100)",
  "36 (95 / 105)", "38 (100 / 110)", "40 (105 / 115)"
];

const getStoredCart = () => {
  try {
    const saved = localStorage.getItem("aquaProCart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const TeamShop = () => {
  const { t } = useTranslation();

  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getStoredCart(),
  });

  const queryClient = useQueryClient();
  const [openProduct, setOpenProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const updateCart = (newCart) => {
    localStorage.setItem("aquaProCart", JSON.stringify(newCart));
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  const handleAddToCart = () => {
    if (openProduct.hasSizes && !selectedSize) {
      toast.warning(t("teamShop.toastWarning"));
      return;
    }

    const newItem = {
      ...openProduct,
      size: openProduct.hasSizes ? selectedSize : null,
    };

    const updatedCart = [...cart, newItem];
    updateCart(updatedCart);

    toast.success(t("teamShop.toastAdded"));
    setOpenProduct(null);
    setSelectedSize("");
  };

  return (
    <Row justify="center" className="py-30 relative">
      <Col span={20} style={{ position: "relative" }}>
        {/* Cart Button */}
        <div className="cart-icon-wrapper">
          <Link to="/cart" className="cart-icon-button">
            <ShoppingCartOutlined />
            {cart.length > 0 && (
              <span className="cart-count-badge">{cart.length}</span>
            )}
          </Link>
        </div>

        <div className="shop-section">
          <h1 className="shop-title">{t("teamShop.title")}</h1>
          <p className="shop-text">{t("teamShop.description")}</p>

          {productsLoading && (
            <p className="shop-text">{t("teamShop.loading")}</p>
          )}
          {productsError && (
            <p className="shop-text">{t("teamShop.loadError")}</p>
          )}

          <Row gutter={[24, 24]}>
            {products.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={8}>
                <div
                  className="shop-card"
                  onClick={() => setOpenProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="shop-card-img"
                  />
                  <div className="shop-card-content">
                    <h3 className="shop-name">{product.name}</h3>
                    <p className="shop-about">{product.description}</p>
                    <div className="btn-section flex justify-center items-center">
                      <button
                        className="shop-button"
                        onClick={(e) => {
                          e.stopPropagation();

                          if (product.hasSizes) {
                            setOpenProduct(product);
                          } else {
                            const newItem = { ...product, size: null };
                            const updatedCart = [...cart, newItem];
                            updateCart(updatedCart);
                            toast.success(t("teamShop.toastAdded"));
                          }
                        }}
                      >
                        {t("teamShop.addToCart")}
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <Modal
            open={!!openProduct}
            onCancel={() => {
              setOpenProduct(null);
              setSelectedSize("");
            }}
            footer={null}
            centered
            className="shop-modal"
          >
            {openProduct && (
              <>
                <Carousel autoplay dots className="shop-carousel">
                  {(openProduct.images || [openProduct.image]).map((img, idx) => (
                    <div key={idx}>
                      <img
                        src={img}
                        alt={`${openProduct.name} ${idx + 1}`}
                        className="modal-img"
                      />
                    </div>
                  ))}
                </Carousel>

                <h2 className="modal-name">{openProduct.name}</h2>
                <p className="modal-about">{openProduct.description}</p>

                {openProduct.hasSizes && (
                  <div style={{ marginBottom: "1rem" }}>
                    <Select
                      placeholder={t("teamShop.selectSizePlaceholder")}
                      value={selectedSize || undefined}
                      onChange={(val) => setSelectedSize(val)}
                      style={{ width: 250 }}
                    >
                      {(openProduct.gender === "male"
                        ? maleSizes
                        : openProduct.gender === "female"
                        ? femaleSizes
                        : generalSizes
                      ).map((size) => (
                        <Select.Option key={size} value={size}>
                          {size}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                )}

                <button className="shop-button" onClick={handleAddToCart}>
                  {t("teamShop.addToCart")}
                </button>
              </>
            )}
          </Modal>
        </div>
      </Col>
    </Row>
  );
};

export default TeamShop;
