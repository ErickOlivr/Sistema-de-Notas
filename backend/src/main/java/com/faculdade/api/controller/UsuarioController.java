package com.faculdade.api.controller;

import com.faculdade.api.model.Usuario;
import com.faculdade.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> cadastrarUsuario(@RequestBody Usuario usuario) {
        usuarioRepository.salvarUsuarioNativo(
                usuario.getCpf(),
                usuario.getNome(),
                usuario.getLogin(),
                usuario.getSenha()
        );
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> deletar(@PathVariable String cpf) {
        if (!usuarioRepository.existsById(cpf)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(cpf);
        return ResponseEntity.noContent().build();
    }
}