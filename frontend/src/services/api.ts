import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export const getNosqlPrefix = (): string => {
  return localStorage.getItem('database_mode') === 'mongodb' ? '/nosql' : '';
};

api.interceptors.request.use((config) => {
  const prefix = getNosqlPrefix();
  const rotasNoSqlAtivas = ['/estudantes', '/matriculas'];
  
  if (prefix && config.url) {
    const deveMudarParaMongo = rotasNoSqlAtivas.some(rota => config.url?.includes(rota));
    
    if (deveMudarParaMongo && !config.url.startsWith(prefix)) {
      config.url = `${prefix}${config.url}`;
    }
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;