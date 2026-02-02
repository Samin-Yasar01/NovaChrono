export const Api_path = {
    PRODUCTS: {
        LIST: "/products",
        CREATE: "/products",
        GET_ONE: (id: string) => `/products/${id}`,
        UPDATE: (id: string) => `/products/${id}`,
        DELETE: (id: string) => `/products/${id}`,
        IMAGES: {
            LIST: (productId: string) => `/products/${productId}/images`,
            CREATE: (productId: string) => `/products/${productId}/images`,
            UPDATE: (imageId: string) => `/products/images/${imageId}`,
            DELETE: (imageId: string) => `/products/images/${imageId}`,
        },
    },
    ORDERS: {
        LIST: "/orders",
        CREATE: "/orders",
        GET_ONE: (id: string) => `/orders/${id}`,
        UPDATE: (id: string) => `/orders/${id}`,
        // DELETE: (id: string) => `/orders/${id}`,
    },
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
    },
    CATEGORIES: {
        LIST: "/categories",
        CREATE: "/categories",
        GET_ONE: (id: string) => `/categories/${id}`,
        UPDATE: (id: string) => `/categories/${id}`,
        DELETE: (id: string) => `/categories/${id}`,
    },
    BRANDS: {
        LIST: "/brands",
        CREATE: "/brands",
        GET_ONE: (id: string) => `/brands/${id}`,
        UPDATE: (id: string) => `/brands/${id}`,
        DELETE: (id: string) => `/brands/${id}`,
    },
    INVENTORY: {
        LIST: "/inventory",
        GET_BY_PRODUCT: (productId: string) => `/inventory/product/${productId}`,
    }
};
