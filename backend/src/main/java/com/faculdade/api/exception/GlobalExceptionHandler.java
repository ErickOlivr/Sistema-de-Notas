package com.faculdade.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Intercepta erros de validação dos DTOs (@NotBlank, @DecimalMax, etc.)
     * e devolve um JSON indicando exatamente qual campo falhou.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    /**
     * Intercepta os erros de regra de negócio que lançamos nos Services
     * ex: throw new RuntimeException("Estudante já está matriculado!");
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<StandardError> handleRuntimeExceptions(RuntimeException ex) {
        StandardError error = new StandardError(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    /**
     * Classe auxiliar interna (Record ou POJO) para formatar a mensagem de erro
     * de forma padronizada.
     */
    public static class StandardError {
        private Integer status;
        private String message;
        private LocalDateTime timestamp;

        public StandardError(Integer status, String message, LocalDateTime timestamp) {
            this.status = status;
            this.message = message;
            this.timestamp = timestamp;
        }

        // Getters para o Jackson conseguir transformar em JSON
        public Integer getStatus() { return status; }
        public String getMessage() { return message; }
        public LocalDateTime getTimestamp() { return timestamp; }
    }
}