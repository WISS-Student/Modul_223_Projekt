package ch.wiss.m223_starter.service;

import ch.wiss.m223_starter.model.Post;
import ch.wiss.m223_starter.model.User;
import ch.wiss.m223_starter.repository.PostRepository;
import ch.wiss.m223_starter.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public Post createPost(String title, String content, String imageUrl) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Post post = Post.builder()
            .title(title)
            .content(content)
            .imageUrl(imageUrl)
            .user(user)
            .build();
        
        return postRepository.save(post);
    }
    
    @Transactional(readOnly = true)
    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }
    
    @Transactional(readOnly = true)
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }
    
    @Transactional
    public Post updatePost(Long id, String title, String content, String imageUrl) {
        Post post = postRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        
        post.setTitle(title);
        post.setContent(content);
        post.setImageUrl(imageUrl);
        
        return postRepository.save(post);
    }
    
    @Transactional
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
    
    @Transactional(readOnly = true)
    public List<Post> searchPosts(String keyword) {
        return postRepository.findByTitleContainingOrContentContaining(keyword, keyword);
    }
}