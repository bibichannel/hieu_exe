package com.v2p.swp391.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class OpenAPIConfig {

    @Value("${app.openapi.server}")
    private String serverUrl;


    @Bean
    public OpenAPI myOpenAPI() {
        Server server = new Server();
        server.setUrl(serverUrl);

        Info info = new Info()
                .title("Backend API")
                .version("1.0.0")
                .description("This API exposes endpoints to manage demo.");

        return new OpenAPI().info(info).servers(List.of(server))
                .addSecurityItem(new SecurityRequirement().
                        addList("Bearer_Authentication"))
                .components(new Components().addSecuritySchemes
                        ("Bearer_Authentication", createAPIKeyScheme()));
    }

    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme().type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer");
    }
}