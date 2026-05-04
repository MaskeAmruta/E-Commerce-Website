import { useFetcher } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api";

// ✅ Common Headers (with token)
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};

// ✅ Common response handler (prevents crash)
const handleResponse = async (res) => {
    if (!res.ok) {
        const text = await res.text(); // avoid JSON crash
        throw new Error(text || "Request failed");
    }

    // If no content (204), return null
    if (res.status === 204) return null;

    return res.json();
};

export const API = {

    // ================= ADMIN PRODUCT APIs ================= //

    getAllProductForAdmin: async () => {
        const res = await fetch(`${BASE_URL}/admin/products`, {
            headers: getAuthHeaders()
        });
        return handleResponse(res);
    },

    addProduct: async (product) => {
        const res = await fetch(`${BASE_URL}/admin/product`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(product)
        });
        return handleResponse(res);
    },

    updateProduct: async (id, product) => {
        const res = await fetch(`${BASE_URL}/admin/product/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(product)
        });
        return handleResponse(res);
    },

    deleteProduct: async (id) => {
        const res = await fetch(`${BASE_URL}/admin/product/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });
        return handleResponse(res);
    },


    // ================= ADMIN ORDER APIs ================= //

    getAllOrders: async () => {
        const res = await fetch(`${BASE_URL}/admin/orders`, {
            headers: getAuthHeaders()
        });
        return handleResponse(res);
    },

    updateOrderStatus: async (orderId, status) => {
        const res = await fetch(
            `${BASE_URL}/admin/orders/${orderId}?status=${status}`,
            {
                method: "PUT",
                headers: getAuthHeaders()
            }
        );
        return handleResponse(res);
    },


    // ================= USER APIs ================= //

    // Public
    getProducts: async () => {
        const res = await fetch(`${BASE_URL}/products`);
        return handleResponse(res);
    },

    // Protected (needs token)
    addToCart: async (userId, productId, quantity) => {
        const res = await fetch(
            `${BASE_URL}/cart/add?userId=${userId}&productId=${productId}&quentity=${quantity}`,
            {
                method: "POST",
                headers: getAuthHeaders()
            }
        );
        return handleResponse(res);
    },

    getCart: async (userId) => {
        const res = await fetch(`${BASE_URL}/cart/${userId}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(res);
    },

    placeOrder: async (userId) => {
        const res = await fetch(
            `${BASE_URL}/orders/place?userId=${userId}`,
            {
                method: "POST",
                headers: getAuthHeaders()
            }
        );
        return handleResponse(res);
    },

    removeItem: async (itemId) => {
        const res = await fetch(`${BASE_URL}/cart/${itemId}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });
        return handleResponse(res);
    }
};