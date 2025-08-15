package com.allcarstransport.server.security;

import com.allcarstransport.server.persistance.entities.User;
import com.allcarstransport.server.persistance.repositories.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

        return CurrentUser.build(user);
    }

    public UserDetails loadUserByIdAndDomain(ObjectId id, String domain) throws UsernameNotFoundException {
        User user = userRepository.findByIdAndDomain(id, domain)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User Not Found with id and domain: " + id.toHexString() + ", " + domain
                ));

        return CurrentUser.build(user, List.of("ROLE_WIDGET"));
    }

}
