# Desafio-The.X-Studios

# Desafio
A idéia é construir um serviço WEB que receba um modelo em HTML do certificado e os dados do aluno e gerar um arquivo PDF desse certificado.

# Passo a passo
  Criar repositório no github para o projeto.
  Criar um arquivo HTML como template do certificado usando o padrão do Handlebars. As informações dinâmicas como nome do curso, data e nome do aluno serão substituídas no momento da geração do PDF. O Handlebars usa {{input}} como padrão para essa marcação.
  Criar um serviço em node usando Expressjs ou Fastify. Pode usar algum outro Framework se preferir.
  3.1. Criar uma rota (endpoint) que responda no endereço /certificado com o método POST do http(s).
  3.2. Criar um serviço que receba os parâmetros para a impressão do Certificado, o template HTML e devolva o arquivo gerado. Pode utilizar libs como o Handlebars que "compila" o template gerando o HTML final e o puppeteer que cria uma pagina PDF a partir do HTML.
  Criar uma conta no Firebase ou Heroku e fazer a publicação (deploy) do serviço.
  Usar uma ferramenta como o Postman para validar o serviço.
