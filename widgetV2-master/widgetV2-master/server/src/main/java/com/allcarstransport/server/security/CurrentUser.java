package com.allcarstransport.server.security;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.allcarstransport.server.persistance.entities.User;
import com.allcarstransport.server.config.Role;
import org.bson.types.ObjectId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class CurrentUser implements UserDetails {
    private static final long serialVersionUID = 1L;

    private final ObjectId id;

    private final String email;

    @JsonIgnore
    private final String password;

    private final Collection<? extends GrantedAuthority> authorities;

    public CurrentUser(ObjectId id, String email, String password,
                       Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static CurrentUser build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        return new CurrentUser(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorities);
    }

    public static CurrentUser build(User user, List<String> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                .filter(Objects::nonNull)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        return new CurrentUser(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public ObjectId getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public boolean isAdmin() {
        return getAuthorities().stream().anyMatch(a -> Role.ROLE_ADMIN.name().equals(a.getAuthority()));
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        CurrentUser user = (CurrentUser) o;
        return Objects.equals(id, user.id);
    }

}

