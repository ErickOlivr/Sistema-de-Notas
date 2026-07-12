// src/services/api.ts
import axios from 'axios';

// Cria uma instância do axios pré-configurada
const api = axios.create({
    // Aponta para a porta onde o seu Spring Boot (Tomcat) está rodando
    baseURL: 'http://localhost:8080/api',
});

export default api;