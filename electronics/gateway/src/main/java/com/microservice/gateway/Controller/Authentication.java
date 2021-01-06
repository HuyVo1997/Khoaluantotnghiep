package com.microservice.gateway.Controller;

import com.microservice.gateway.Models.AuthenticationRequest;
import com.microservice.gateway.Models.AuthenticationResponse;
import com.microservice.gateway.Models.FaceBookLoginRequest;
import com.microservice.gateway.Models.User;
import com.microservice.gateway.Repository.UserRepository;
import com.microservice.gateway.Service.MyUserDetailsService;
import com.microservice.gateway.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.nio.file.attribute.UserPrincipal;
import java.util.UUID;

@RestController
@CrossOrigin
public class Authentication {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping(value = "/create")
    public void createUser(@RequestBody AuthenticationRequest authenticationRequest){
        String password = bCryptPasswordEncoder.encode(authenticationRequest.getPassword());
        User user = new User(UUID.randomUUID().toString(), authenticationRequest.getUsername(), password);
        userRepository.save(user);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse httpServletResponse) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                             authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));

    }

    @PostMapping(value="/signin/facebook")
    public ResponseEntity<?> createFaceBookToken(@RequestBody FaceBookLoginRequest faceBookLoginRequest) throws Exception{

        User user = this.userRepository.findUserByEmail(faceBookLoginRequest.getEmail());

        if(user == null){

            String password = bCryptPasswordEncoder.encode(faceBookLoginRequest.getUserID());

            User newUser = new User(UUID.randomUUID().toString(),
                    faceBookLoginRequest.getEmail(),password);

            this.userRepository.save(newUser);
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(faceBookLoginRequest.getEmail(),
                            faceBookLoginRequest.getUserID()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(faceBookLoginRequest.getEmail());

        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

}
