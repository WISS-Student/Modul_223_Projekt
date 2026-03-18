package ch.wiss.m223_starter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.wiss.m223_starter.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    List<Comment> findByPostIdOrderByCreatedAtDesc(Long postId);
    
    List<Comment> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<Comment> findByPostIdAndUserId(Long postId, Long userId);
}