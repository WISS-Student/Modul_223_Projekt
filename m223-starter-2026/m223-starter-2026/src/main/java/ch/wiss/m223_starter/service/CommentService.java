package ch.wiss.m223_starter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.wiss.m223_starter.model.Comment;
import ch.wiss.m223_starter.model.Post;
import ch.wiss.m223_starter.model.User;
import ch.wiss.m223_starter.repository.CommentRepository;
import ch.wiss.m223_starter.repository.PostRepository;
import ch.wiss.m223_starter.repository.UserRepository;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public Comment createComment(Long postId, String content) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        
        Comment comment = Comment.builder()
            .content(content)
            .post(post)
            .user(user)
            .build();
        
        return commentRepository.save(comment);
    }
    
    @Transactional(readOnly = true)
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
    }
    
    @Transactional
    public Comment updateComment(Long id, String content) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        comment.setContent(content);
        return commentRepository.save(comment);
    }
    
    @Transactional
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}