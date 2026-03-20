package ch.wiss.m223_starter.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.wiss.m223_starter.model.Post;
import ch.wiss.m223_starter.model.User;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    List<Post> findAllByOrderByCreatedAtDesc();
    
    List<Post> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<Post> findByTitleContainingOrContentContaining(String titleKeyword, String contentKeyword);
        
    Optional<Post> findByIdAndUser(Long id, User user);
}