package ch.wiss.m223_starter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import ch.wiss.m223_starter.model.ERole;
import ch.wiss.m223_starter.model.Role;
import ch.wiss.m223_starter.repository.RoleRepository;

@Controller
@SpringBootApplication
public class M223StarterApplication implements CommandLineRunner{

	@Autowired
	private RoleRepository roleRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(M223StarterApplication.class, args);
	}

	@GetMapping("/public")
	public ResponseEntity<String> getPublic(){
		return ResponseEntity.ok().body("Hello World");
	}

	@GetMapping("/private")
	public ResponseEntity<String> getPrivate(){
		return ResponseEntity.ok().body("Geheim");
	}

	@Override
	public void run(String... args) throws Exception {
		if (roleRepository.count() == 0) { // rollen erstellen, wenn noch nicht vorhanden
			roleRepository.save(new Role(ERole.ROLE_USER));
			roleRepository.save(new Role(ERole.ROLE_ADMIN));			
		}
	}

}
