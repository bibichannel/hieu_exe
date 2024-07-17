

INSERT INTO users (full_name, phone_number, email, password, role, is_active, email_verified, is_setup, can_post, social_provider, provider_id, created_at, updated_at, image_url)
VALUES
('Employer4', '123456789', 'employer4@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, TRUE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer5', '987654321', 'employer5@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer6', '654321987', 'employer6@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer7', '123456789', 'employer7@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, TRUE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer8', '987654321', 'employer8@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer9', '654321987', 'employer9@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer10', '123456789', 'employer10@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, TRUE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer11', '987654321', 'employer11@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer12', '654321987', 'employer12@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer13', '123456789', 'employer13@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, TRUE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer14', '987654321', 'employer14@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer15', '654321987', 'employer15@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer16', '123456789', 'employer16@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, TRUE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer17', '987654321', 'employer17@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer18', '654321987', 'employer18@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer19', '123456789', 'employer19@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, TRUE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Employer20', '987654321', 'employer20@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'EMPLOYER', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg');


-- Thêm dữ liệu cho 20 người dùng có vai trò là CANDIDATE
INSERT INTO users (full_name, phone_number, email, password, role, is_active, email_verified, is_setup, can_post, social_provider, provider_id, created_at, updated_at, image_url)
VALUES
('Candidate4', '123456789', 'candidate4@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate5', '987654321', 'candidate5@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate6', '654321987', 'candidate6@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate7', '123456789', 'candidate7@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate8', '987654321', 'candidate8@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate9', '654321987', 'candidate9@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate10', '123456789', 'candidate10@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate11', '987654321', 'candidate11@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate12', '654321987', 'candidate12@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate13', '123456789', 'candidate13@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate14', '987654321', 'candidate14@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate15', '654321987', 'candidate15@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate16', '123456789', 'candidate16@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate17', '987654321', 'candidate17@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate18', '654321987', 'candidate18@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate19', '123456789', 'candidate19@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg'),
('Candidate20', '987654321', 'candidate20@example.com', '$2a$10$c1tC/5zOI7/sqeWTV9ctFuNLadxvhZ9hPxPHW2/K7r3RAUO49EryW', 'CANDIDATE', TRUE, TRUE, TRUE, FALSE, 'DATABASE', NULL, NOW(), NOW(), 'default.jpg');
