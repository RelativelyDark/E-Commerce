package com.cars24.fullstack.controller;

import com.cars24.fullstack.data.request.ProductRequest;
import com.cars24.fullstack.data.response.ApiResponse;
import com.cars24.fullstack.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // Admin can create a product (POST)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createProduct(@RequestBody ProductRequest request) {
        ApiResponse response = productService.addProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);  // ✅ Wrapped in ResponseEntity
    }

    // Admin can update a product (PUT)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable String id, @RequestBody ProductRequest request) {
        ApiResponse response = productService.updateProduct(id, request);
        return ResponseEntity.ok(response);  // ✅ Wrapped in ResponseEntity
    }

    // Admin can delete a product (DELETE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable String id) {
        ApiResponse response = productService.deleteProduct(id);
        return ResponseEntity.ok(response);
    }

    // Both Admin and Customer can view product details (GET)
    //@PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER', 'ROLE_ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable String id) {
        ApiResponse response = productService.getProductById(id);
        return ResponseEntity.ok(response);
    }

    // Both Admin and Customer can view all products (GET)
//    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER', 'ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllProducts() {
        ApiResponse response = productService.getAllProducts();
        return ResponseEntity.ok(response);
    }

//    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER', 'ROLE_ADMIN')")
    @GetMapping("/{category}")
    public ResponseEntity<ApiResponse> getProductByCategory(@PathVariable String category){
        ApiResponse response = productService.getProductByCategory(category);
        return ResponseEntity.ok(response);
    }


//    @PreAuthorize("hasAnyAuthority('ROLE_CUSTOMER', 'ROLE_ADMIN')")
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse> getProductCategoryList(){
        ApiResponse response = productService.getProductCategoryList();
        return ResponseEntity.ok(response);
    }


}
