# Add to Cart Business Logic Flow

This document outlines the business logic, sequential flow, and decision-making process for the "Add to Cart" functionality in the Technotree E-commerce backend.

## 1. Overview of the Add to Cart Process

The "Add to Cart" operation takes a `userId` and a `productId` from the client request. Its primary goal is to safely add a product to the user's cart while ensuring:
- The product exists.
- The product has sufficient stock available.
- The user's cart is created if it does not yet exist.
- If the product already exists in the cart, its quantity is incremented safely.
- The overall cart total amount is recalculated and updated.

---

## 2. Sequence Diagram

This sequence diagram illustrates the step-by-step interactions between the Client, Controller, Service, and Repository layers.

```mermaid
sequenceDiagram
    participant Client
    participant Controller as Cart Controller
    participant Service as Cart Service
    participant ProdRepo as Product Repository
    participant CartRepo as Cart Repository
    participant ItemRepo as CartItem Repository

    Client->>Controller: POST /api/v1/carts/add {userId, productId}
    Controller->>Service: addToCartService(userId, productId)
    
    %% Product Validation
    Service->>ProdRepo: getProductRepository(productId)
    ProdRepo-->>Service: Product Details
    alt Product Not Found
        Service-->>Controller: "Product not found!"
    else Stock <= 0
        Service-->>Controller: "Product is out of stock!"
    end

    %% Cart Validation / Creation
    Service->>CartRepo: getCartRepository(userId)
    CartRepo-->>Service: User's Cart
    alt Cart Not Found
        Service->>CartRepo: createCartRepository(userId)
        CartRepo-->>Service: New Cart
    end

    %% Cart Item Handling
    Service->>ItemRepo: getCartItemRepository(cart.id, productId)
    ItemRepo-->>Service: Cart Item (if exists)
    
    alt Item Exists in Cart
        Service->>Service: Check if newQuantity > stock
        alt Exceeds Stock
            Service-->>Controller: "Cannot add more..."
        else Sufficient Stock
            Service->>ItemRepo: updateCartItemQuantityRepository(...)
        end
    else Item Not in Cart
        Service->>ItemRepo: createCartItemRepository(...)
    end

    %% Recalculate Total
    Service->>Service: calculateTotalAmountService(cart.id)
    Service->>ItemRepo: getCartItemsRepository(cartId)
    ItemRepo-->>Service: All Items in Cart
    Service->>CartRepo: updateCartTotalAmountRepository(cart.id, totalAmount)

    Service-->>Controller: Success (Implicit or explicit result)
    Controller-->>Client: 200 OK - "Product added to cart successfully"
```

---

## 3. Business Logic Flowchart

The flowchart below focuses strictly on the logical decision tree the `Cart Service` follows to process an "Add to Cart" request.

```mermaid
flowchart TD
    Start([Start: Add to Cart]) --> GetProduct(Fetch Product by ID)
    
    GetProduct --> CheckProduct{Product Exists?}
    CheckProduct -- No --> ReturnNotFound([Return: Product not found!])
    CheckProduct -- Yes --> CheckStock{Stock > 0?}
    
    CheckStock -- No --> ReturnOutOfStock([Return: Product is out of stock!])
    CheckStock -- Yes --> GetCart(Fetch Cart by User ID)
    
    GetCart --> CheckCart{Cart Exists?}
    CheckCart -- No --> CreateCart(Create new Cart for User)
    CreateCart --> GetCartItem
    CheckCart -- Yes --> GetCartItem(Check if Product is already in Cart)
    
    GetCartItem --> CheckItemExist{Item in Cart?}
    
    %% If Item Already Exists
    CheckItemExist -- Yes --> IncQuantity(Increment Item Quantity)
    IncQuantity --> CheckLimit{New Qty > Stock?}
    CheckLimit -- Yes --> ReturnLimit([Return: Cannot add more due to stock])
    CheckLimit -- No --> UpdateItem(Update CartItem Quantity & Price)
    
    %% If Item is New
    CheckItemExist -- No --> CreateItem(Create new CartItem with Qty 1)
    
    %% Finalizing
    UpdateItem --> CalcTotal(Recalculate Cart Total Amount)
    CreateItem --> CalcTotal(Recalculate Cart Total Amount)
    
    CalcTotal --> UpdateCart(Update Cart Total in DB)
    UpdateCart --> End([End: Success])
```

---

## 4. Detailed Component Breakdown

### Controller Level (`cart.controller.js`)
The `addToCartController` expects a `POST` body containing `userId` and `productId`. It acts as the HTTP interface, delegating the complex validation and database interactions entirely to the service layer. If the service is successful, it responds with a standard `200 OK` status.

### Service Level (`cart.service.js`)
The `addToCartService` is the heartbeat of this functionality.
1. **Product Validation**: Ensures the product exists and has a stock greater than `0`.
2. **Cart State Handling**: Checks if the user already has a pending cart. If they do not, it provisions a new `Cart` record via the repository.
3. **Upserting Cart Items**: 
   - Uses `getCartItemRepository` to see if the item is already present.
   - If present, it checks if incrementing the quantity by `1` would exceed the maximum available `stock` of the product. If it passes, it updates the record.
   - If not present, it inserts a new `CartItem` record with a quantity of `1` and locks in the current `product.price`.
4. **Recalculating Totals**: Invokes a helper service `calculateTotalAmountService` which retrieves all items for the specific cart, loops through them summing `(price * quantity)`, and finally updates the main `Cart` parent record with the `totalAmount`.

### Repository Level
The repositories simply abstract Sequelize database operations:
- **Product**: Finds product details and stock information.
- **Cart**: Finds a cart by user, creates a new cart, and updates the cart's overall total.
- **CartItem**: Finds a specific product in a cart, fetches all products in a cart, updates quantities, or creates new item linkages.
