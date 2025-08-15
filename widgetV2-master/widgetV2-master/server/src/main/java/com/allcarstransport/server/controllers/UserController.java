package com.allcarstransport.server.controllers;

import com.allcarstransport.server.dtos.CreateResponse;
import com.allcarstransport.server.dtos.user.ClientShortInfo;
import com.allcarstransport.server.dtos.user.ForgotPasswordRequest;
import com.allcarstransport.server.dtos.user.LoginRequest;
import com.allcarstransport.server.dtos.user.LoginResponse;
import com.allcarstransport.server.dtos.user.NotificationConfigDTO;
import com.allcarstransport.server.dtos.user.RegisterUserRequest;
import com.allcarstransport.server.dtos.user.ResetPasswordRequest;
import com.allcarstransport.server.services.UserService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {

        return new ResponseEntity<>(new LoginResponse(userService.generateToken(request)), HttpStatus.OK);
    }

    @GetMapping("/check-domain")
    public ResponseEntity<Void> checkDomain() {

        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<CreateResponse<ObjectId>> register(@Valid @RequestBody RegisterUserRequest request) {
        return ResponseEntity.ok(new CreateResponse<>(userService.registerUser(request)));
    }

    @GetMapping("/info")
    public ResponseEntity<ClientShortInfo> info(@RequestParam String domain) {
        ClientShortInfo shortInfoByDomain = userService.getShortInfoByDomain(domain);

        return shortInfoByDomain != null ?
                ResponseEntity.ok(shortInfoByDomain) :
                ResponseEntity.notFound().build();

    }

    @PostMapping("/forgot/password")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        userService.forgotPassword(request);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset/password")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ResetPasswordRequest request) {

        userService.resetPassword(request);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/reset/password/check")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestParam UUID token) {

        userService.checkResetToken(token);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/notification/config")
    public ResponseEntity<NotificationConfigDTO> getNotificationConfig() {

        return ResponseEntity.ok(userService.getNotificationConfig());
    }

    @PostMapping("/notification/config")
    public ResponseEntity<Void> setNotificationConfig(@Valid @RequestBody NotificationConfigDTO request) {

        userService.setNotificationConfig(request);

        return ResponseEntity.ok().build();
    }

}
