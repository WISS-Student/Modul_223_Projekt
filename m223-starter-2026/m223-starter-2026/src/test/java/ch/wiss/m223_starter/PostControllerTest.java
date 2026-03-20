package ch.wiss.m223_starter;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

import ch.wiss.m223_starter.controller.PostController;
import ch.wiss.m223_starter.dto.PostRequest;
import ch.wiss.m223_starter.model.Post;
import ch.wiss.m223_starter.repository.RoleRepository;
import ch.wiss.m223_starter.service.PostService;

@WebMvcTest(PostController.class)
@AutoConfigureMockMvc(addFilters = false)
class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PostService postService;

    @MockitoBean
    private RoleRepository roleRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(authorities = "USER")
    void createPost_returnsOkAndBody() throws Exception {
        PostRequest request = new PostRequest();
        request.setTitle("Test title");
        request.setContent("Test content");
        request.setImageUrl("http://example.com/image.png");

        Post savedPost = new Post();
        savedPost.setId(1L);
        savedPost.setTitle("Test title");
        savedPost.setContent("Test content");
        savedPost.setImageUrl("http://example.com/image.png");

        when(postService.createPost(
                eq("Test title"),
                eq("Test content"),
                eq("http://example.com/image.png")
        )).thenReturn(savedPost);

        mockMvc.perform(post("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Test title"))
                .andExpect(jsonPath("$.content").value("Test content"))
                .andExpect(jsonPath("$.imageUrl").value("http://example.com/image.png"));
    }

    @Test
    void getPostById_notFound() throws Exception {
        Long id = 999L;
        when(postService.getPostById(id)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/posts/{id}", id))
                .andExpect(status().isNotFound());
    }
}
