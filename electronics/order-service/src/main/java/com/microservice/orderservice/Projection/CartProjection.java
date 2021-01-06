package com.microservice.orderservice.Projection;

import com.microservice.orderservice.Events.Cart.CartCreatedEvent;
import com.microservice.orderservice.Events.Cart.CartDeletedEvent;
import com.microservice.orderservice.Events.Cart.QuantityUpdatedEvent;
import com.microservice.orderservice.Models.Cart;
import com.microservice.orderservice.Models.CartProduct;
import com.microservice.orderservice.Query.Cart.GetProductFromCart;
import com.microservice.orderservice.Repository.CartRepository;
import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Service.Product.ProductQueryService;
import lombok.RequiredArgsConstructor;
import org.axonframework.eventhandling.EventHandler;
import org.axonframework.queryhandling.QueryGateway;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class CartProjection {

    @Autowired
    private final CartRepository cartRepository;

    @Autowired
    private final ProductQueryService productQueryService;

    @EventHandler
    public void handle(CartCreatedEvent event){
        List<Product> products = event.getProducts();

        if(products.size() > 0){
            for(int i = 0 ; i < products.size() ; i++){
                Cart ProductInCart = cartRepository.findCartByProductIDAndUser(products.get(i).getProductID(), event.getUser());
                Cart cart;
                if(ProductInCart != null){
                    int quantity = 0;
                    quantity = ProductInCart.getQuantity() + products.get(i).getQuantity();
                    cart = new Cart(
                            ProductInCart.getCartID(),
                            products.get(i).getPrice(),
                            products.get(i).getProductID(),
                            quantity,
                            event.getUser()
                    );
                }
                else {
                    cart = new Cart(
                            event.getCartID(),
                            products.get(i).getPrice(),
                            products.get(i).getProductID(),
                            products.get(i).getQuantity(),
                            event.getUser()
                    );
                }
                this.cartRepository.save(cart);
            }
        }
    }

    @EventHandler
    public void handle(QuantityUpdatedEvent event){
        Cart cart = this.cartRepository.findById(event.getCartID()).get();
        cart.setQuantity(event.getQuantity());
        this.cartRepository.save(cart);
    }


    @EventHandler
    public void handle(CartDeletedEvent event){
        Cart cart = this.cartRepository.findById(event.getCartID()).get();
        this.cartRepository.delete(cart);
    }

    @QueryHandler
    public List<CartProduct> handle(GetProductFromCart query){
        List<Cart> cartList = this.cartRepository.findCartByUser(query.getUser());
        List<CartProduct> cartProducts = new ArrayList<>();
        if(cartList.size() > 0){
            for(int i = 0 ; i < cartList.size(); i++){
                Product product = this.productQueryService.getProductByID(cartList.get(i).getProductID()).join();
                if(product != null){
                    CartProduct cartProduct =
                            new CartProduct(cartList.get(i).getCartID(),
                                            product.getProductID(),
                                            product.getName(),
                                            cartList.get(i).getQuantity(),
                                            cartList.get(i).getPrice(),
                                            product.getImages());

                    cartProducts.add(cartProduct);
                }
            }
        }
        return cartProducts;
    }

}
