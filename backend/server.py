from http.server import ThreadingHTTPServer
from api.endpoints import MyHandler

class MeuServidor(ThreadingHTTPServer):
    allow_reuse_address = True  # ← libera a porta imediatamente ao reiniciar

def main():
    server_address = ('', 8000)
    httpd = MeuServidor(server_address, MyHandler)
    print('Servidor rodando em http://localhost:8000')
    httpd.serve_forever()

if __name__ == "__main__":
    main()