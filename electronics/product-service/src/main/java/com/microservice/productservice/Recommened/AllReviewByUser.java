package com.microservice.productservice.Recommened;

import com.microservice.productservice.DTO.RecommendProductDTO;
import com.microservice.productservice.Model.Product;
import com.microservice.productservice.Model.Review;
import com.microservice.productservice.Model.User;
import com.microservice.productservice.Repository.ProductRepository;
import com.microservice.productservice.Repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.*;

@RestController
@AllArgsConstructor
public class AllReviewByUser {

    @Autowired
    private final ReviewRepository reviewRepository;

    @Autowired
    private final ProductRepository productRepository;

    private static Map<Product, Map<Product, Double>> diff = new HashMap<>();
    private static Map<Product, Map<Product, Integer>> freq = new HashMap<>();
    private static Map<User, HashMap<Product, Double>> inputData;
    private static Map<User, HashMap<Product, Double>> outputData = new HashMap<>();

    @GetMapping("/recommend/{email}")
    public List<RecommendProductDTO> slopeOne(@PathVariable("email") String email) {
        HashMap<Product, Double> getProductByUser = new HashMap<>();
        List<RecommendProductDTO> recommendProductDTOList = new ArrayList<>();
        inputData = inititalizeData();
        buildDifferencesMatrix(inputData);
        predict(inputData);
        for (User user : outputData.keySet()) {
            User newUser = new User(email);
            if(user.equals(newUser)){
                for (Product j : outputData.get(user).keySet()) {
                    getProductByUser.put(j, outputData.get(user).get(j).doubleValue());

                    RecommendProductDTO recommendProductDTO = new RecommendProductDTO(j, outputData.get(user).get(j).doubleValue());

                    recommendProductDTOList.add(recommendProductDTO);
                }
            }
        }
        return recommendProductDTOList;
    }

    public Map<User, HashMap<Product,Double>> inititalizeData(){
        Map<User, HashMap<Product,Double>> data = new HashMap<>();

        List<Product> productList = this.productRepository.findAll();

        List<Review> getAllReview = this.reviewRepository.findAll();

        List<String> email = new ArrayList<>();
        for (int k =  0 ; k < getAllReview.size() ; k++){
            if(!email.contains(getAllReview.get(k).getEmail())){
                email.add(getAllReview.get(k).getEmail());
            }
        }
        HashMap<Product,Double> newUser;
        for(int i = 0 ; i < email.size() ; i++){
            newUser = new HashMap<Product,Double>();

            List<Review> reviewListByUser = new ArrayList<>();

            for(int j = 0 ; j < productList.size() ; j++){
                if(this.reviewRepository
                        .existsReviewsByProductIDAndEmail(productList.get(j).getProductID(), email.get(i))){

                    List<Review> reviewList = this.reviewRepository
                            .getReviewsByProductIDAndEmail(productList.get(j).getProductID(),email.get(i));

                    for(int l = 0 ; l < reviewList.size() ; l++){
                        reviewListByUser.add(reviewList.get(l));
                    }
                }
            }

            for(Review review : reviewListByUser){
                newUser.put(this.productRepository.findById(review.getProductID()).get()
                        , Double.parseDouble(review.getStar().toString()));
            }

            data.put(new User(email.get(i)), newUser);
        }
        return data;
    }

    private void buildDifferencesMatrix(Map<User, HashMap<Product, Double>> data) {
        for (HashMap<Product, Double> user : data.values()) {
            for (Map.Entry<Product, Double> e : user.entrySet()) {
                if (!diff.containsKey(e.getKey())) {
                    diff.put(e.getKey(), new HashMap<Product, Double>());
                    freq.put(e.getKey(), new HashMap<Product, Integer>());
                }
                for (Map.Entry<Product, Double> e2 : user.entrySet()) {
                    int oldCount = 0;
                    if (freq.get(e.getKey()).containsKey(e2.getKey())) {
                        oldCount = freq.get(e.getKey()).get(e2.getKey()).intValue();
                    }
                    double oldDiff = 0.0;
                    if (diff.get(e.getKey()).containsKey(e2.getKey())) {
                        oldDiff = diff.get(e.getKey()).get(e2.getKey()).doubleValue();
                    }
                    double observedDiff = e.getValue() - e2.getValue();
                    freq.get(e.getKey()).put(e2.getKey(), oldCount + 1);
                    diff.get(e.getKey()).put(e2.getKey(), oldDiff + observedDiff);
                }
            }
        }
        for (Product j : diff.keySet()) {
            for (Product i : diff.get(j).keySet()) {
                double oldValue = diff.get(j).get(i).doubleValue();
                int count = freq.get(j).get(i).intValue();
                diff.get(j).put(i, oldValue / count);
            }
        }
    }

    private void predict(Map<User, HashMap<Product, Double>> data) {
        HashMap<Product, Double> uPred = new HashMap<Product, Double>();
        HashMap<Product, Integer> uFreq = new HashMap<Product, Integer>();
        for (Product j : diff.keySet()) {
            uFreq.put(j, 0);
            uPred.put(j, 0.0);
        }
        for (Map.Entry<User, HashMap<Product, Double>> e : data.entrySet()) {
            for (Product j : e.getValue().keySet()) {
                for (Product k : diff.keySet()) {
                    try {
                        double predictedValue = diff.get(k).get(j).doubleValue() + e.getValue().get(j).doubleValue();
                        double finalValue = predictedValue * freq.get(k).get(j).intValue();
                        uPred.put(k, uPred.get(k) + finalValue);
                        uFreq.put(k, uFreq.get(k) + freq.get(k).get(j).intValue());
                    } catch (NullPointerException e1) {
                    }
                }
            }
            HashMap<Product, Double> clean = new HashMap<Product, Double>();
            for (Product j : uPred.keySet()) {
                if (uFreq.get(j) > 0) {
                    clean.put(j, uPred.get(j).doubleValue() / uFreq.get(j).intValue());
                }
            }
            for (Product j : this.productRepository.findAll()) {
                if (e.getValue().containsKey(j)) {
                    clean.put(j, e.getValue().get(j));
                } else if (!clean.containsKey(j)) {
                    clean.put(j, -1.0);
                }
            }
            outputData.put(e.getKey(), clean);
        }
    }
}
