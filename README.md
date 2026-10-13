# Igreja Missa Go

Aplicação inicial para encontrar horários de missas, paróquias/comunidades e datas católicas.

## Como funciona sem pagar hospedagem
- **Site:** GitHub Pages (gratuito para repositórios públicos).
- **Atualização diária:** GitHub Actions executa o script Python e publica o `data.json`.
- Não exige servidor Python ligado 24 horas.

> Importante: esta é uma base funcional, não um cadastro completo e verificado de todas as paróquias/comunidades de Campinas. Os horários precisam ser confirmados com as paróquias. O projeto inclui dados iniciais de exemplo e uma estrutura para cadastrar novas comunidades. Não existe uma fonte pública única e completa com todos os horários.

## Instagram
O Instagram não oferece uma forma oficial e aberta de coletar automaticamente todos os posts públicos de todas as paróquias. Evite scraping que contorne login, limites ou controles da plataforma. Esta versão exibe datas litúrgicas cadastradas e permite cadastrar links de publicações manualmente em `data.json`. Uma integração oficial exige conta profissional, permissões e configuração da API da Meta.

## Publicar gratuitamente
1. Crie uma conta em https://github.com, se ainda não tiver.
2. Crie um repositório **público** chamado `igreja-missa-go`.
3. Envie todos os arquivos desta pasta para o repositório (ou extraia o ZIP e faça upload).
4. Em **Settings → Pages**, selecione publicação por **GitHub Actions**, se solicitado.
5. Em **Settings → Actions → General**, permita que workflows leiam e gravem conteúdo do repositório, se necessário.
6. O workflow `.github/workflows/atualizar.yml` roda diariamente e pode ser executado manualmente em **Actions → Atualizar dados**.
7. Depois do primeiro deploy, o endereço será parecido com `https://SEU-USUARIO.github.io/igreja-missa-go/`.

O site está configurado para caminho de repositório (`/igreja-missa-go/`). Se o nome do repositório for diferente, ajuste `BASE_PATH` em `app.js`.

## Atualizar dados
Edite `data.json` para adicionar igrejas, horários verificados, links oficiais e eventos. O script Python preserva os dados cadastrados e atualiza os eventos fixos do calendário litúrgico.
Os horários no exemplo são ilustrativos/indicativos e devem ser confirmados antes de publicar como definitivos.

## Rodar localmente
```bash
python -m http.server 8000
```
Abra http://localhost:8000. Para testar o script:
```bash
python atualizar.py
```
