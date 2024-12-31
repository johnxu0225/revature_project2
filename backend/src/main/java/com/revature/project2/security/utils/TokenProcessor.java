package com.revature.project2.security.utils;

import com.revature.project2.models.DTOs.TokenDto;
import com.revature.project2.security.authentication.JWTAuthObj;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class TokenProcessor {
    private static final String PRIVATE_KEY = "your-hardcoded-private-key-must-be-more-than-256-bits";
    SecretKey privateKey = Keys.hmacShaKeyFor(PRIVATE_KEY.getBytes(StandardCharsets.UTF_8));
    // this private key is generated at runtime
   // private static SecretKey privateKey = Jwts.SIG.HS256.key().build();
    private final int TOKEN_EXP_SEC = 86400;

    public TokenDto generateToken(Authentication authObj) {
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.toInstant().plusSeconds(TOKEN_EXP_SEC).toEpochMilli());
        String authorities = authObj.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
        String token =  Jwts.builder()
                        .subject(authObj.getName())
                        .claim("authorities",authorities)
                        .signWith(privateKey)
                        .issuedAt(currentDate)
                        .expiration(expirationDate)
                        .compact();
        return new TokenDto(token);
    }

    public Authentication getAuthObjFromToken(String token)   {
        try {
            // extracting payload from the token
             var payload = Jwts.parser()
                                .verifyWith(privateKey)
                                .build()
                                .parseSignedClaims(token)
                                .getPayload();
             // converting payload to map
            Map<String, String> map = payload.entrySet()
                    .stream()
                    .filter(e->(e.getValue() instanceof String))
                    .collect(
                            Collectors.toMap(e->(String)e.getKey(), e->(String)e.getValue())
                    );
            // constructing Authentication object
            var authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(map.get("authorities"));
            return new JWTAuthObj(map.get("sub"),true, authorities);
        } catch (JwtException e){
            return null;
        }
    }



}
