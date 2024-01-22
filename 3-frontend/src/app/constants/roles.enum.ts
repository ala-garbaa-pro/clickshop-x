export enum UserRoleEnum {
    /***
     * Super admin role
     *    - This role typically has full control over the application and can manage all aspects of the e-commerce platform.
     *    - They can add, edit, and delete products, and categories.
     *    - They can manage user accounts, including creating, updating, and deactivating accounts.
     * ---
     *    CRUD: ProductCategory, Product, State, Country
     *    CRUD: User {StoreManager, Customer}, Role
     * ---
     */
    SUPER_ADMIN_ROLE = "SUPER_ADMIN_ROLE",

    /**
     * Store Manager Role
     * - They can add, edit, and delete products within their assigned categories.
     * - They can view and process orders for the products they manage.
     */
    STORE_MANAGER_ROLE = "STORE_MANAGER_ROLE",

    /**
     * Customer Role
     * - This is the default role for registered users of the e-commerce platform.
     * - Customers can browse products, add items to their cart, place orders, view their order history, and manage their account settings.
     */

    CUSTOMER_ROLE = "CUSTOMER_ROLE"


}
